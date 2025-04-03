<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  page: String // Назва сторінки (наприклад, "modding-guide")
})

const pageExists = ref(true)

// Функція перевірки наявності сторінки
const checkPageExists = async () => {
  const url = `https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/docs/${props.page}.md`
  try {
    const response = await fetch(url, { method: 'HEAD' }) // Швидка перевірка
    pageExists.value = response.ok
  } catch (error) {
    console.error(`Помилка перевірки сторінки ${props.page}:`, error)
    pageExists.value = false
  }
}

// Створення посилання на GitHub для створення сторінки
const githubNewUrl = `https://github.com/MEGATREX4/m4sub_wiki/new/main/docs/${props.page}.md?value=${encodeURIComponent(`# ${props.page.replace(/-/g, ' ')}\n\nЦя сторінка ще не створена. Ви можете її написати!`)}`

// Викликаємо перевірку при завантаженні компонента
onMounted(checkPageExists)
</script>

<template>
  <span>
    <a :href="'/' + page" :class="{ 'missing-page': !pageExists }">
      {{ page.replace(/-/g, ' ') }}
    </a>
    <a v-if="!pageExists" :href="githubNewUrl" target="_blank" class="create-link">
      (створити)
    </a>
  </span>
</template>

<style scoped>
/* Червоний колір для неіснуючих сторінок */
.missing-page {
  color: red;
  text-decoration: underline;
}

/* Створити сторінку (GitHub) */
.create-link {
  font-size: 0.9em;
  margin-left: 5px;
  color: #ff5555;
}
</style>
