<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'

// Define props for the player name, role and other options
const props = defineProps<{
  username: string
  warp?: 'left' | 'right'
  descriptions?: string[]
  role?: string
  roleIcon?: string
}>()

// Define refs for localization
const localization = ref<{ [key: string]: string }>({})
const lang = 'uk_ua'
const localizationFile = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/lang/${lang}.json`

// Fetch localization data
onMounted(async () => {
  try {
    const response = await fetch(localizationFile)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    localization.value = await response.json()
  } catch (error) {
    console.error(`Failed to load localization:`, error)
  }
})

// Function to get localized text
const getLocalizedText = (key: string) => {
  return props.username
}

// Use ref to make playerImageUrl reactive
const playerImageUrl = ref<string | undefined>(undefined)

async function getUUID(username: string) {
  try {
    const response = await fetch(`https://playerdb.co/api/player/minecraft/${username}`);
    if (!response.ok) {
      throw new Error('Користувача не знайдено');
    }

    const data = await response.json();

    if (data.code !== 'player.found') {
      throw new Error('Користувача не знайдено');
    }

    let uuid = data.data.player.id;

    if (uuid.length === 32) {  // UUID без дефісів
      uuid = uuid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
    }

    console.log(`UUID для ${username}: ${uuid}`);
    return uuid; // Повертаємо UUID
  } catch (error) {
    console.error('Помилка:', error);
    return undefined; // Якщо не вдалося отримати UUID
  }
}

// Function to get the player's skin image URL from Crafthead
async function getPlayerImageUrl(username: string) {
  try {
    const uuid = await getUUID(username); 
    if (uuid) {
      playerImageUrl.value = `https://nmsr.nickac.dev/bust/${uuid}`; 
    }
  } catch (error) {
    console.error('Failed to get player image URL:', error);
  }
}

// Watch the username prop and fetch the image URL when the username changes
watchEffect(() => {
  if (props.username) {
    getPlayerImageUrl(props.username);
  }
});
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
      {{ getLocalizedText(props.username) }}
    </div>

    <div class="wiki-body">
      <!-- Display the player's skin image if available -->
      <img v-if="playerImageUrl" :src="playerImageUrl" :alt="props.username" style="object-fit: cover!important; object-position: 0% 0%!important; height: 150px!important;" />
    </div>

    <!-- Display the role if it exists -->
    <div v-if="props.role" class="wiki-role">
      Роль: <i class="role-icon" :class="props.roleIcon"></i>{{ props.role }}
    </div>

    <!-- Block for descriptions -->
    <div v-if="props.descriptions?.length" class="wiki-descriptions">
      <div v-for="(line, index) in props.descriptions" :key="index" class="wiki-description-line">
        {{ line }}
      </div>
    </div>
  </div>

  <div v-if="props.warp" class="wiki-clearfix" />
</template>

<style scoped>
/* Style for the role icon */
.role-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 5px; /* Space between icon and role text */
  vertical-align: middle;
  image-rendering: pixelated;
  font-size: 1.5em;
}

/* Example role styling */
.wiki-role {
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
  background-color: #1b1b1f;
}

.admin {
  background-image: url(https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/icons/admin.png);
}

.moderator {
  background-image: url(https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/icons/moderation.png);
}

.helper {
  background-image: url(https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/icons/helper.png);
}

.player {
  background-image: url(https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/icons/player.png);
}



</style>
