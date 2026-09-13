import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const incidentSchema = z.object({
  kind: z.enum(["sos", "silent", "medical", "police", "fire", "accident"]).default("sos"),
  lat: z.number().min(-90).max(90).nullable().optional(),
  lng: z.number().min(-180).max(180).nullable().optional(),
  accuracy: z.number().min(0).max(100000).nullable().optional(),
  what3words: z.string().max(120).nullable().optional(),
  place: z.string().max(300).nullable().optional(),
  patientName: z.string().max(120).nullable().optional(),
  bloodType: z.string().max(8).nullable().optional(),
  allergies: z.string().max(500).nullable().optional(),
  conditions: z.string().max(500).nullable().optional(),
  iceContact: z.string().max(40).nullable().optional(),
  language: z.enum(["en", "sw"]).default("sw"),
});

export type IncidentInput = z.input<typeof incidentSchema>;

/**
 * Records an emergency incident and, when a responder-network webhook is
 * configured, forwards the payload to that partner (AAR, Knight Support, etc).
 */
export const reportIncident = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => incidentSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const webhookUrl = process.env["DISPATCH_WEBHOOK_URL"];
    let forwardStatus: string | null = null;

    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            ...(process.env["DISPATCH_WEBHOOK_TOKEN"]
              ? { authorization: `Bearer ${process.env["DISPATCH_WEBHOOK_TOKEN"]}` }
              : {}),
          },
          body: JSON.stringify({ source: "tanzania-sos", incident: data }),
        });
        forwardStatus = res.ok ? `ok:${res.status}` : `error:${res.status}`;
      } catch {
        forwardStatus = "error:network";
      }
    }

    const { data: row, error } = await supabaseAdmin
      .from("incidents")
      .insert({
        kind: data.kind,
        lat: data.lat ?? null,
        lng: data.lng ?? null,
        accuracy: data.accuracy ?? null,
        what3words: data.what3words ?? null,
        place: data.place ?? null,
        patient_name: data.patientName ?? null,
        blood_type: data.bloodType ?? null,
        allergies: data.allergies ?? null,
        conditions: data.conditions ?? null,
        ice_contact: data.iceContact ?? null,
        language: data.language,
        status: forwardStatus?.startsWith("ok") ? "dispatched" : "received",
        forwarded_to: webhookUrl ? new URL(webhookUrl).host : null,
        forward_status: forwardStatus,
      })
      .select("id, status")
      .single();

    if (error) throw new Error(error.message);

    return { id: row.id as string, status: row.status as string, forwarded: forwardStatus };
  });
