<script setup lang="ts">
import { db } from "@/db"
import { onMounted } from "vue"
import type { Stat } from "@/types/stat"

type StatWithCount = Stat & { count: number }

let stats = $ref([] as StatWithCount[])
onMounted(async () => {
  let { data, error } = await db.from("stats").select()
  if (error) throw error
  if (data) {
    stats = await Promise.all(data.map(async stat => {
      let { count, error } = await db
        .from("occurrences")
        .select("*", { count: "exact", head: true })
        .eq("stat_id", stat.id)
      if (error) throw error
      return { ...stat, count }
    }))
  }
})

async function newOccurrence(stat: StatWithCount) {
  const { error } = await db
    .from("occurrences")
    .insert([{ stat_id: stat.id }])

  if (error) throw error
  stat.count++
}

function statStyle(stat: Stat) {
  return { backgroundColor: `hsl(${ stat.id * 87 }, 20%, 80%)` }
}
</script>

<template lang="pug">
.stats
  .stat(v-for="stat in stats" :key="stat.id" :style="statStyle(stat)" @click="newOccurrence(stat)")
    h2 {{ stat.title }}
    .count {{ stat.count }}
</template>

<style lang="sass" scoped>
.stat
  display: flex
  align-items: center
  justify-content: space-between
  padding: 30px
  height: 120px
  outline: 2px solid rgba(255, 255, 255, 0.5)
  transition: transform 0.2s
  cursor: pointer

  &:active
    transform: scale(0.95)

  h2, .count
    font-size: 2em

  .count
    background: rgba(255, 255, 255, 0.2)
    font-weight: bold
    padding: 10px
    min-width: 60px
    text-align: center
    border-radius: 10px
</style>
