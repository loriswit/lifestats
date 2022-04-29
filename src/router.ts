import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "@/stores/user"
import LoginView from "./views/login-view.vue"
import DashboardView from "./views/dashboard-view.vue"
import StatEditor from "./views/stat-editor.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: DashboardView,
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
            meta: { visitor: true },
        },
        {
            path: "/stats/new",
            name: "new-stat",
            component: StatEditor,
        },
    ],
})

router.beforeEach(async to => {
    const { isSignedIn } = useUserStore()

    if (to.meta.visitor && isSignedIn)
        return { name: "home" }

    if (!to.meta.visitor && !isSignedIn)
        return { name: "login" }
})

export default router
