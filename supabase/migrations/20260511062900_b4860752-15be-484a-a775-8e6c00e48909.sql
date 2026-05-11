CREATE TABLE public.engine_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  integration_slug TEXT,
  source TEXT,
  path TEXT,
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_engine_events_created_at ON public.engine_events (created_at DESC);
CREATE INDEX idx_engine_events_type ON public.engine_events (event_type);
CREATE INDEX idx_engine_events_integration ON public.engine_events (integration_slug);

ALTER TABLE public.engine_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record engine events"
ON public.engine_events
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
