import { defineStore } from "pinia"
import { db } from "@/db"
import type { User } from "@supabase/supabase-js"

export const useUserStore = defineStore({
    id: "user",
    state: () => ({ user: db.auth.user() as User }),
    getters: { isSignedIn: (state) => !!state.user },
    actions: {
        refreshUser() {
            this.user = db.auth.user() as User
        },
    },
})
