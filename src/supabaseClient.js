import { createClient } from '@supabase/supabase-js';

// Replace these placeholder strings with the exact values you copied from your settings tab
const supabaseUrl = 'https://lcdnpzydmnbjfzjpbxlc.supabase.co/rest/v1/';
const supabaseAnonKey = 'YOUR_ANON_PUBLIC_KEY_HERE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);