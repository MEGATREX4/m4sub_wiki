<script setup>
onMounted(() => {
  const themeSwitcher = document.querySelector('.VPSwitchAppearance')
  themeSwitcher.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark')
    document.documentElement.classList.toggle('light')
  })
})
</script>


<style>

.dark {
  background-color: #1a202c;
}

.light {
  background-color: #f7fafc;
}
</style>