<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from "@/stores/user"
import { db } from "@/db"

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

let showMenu = $ref(false)
let isHome = $computed(() => route.name === "home")

async function signOut() {
  const { error } = await db.auth.signOut()
  if (error) throw error
}
</script>

<template lang="pug">
header(v-if="userStore.isSignedIn")
  .title(v-if="isHome") LifeStats
  button.backButton(v-else title="Go back" @click="router.back()")
    icon-arrow-left
  .spacer
  button.menuButton(title="Open menu" @click="showMenu = !showMenu")
    icon-menu
  nav(:class="{ hidden: !showMenu }" @click="showMenu = false")
    router-link(:to="{ name: 'new-stat' }")
      icon-playlist-plus
      span New statistic
    button(title="Sign out" @click="signOut")
      icon-logout
      span Sign out
</template>

<style lang="sass" scoped>
header
  display: flex
  flex-wrap: wrap
  align-items: center
  background-color: black
  color: white
  border-bottom: 2px solid rgba(255, 255, 255, 0.5)

.title
  font-family: Raleway, sans-serif
  font-weight: 800
  text-transform: uppercase
  letter-spacing: 5px
  padding: 14px

.spacer
  flex: 1

.backButton, .menuButton
  font-size: 1.3em
  padding: 12px 14px

nav
  width: 100%
  max-height: 120px
  overflow: hidden
  transition: max-height 0.3s ease-out
  display: flex
  flex-direction: column

  &.hidden
    max-height: 0

  > *
    padding: 14px

    &:hover
      color: lightblue

    &:last-child
      padding-bottom: 20px
</style>
