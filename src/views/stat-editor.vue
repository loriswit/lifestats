<script setup lang="ts">
import { Stat, StatType } from "@/types/stat"
import { db } from "@/db"
import { useUserStore } from "@/stores/user"
import { useRouter } from "vue-router"

const router = useRouter()
const userStore = useUserStore()

let stat = $ref(new Stat())

async function save() {
  const { error } = await db
    .from("stats")
    .insert([{ title: stat.title, user_id: userStore.user.id, type: stat.type }])
    .single()

  if (error) throw error
  router.push({ name: "home" })
}
</script>

<template lang="pug">
form(@submit.prevent="save")
  .inputs
    input.title(v-model="stat.title" placeholder="Title" minlength="1" required autofocus)
    select(v-model="stat.type")
      option(:value="StatType.Occurrences") Occurrences

  .spacer
  button.save
    icon-content-save
    span Save
</template>

<style lang="sass" scoped>
form
  background-color: rgba(255, 255, 255, 0.8)
  display: flex
  flex-direction: column
  height: 100%

.inputs
  padding: 12px

input, select
  width: 100%
  padding: 14px
  border: none
  background: none

  &:focus
    outline: none
    background-color: rgba(255, 255, 255, 0.2)

.title
  font-size: 1.4em

label span
  color: grey
  font-weight: bold
  margin: 0 14px

.spacer
  flex-grow: 1

.save
  justify-content: center
  padding: 10px
  background-color: royalblue
  color: white
</style>
