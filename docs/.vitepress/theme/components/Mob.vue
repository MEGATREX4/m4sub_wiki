<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  mob: string // Наприклад: "minecraft:zombie"
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
  const localizedKey = `entity.${key.replace(':', '.')}`
  return localization.value[localizedKey] || key
}

const getMobImageUrl = (mob: string) => {
  return `https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/mobs/${mob.replace('minecraft:', '')}.png`
}
</script>

<template>
  <div class="mob-window">
    <div class="window-header">
      {{ getLocalizedText(mob) }}
    </div>
    <div class="mob-body">
      <img :src="getMobImageUrl(mob)" :alt="mob" />
    </div>
  </div>
</template>

<style scoped>
.mob-window {
  width: 200px;
  border: 3px solid #8B8B8B;
  font-family: "Minecraft", sans-serif;
  background-color: #c0c0c0;
  display: flex;
  flex-direction: column;
}

.window-header {
  background-color: #c97d79;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  border-bottom: 2px solid #c0c0c0;
}

.mob-body {
  background-color: #3a3a3a;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
}

.mob-body img {
  width: 100%;
  height: auto;
  image-rendering: pixelated;
}
</style>
