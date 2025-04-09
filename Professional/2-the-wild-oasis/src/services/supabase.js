import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xruibfoqjsllkkhebvoc.supabase.co";
// Row-level Security (RLS) Policies are enabled. This secret cannot be used by anyone but users who are logged in.
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhydWliZm9xanNsbGtraGVidm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNjI1NTQsImV4cCI6MjA1OTczODU1NH0.VdZGBH5HNRM1783L3TV1rWvKeJ1zfNcrdDF27lTnH0c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
