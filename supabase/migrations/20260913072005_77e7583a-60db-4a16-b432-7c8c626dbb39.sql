CREATE TABLE public.incidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kind TEXT NOT NULL DEFAULT 'sos',
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  accuracy DOUBLE PRECISION,
  what3words TEXT,
  place TEXT,
  patient_name TEXT,
  blood_type TEXT,
  allergies TEXT,
  conditions TEXT,
  ice_contact TEXT,
  language TEXT NOT NULL DEFAULT 'sw',
  status TEXT NOT NULL DEFAULT 'received',
  forwarded_to TEXT,
  forward_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.incidents TO service_role;

ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages incidents"
ON public.incidents FOR ALL TO service_role
USING (true) WITH CHECK (true);

CREATE INDEX incidents_created_at_idx ON public.incidents (created_at DESC);