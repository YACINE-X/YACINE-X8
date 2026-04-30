import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mmtckbatwuqvfhcdlutl.supabase.co';
const supabaseAnonKey = 'sb_publishable_7P6jJQy6ymEZX3B5UhvhvA_Xnhmu7Ev';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
