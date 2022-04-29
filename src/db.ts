import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_DB_URL
const key = import.meta.env.VITE_DB_KEY

export const db = createClient(url, key)
