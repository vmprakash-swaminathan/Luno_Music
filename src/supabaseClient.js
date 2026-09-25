import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gborvkzmdhlfmwhtcvis.supabase.co'
const supabaseKey = 'sb_publishable_QYPT6GCon7jgxU1LE4FRyg_gLOdWJ__'

export const supabase = createClient(supabaseUrl, supabaseKey)
