<script setup lang="ts">
import { useRouter } from "vue-router"
import { db } from "@/db"
import { useUserStore } from "@/stores/user"

const router = useRouter()
const userStore = useUserStore()

db.auth.onAuthStateChange(event => {
  userStore.refreshUser()
  if (event === "SIGNED_IN")
    router.push({ name: "home" })
  else if (event === "SIGNED_OUT")
    router.push({ name: "login" })
})

async function signOut() {
  const { error } = await db.auth.signOut()
  if (error) throw error
}
</script>

<template lang="pug">
header(v-if="userStore.isSignedIn")
  .title LifeStats
  //button(title="New stat")
  //  icon-playlist-plus
  button(title="Sign out" @click="signOut")
    icon-logout

router-view
</template>

<style lang="sass">
@import "@/assets/main"

header
  display: flex
  align-items: center
  background-color: black
  color: white
  border-bottom: 2px solid rgba(255, 255, 255, 0.5)

  > *
    padding: 14px

  .title
    flex: 1
    font-family: Raleway, sans-serif
    font-weight: 800
    text-transform: uppercase
    letter-spacing: 5px
</style>
