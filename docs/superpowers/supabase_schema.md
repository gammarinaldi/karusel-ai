# Supabase Schema Setup Guide

To enable saving and fetching generation history, you need to create the `generations` table in your Supabase database. Follow the instructions below to set it up.

## SQL Schema

Run the following SQL statement in the **SQL Editor** of your Supabase Dashboard:

```sql
-- 1. Create the generations table
CREATE TABLE public.generations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    topic TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    slides JSONB NOT NULL,
    caption TEXT NOT NULL,
    sources TEXT[] DEFAULT '{}'::text[] NOT NULL,
    theme TEXT DEFAULT 'financial' NOT NULL
);

-- Note: If you already created the table, run this ALTER statement:
-- ALTER TABLE public.generations ADD COLUMN theme TEXT DEFAULT 'financial' NOT NULL;

-- CRITICAL: After altering the table, you MUST reload the Supabase API schema cache by running:
NOTIFY pgrst, 'reload schema';

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies to allow public select and insert
CREATE POLICY "Allow public read access" ON public.generations
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.generations
    FOR INSERT WITH CHECK (true);
```

## Columns Definition

| Column Name | Data Type | Description |
|---|---|---|
| `id` | `UUID` | Unique identifier (primary key) |
| `created_at` | `timestamptz` | Date and time the generation was created |
| `topic` | `TEXT` | Topic researched |
| `brand_name` | `TEXT` | The brand identifier used |
| `slides` | `JSONB` | Structured array containing the slides content |
| `caption` | `TEXT` | Instagram caption generated |
| `sources` | `TEXT[]` | Array of references retrieved from Google Search |
