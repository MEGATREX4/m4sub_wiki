<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Define props for the recipe and result item
const props = defineProps<{
  recipe: string[]
  result: string
}>()

// Define a ref to hold the localization data
const localization = ref<{ [key: string]: string }>({})

const lang = 'uk_ua'
const localizationFile = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/lang/${lang}.json`

onMounted(async () => {
  try {
    console.log(`Fetching: ${localizationFile}`) // Debugging line
    const response = await fetch(localizationFile)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    localization.value = await response.json()
  } catch (error) {
    console.error(`Failed to load localization data from ${localizationFile}:`, error)
  }
})


// A function to get the localized string for a given key
const getLocalizedText = (key: string) => {
  const localizedKey = `item.${key.replace(':', '.')}`; // Correct transformation
  return localization.value[localizedKey] || key; // Directly access the key
};


</script>

<template>
  <div class="crafting-container">
    <div class="crafting-grid">
      <div 
        v-for="(item, index) in props.recipe" 
        :key="index" 
        class="crafting-cell"
      >
        <div v-if="item" class="item" :data-tooltip="getLocalizedText(item)">
          <img :src="`https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/textures/item/${item.replace('minecraft:', '')}.png`" :alt="item" />
        </div>
      </div>
    </div>
    <div class="crafting-arrow">
      <svg width="50" height="50" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="50" fill="none"/>
        <path d="M3 7h9v2H3V7z" fill="#8d8d8b" />
        <path d="M9 4l4 4-4 4V4z" fill="#8d8d8b" />
      </svg>
    </div>
    <div class="crafting-result">
      <div class="item" :data-tooltip="getLocalizedText(props.result)">
        <img :src="`https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/textures/item/${props.result.replace('minecraft:', '')}.png`" :alt="props.result" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Crafting grid styling */
.crafting-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 22.5px;
  border-radius: 12px;
}

.crafting-grid {
  display: grid;
  grid-template-columns: repeat(3, 60px);
  gap: 3px;
  background-color: #404040;
  padding: 4.5px;
  border: 3px solid #8B8B8B;
}

.crafting-cell {
  width: 60px;
  height: 60px;
  background-color: #505050;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #8B8B8B;
}

.crafting-result {
  width: 60px;
  height: 60px;
  background-color: #505050;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #8B8B8B;
}

/* Item Images */
.item img {
  width: 42px;
  height: 42px;
  image-rendering: pixelated;
}

/* Minecraft-style tooltip */
.item {
  position: relative;
  image-rendering: pixelated;
}

.item:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: -45px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 7.5px 10.5px;
  border-radius: 4.5px;
  font-size: 16.5px;
  white-space: nowrap;
  z-index: 10;
  font-family: "Minecraft", sans-serif;
  border: 1.5px solid #fff;
}
</style>

