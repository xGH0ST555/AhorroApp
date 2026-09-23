import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://pvdduottajfdlmlqkfug.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_PZEAaxir0qtjN-po-KB5_g_whtQFJWw';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 