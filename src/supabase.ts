import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tfyxcepwiinpuvhwsclx.supabase.co";
const supabaseKey = "sb_publishable_WkDjVFRKSesOgAC702uT_Q_pUfgaGVy";

export const supabase = createClient(supabaseUrl, supabaseKey);
