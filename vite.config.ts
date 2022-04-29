import { fileURLToPath, URL } from "url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { MdiResolver } from "./src/util/mdi-resolver"

export default defineConfig({
    plugins: [
        vue({ reactivityTransform: true }),
        Components({
            dts: true,
            resolvers: [MdiResolver],
        }),
    ],
    resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
})
