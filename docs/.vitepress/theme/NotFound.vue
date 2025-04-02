<script setup>
import { useRouter } from 'vitepress'
import { computed, onMounted } from 'vue'

const router = useRouter()

// Get the current page path and convert it to Markdown filename
const currentPath = computed(() => {
  return router.route.path.replace(/^\/|\/$/g, '') || 'index'
})

// Prefill content for the new file
const prefillContent = computed(() => {
  return encodeURIComponent(`# ${currentPath.value.replace(/-/g, ' ')}\n\nThis page is under construction. Feel free to edit it!`)
})

// Construct the GitHub new file URL with prefilled content
const githubNewUrl = computed(() => {
  return `https://github.com/MEGATREX4/m4sub_wiki/new/main/docs/${currentPath.value}.md?value=${prefillContent.value}`
})

// Function to open GitHub with the new page
const createPage = () => {
  window.open(githubNewUrl.value, '_blank')
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found">
      <p class="code">404</p>
      <h1 class="title">СТОРІНКИ НЕ ІСНУЄ АБО ВОНА ЩЕ НЕ СТВОРЕНА</h1>
      <div class="divider"></div>
      <blockquote class="quote">
        Ви можете створити її, або спробувати пошукати потрібну сторінку по іншому.
      </blockquote>
      <div class="action">
        <a class="link" href="/" aria-label="go to home">Головна</a>
        <button class="create-button" @click="createPage">Створити сторінку</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 129px);
  transition: background-color 0.5s ease-in-out;
}

.not-found {
  text-align: center;
  padding: 50px;
}

.code {
  font-size: 6rem;
  margin-bottom: 4rem;
  color: #ff5555;
  font-weight: bold;
}

.title {
  font-size: 2rem;
  padding-bottom: 10px;
}

.divider {
  width: 60px;
  height: 4px;
  background-color: #646cff;
  margin: 10px auto;
}

.quote {
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 20px;
}

.action {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.link,
.create-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
}

.link {
  background-color: #646cff;
  color: white;
}

.create-button {
  background-color: #ff5555;
  color: white;
}
</style>

