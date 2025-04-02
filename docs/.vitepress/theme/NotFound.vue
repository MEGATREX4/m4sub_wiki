<script setup>
import { useRouter } from 'vitepress'

const router = useRouter()

const goHome = () => {
  router.go('/') // Перехід на головну
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Сторінку не знайдено! 😢</p>
    <button @click="goHome">Повернутись на головну</button>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}

h1 {
  font-size: 80px;
  color: var(--vp-c-brand-1);
}

p {
  font-size: 20px;
}

button {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background: var(--vp-c-brand-2);
}
</style>
