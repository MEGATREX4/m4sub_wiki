<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  id: string
  name?: string
  warp?: 'left' | 'right'
  descriptions?: string[] // ✅ додаємо опис
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
  <div
    :class="[
      'wiki-window',
      props.warp === 'left' ? 'image-left' :
      props.warp === 'right' ? 'image-right' :
      'image-center'
    ]"
  >
    <div class="window-header">
      {{ getLocalizedStructureName(props.id) }}
    </div>

    <div class="wiki-body">
      <img
        :src="getStructureImageUrl(props.id)"
        :alt="getLocalizedStructureName(props.id)"
      />
    </div>


    <div v-if="props.descriptions?.length" class="wiki-descriptions">
      <div
        v-for="(line, index) in props.descriptions"
        :key="index"
        class="wiki-description-line"
      >
        {{ line }}
      </div>
    </div>
  </div>

  <div v-if="props.warp" class="wiki-clearfix" />
</template>


<style scoped>

</style>
