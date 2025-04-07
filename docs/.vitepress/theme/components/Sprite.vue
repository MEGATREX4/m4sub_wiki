<script setup lang="ts">
import { computed } from 'vue'

// Отримуємо пропси
const props = defineProps<{
  item: string
  size?: number
  type?: 'item' | 'mob' | 'structure'  // Додаємо пропс для типу спрайта
}>()

// Формуємо URL для спрайта в залежності від типу
const url = computed(() => {
  // Визначаємо тип спрайта та відповідний шлях
  const typePath = props.type ?? 'items';  // За замовчуванням буде 'items'
  return `https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/${typePath}/${props.item.replace('minecraft:', '')}.png`
})

// Розмір іконки
const iconSize = computed(() => `${props.size ?? 1.3}rem`)
</script>

<template>
  <i
    class="item-icon"
    :style="{
      backgroundImage: `url(${url})`,
      width: iconSize,
      height: iconSize
    }"
  ></i>
</template>

<style scoped>
.item-icon {
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
  image-rendering: pixelated!important;
}
</style>
