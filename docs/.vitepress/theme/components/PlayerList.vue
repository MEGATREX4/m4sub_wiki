<template>
    <div class="player-list-container">
      <h1>Гравці</h1>
      <div class="player-list">
      <div v-for="player in players" :key="player" class="player-item">
        <!-- Використовуємо компонент Player для кожного гравця -->
        <a :href="`/players/${player}`">
            <Player :username="player" />
        </a>
      </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Player from '../../theme/components/Player.vue';
  
  const players = ref<string[]>([]);
  
  const fetchPlayers = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/MEGATREX4/m4sub_wiki/contents/docs/players');
      if (!response.ok) {
        throw new Error('Не вдалося отримати список гравців');
      }
      const data = await response.json();
      players.value = data
        .filter((file: { name: string }) => file.name !== 'index.md')
        .map((file: { name: string }) => file.name.replace('.md', ''));
    } catch (error) {
      console.error('Помилка при отриманні гравців:', error);
    }
  };
  
  onMounted(fetchPlayers);
  </script>
  
  <style scoped>
  .player-item {
  display: flex;
  align-items: center;
  justify-content: center; /* Додано для вирівнювання елементів по центру */
  margin: 10px; /* Додає відступ між елементами */
}
  .player-list {
  display: flex;
  flex-direction: row; /* Змінено на 'row' для горизонтального вирівнювання */
  flex-wrap: wrap; /* Дозволяє елементам переноситися на новий рядок, якщо місця не вистачає */
  justify-content: center; /* Вирівнює елементи по центру */
  margin-top: 20px;
}
  .player-list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  </style>
  