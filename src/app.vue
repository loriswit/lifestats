<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from "@/stores/user"
import { db } from "@/db"

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

let isHome = $computed(() => route.name === "home")

db.auth.onAuthStateChange(event => {
  userStore.refreshUser()
  if (event === "SIGNED_IN" && route.name === "login")
    router.push({ name: "home" })
  else if (event === "SIGNED_OUT")
    router.push({ name: "login" })
})
</script>

<template lang="pug">
main-header

main
  router-view(v-slot="{ Component }")
    transition(:name="isHome ? 'zoom-out' : 'zoom-in'")
      component(:is="Component")
</template>

<style lang="sass">
@import "@/assets/main"

#app
  display: flex
  flex-direction: column
  min-height: 100vh

main
  flex-grow: 1

  & > *
    position: absolute
    top: 0
    left: 0
    right: 0

.zoom-in-enter-active,
.zoom-out-enter-active,
.zoom-in-leave-active,
.zoom-out-leave-active
  transition: all 0.3s ease

.zoom-in-enter-from,
.zoom-out-leave-to
  transform: scale(0.8)
  opacity: 0

.zoom-in-leave-to,
.zoom-out-enter-from
  transform: scale(1.2)
  opacity: 0
</style>
