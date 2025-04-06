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
const playerUuid = ref<string | null>(null)
const lang = 'uk_ua'
const localizationFile = ``

// Fetch localization data
onMounted(async () => {
  try {
    const response = await fetch(localizationFile)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    localization.value = await response.json()
  } catch (error) {
    console.error(`Failed to load localization:`, error)
  }

  // Fetch player UUID
  await getPlayerUUID(props.username)
})

// Fetch the UUID for a player by their username
const getPlayerUUID = async (username: string) => {
  try {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    if (response.ok) {
      const data = await response.json()
      playerUuid.value = data.id
    } else {
      console.error(`Failed to fetch UUID for username: ${username}`)
    }
  } catch (error) {
    console.error(`Error fetching UUID:`, error)
  }
}

// Function to get localized text
const getLocalizedText = (key: string) => {
  if (props.name) return props.name
  const localizedKey = `player.${key.replace(':', '.')}`
  return localization.value[localizedKey] || key
}

// Function to get the player's image URL
const getPlayerImageUrl = () => {
  return playerUuid.value ? `https://nmsr.nickac.dev/bust/${playerUuid.value}` : ''
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
      <img v-if="playerUuid" :src="getPlayerImageUrl()" :alt="props.username" />
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
