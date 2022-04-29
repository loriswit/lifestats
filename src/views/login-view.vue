<script setup lang="ts">
import { db } from "@/db"

async function signIn() {
  const { error } = await db.auth.signIn({ provider: "google" }, { redirectTo: window.location.origin })
  if (error) console.error(error)
}
</script>

<template lang="pug">
.container
  h1 LifeStats
  .login
    button(@click="signIn")
      icon-google
      span Sign in with google
</template>

<style lang="sass" scoped>
.container
  color: white
  text-align: center
  display: flex
  flex-direction: column
  justify-content: center

h1
  font-family: Raleway, sans-serif
  font-weight: 800
  text-transform: uppercase
  letter-spacing: 5px
  margin-bottom: 50px
  margin-top: 180px

button
  background-color: rgba(255, 255, 255, 0.2)
  padding: 10px
  border-radius: 5px
  outline: 1px solid rgba(255, 255, 255, 0.5)

  svg
    margin-right: 10px
</style>
