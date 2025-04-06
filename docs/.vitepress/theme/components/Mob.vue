<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  mob: string
  warp?: 'left' | 'right'
  name?: string
  descriptions?: string[]
}>()



const localization = ref<{ [key: string]: string }>({})
const lang = 'uk_ua'
const localizationFile = `https://raw.githubusercontent.com/InventivetalentDev/m4sub_wiki/main/assets/lang/${lang}.json`

onMounted(async () => {
  try {
    const response = await fetch(localizationFile)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    localization.value = await response.json()
  } catch (error) {
    console.error(`Failed to load localization:`, error)
  }
})

const getLocalizedText = (key: string) => {
  if (props.name) return props.name
  const localizedKey = `entity.${key.replace(':', '.')}`
  return localization.value[localizedKey] || key
}

const getMobImageUrl = (mob: string) => {
  return `https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/mobs/${mob.replace('minecraft:', '')}.png`
}
</script>

<template>
  <div
  :class="[
    'wiki-window',
    props.warp === 'left' ? 'image-left' :
    props.warp === 'right' ? 'image-right' :
    'image-center'
  ]"
>
  <div class="window-header">
    {{ getLocalizedText(mob) }}
  </div>

  <div class="wiki-body">
    <img :src="getMobImageUrl(mob)" :alt="mob" />
  </div>

  <!-- Блок описів -->
  <div v-if="props.descriptions?.length" class="wiki-descriptions">
    <div v-for="(line, index) in props.descriptions" :key="index" class="wiki-description-line">
      {{ line }}
    </div>
  </div>
</div>

<div v-if="props.warp" class="wiki-clearfix" />

</template>

<style scoped>

</style>