import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_PROJECT_URL";
const supabaseKey = "sb_publishable_WkDjVFRKSesOgAC702uT_Q_pUfgaGVy";

export const supabase = createClient(supabaseUrl, supabaseKey);
