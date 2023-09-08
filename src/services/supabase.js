import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cgwuipbzalztlntafqxf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd3VpcGJ6YWx6dGxudGFmcXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI0NTc0MTEsImV4cCI6MjAwODAzMzQxMX0.PcUmCwDnmIqyiWUhw5U7f3hzS2XDSQ0GJpiegLyizvc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
