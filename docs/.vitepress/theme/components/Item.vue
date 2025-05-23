<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'

// Define props for the item key (for localization) and the image URL
const props = defineProps<{
  item: string
  name?: string
  warp?: 'left' | 'right' // Add wrap option
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
  if (props.name) return props.name
  const localizedKey = `item.${key.replace(':', '.')}`; // Correct transformation
  return localization.value[localizedKey] || key; // Directly access the key
};
</script>

<template>
  <div :class="[
    'mitem-window',
    props.warp === 'left' ? 'image-left' :
    props.warp === 'right' ? 'image-right' :
    'mitem-image-center'
  ]" class="mitem-container">
    <div class="mitem" :data-tooltip="getLocalizedText(props.item)">
      <img :src="getItemImageUrl(props.item)" :alt="props.item" />
    </div>
  </div>
</template>

<style scoped>
.mitem-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 10px;
}

.mitem {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  width: 110px;
  height: 110px;
  padding: 5px;
  background-color: #505050;
  border: 3px solid #8B8B8B;
}

.mitem img {
  width: 90px;

  position: absolute;
  padding: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  image-rendering: pixelated!important;
}

.mitem-wrap-left {
  float: left!important;
  margin-right: 15px;
}

.mitem-wrap-right {
  float: right!important;
  margin-left: 15px;
}

.mitem-text {
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

.mitem-image-center{
  width: 100%!important;
  display: flex!important;
  justify-content: center!important;
  margin-left: auto !important;
  margin-right: auto !important;
}
</style>

