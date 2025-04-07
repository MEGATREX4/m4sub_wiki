<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

// Отримуємо дані з VitePress
const data = useData();
const heading = computed(() => 'Автори');
const labelNoGitHub = computed(() => 'Немає профілю на GitHub для %s');

// Формуємо список авторів
const combinedAuthors = computed<{ name: string; avatar?: string; noGitHub?: true }[]>(() => {
  const authors: string[] = data.frontmatter.value["authors"] || [];
  const authorsNoGitHub: string[] =
    data.frontmatter.value["authors-nogithub"] || [];

  const withAvatar = authors.map((name) => ({
    name,
    avatar: `https://github.com/${name}.png`, // Отримуємо зображення з GitHub
  }));
  const withoutGitHub = authorsNoGitHub.map((name) => ({
    name,
    noGitHub: true,
    avatar: 'https://www.mc-heads.net/avatar/Steave', // Можна вказати зображення за замовчуванням
  }));

  return [...withAvatar, ...withoutGitHub].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
});
</script>

<template>
  <div v-if="combinedAuthors.length" class="authors-section">
    <h2>{{ heading }}</h2>
    <div class="page-authors">
      <template
        v-for="author in combinedAuthors"
        :key="(author.noGitHub ? ':' : '') + author.name"
      >
        <img
          v-if="author.noGitHub"
          loading="lazy"
          class="author-avatar"
          :src="author.avatar"
          :alt="author.name"
          :title="labelNoGitHub.replace('%s', author.name)"
        />
        <a
          v-else
          :href="`https://github.com/${author.name}`"
          target="_blank"
          class="author-link"
          :title="author.name"
        >
          <img
            loading="lazy"
            class="author-avatar"
            :src="author.avatar"
            :alt="author.name"
          />
        </a>
      </template>
    </div>
  </div>
</template>

<style scoped>
.authors-section {
  margin-top: 16px;
}

.authors-section > h2 {
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.page-authors {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 8px;
  gap: 12px;
  padding-bottom: 8px;
}

.author-avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  transition: filter 0.2s ease-in-out;
}

.page-authors > a:hover > .author-avatar {
  filter: brightness(1.2);
}

@media (min-width: 1280px) {
  .content-container > .authors-section {
    display: block;
  }
}
</style>
