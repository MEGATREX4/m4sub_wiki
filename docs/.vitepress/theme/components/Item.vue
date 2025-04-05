<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'

// Define props for the item key (for localization) and the image URL
const props = defineProps<{
  item: string
}>()

// Define a ref to hold the localization data
const localization = ref<{ [key: string]: string }>({})

// Define the language and localization file URL
const lang = 'uk_ua'
const localizationFile = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/lang/${lang}.json`

// Fetch the localization file when the component is mounted
onMounted(async () => {
  try {
    const response = await fetch(localizationFile)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    localization.value = await response.json()
  } catch (error) {
    console.error(`Failed to load localization data from ${localizationFile}:`, error)
  }
})

// Function to format the image URL from the item name
const getItemImageUrl = (item: string) => {
  return `https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/items/${item.replace('minecraft:', '')}.png`
}

// Function to get the localized name for the item
const getLocalizedText = (key: string) => {
  const localizedKey = `item.${key.replace(':', '.')}`; // Correct transformation
  return localization.value[localizedKey] || key; // Directly access the key
};
</script>

<template>
  <div class="item-container">
    <div class="item" :data-tooltip="getLocalizedText(props.item)">
      <img :src="getItemImageUrl(props.item)" :alt="props.item" />
    </div>
  </div>
</template>

<style scoped>
.item-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  width: 60px;
  height: 60px;
  padding: 5px;
  background-color: #505050;
  border: 3px solid #8B8B8B;
}

.item img {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  image-rendering: pixelated;
}

.item-text {
  margin-top: 0;
  margin-left: 60px;
  margin-right: 60px;
  font-size: 12px;
  color: #fff;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: center;
  word-break: break-word;
  line-height: 1.2;
  position: relative;
  z-index: 1;
}

.item:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: -45px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #110215;
  color: #fff;
  padding: 7.5px 10.5px;
  font-size: 16.5px;
  white-space: nowrap;
  z-index: 10;
  font-family: "Minecraft", sans-serif;
  border: 3px solid #220559;
}
</style>
