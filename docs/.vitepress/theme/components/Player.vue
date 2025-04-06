<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Define props for the player name
const props = defineProps<{
  username: string
  warp?: 'left' | 'right'
  name?: string
  descriptions?: string[]
}>()

// Define refs for localization and player data
const localization = ref<{ [key: string]: string }>({})
const playerImageUrl = ref<string>('') // Store image URL
const lang = 'uk_ua'
const localizationFile = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/lang/${lang}.json`

// Fetch localization data
onMounted(async () => {
  try {
    const response = await fetch(localizationFile)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    localization.value = await response.json()
  } catch (error) {
    console.error(`Failed to load localization:`, error)
  }

  // Fetch the player image URL from Crafatar API
  await getPlayerImage(props.username)
})

// Function to fetch the player's image from Crafatar
const getPlayerImage = async (username: string) => {
  const apiUrl = `https://crafthead.net/body/Yevhen4.png`
}

// Function to get localized text
const getLocalizedText = (key: string) => {
  if (props.name) return props.name
  const localizedKey = `player.${key.replace(':', '.')}`
  return localization.value[localizedKey] || key
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
      {{ getLocalizedText(props.username) }}
    </div>

    <div class="wiki-body">
      <!-- Display player's image if available -->
      <img v-if="playerImageUrl" :src="playerImageUrl" :alt="props.username" />
      <div v-else>Loading...</div>
    </div>

    <!-- Block for descriptions -->
    <div v-if="props.descriptions?.length" class="wiki-descriptions">
      <div v-for="(line, index) in props.descriptions" :key="index" class="wiki-description-line">
        {{ line }}
      </div>
    </div>
  </div>

  <div v-if="props.warp" class="wiki-clearfix" />
</template>
