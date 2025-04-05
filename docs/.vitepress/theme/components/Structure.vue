<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  id: string
  name?: string
  warp?: 'left' | 'right' // нова пропса
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

const getLocalizedStructureName = (key: string) => {
  const localizedKey = `structure.${key.replace(':', '.')}`
  return localization.value[localizedKey] || props.name || key
}

const getStructureImageUrl = (id: string) => {
  return `https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/structures/${id.replace('minecraft:', '')}.png`
}
</script>

<template>
  <div :class="['structure-window', { 'image-left': props.warp === 'left', 'image-right': props.warp === 'right' }]">
    <div class="window-header">
      {{ getLocalizedStructureName(props.id) }}
    </div>
    <div class="structure-body">
      <img 
        :src="getStructureImageUrl(props.id)" 
        :alt="getLocalizedStructureName(props.id)" 
      />
    </div>
  </div>
</template>

<style scoped>
.structure-window {
  width: 200px;
  border: 3px solid #8B8B8B;
  font-family: "Minecraft", sans-serif;
  background-color: #c0c0c0;
  display: flex;
  flex-direction: column;
  margin: 20px;
  clear: both;
}

.window-header {
  background-color: #c97d79;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  border-bottom: 2px solid #c0c0c0;
  color: #fff;
}

.structure-body {
  background-color: #3a3a3a;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
}

.structure-body img {
  width: calc(100% - 45px);
  height: auto;
  object-fit: contain;
  image-rendering: pixelated;
}

/* Для warp */
.image-left {
  float: left;
  margin-right: 15px;
}

.image-right {
  float: right;
  margin-left: 15px;
}



/* 📱 Адаптація для мобільних пристроїв */
@media (max-width: 960px) {
  .structure-window {
    width: 100%!important;
    margin: 10px 0!important;
  }

  .structure-body {
    height: auto!important;
    flex-direction: column!important;
    padding: 5px!important;
  }

  .structure-body img {
    width: 100%!important;
    max-width: 100%!important;
  }

  .window-header {
    font-size: 16px!important;
    text-align: center!important;
    padding: 8px!important;
  }
}
</style>
