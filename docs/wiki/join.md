# Як доєднатись до m4sub

1. **Підпишіться на Twitch-канал [MEGATREX4](https://twitch.tv/MEGATREX4)**.
2. **Подайте заявку** на сайті в розділі ["Подати заявку"](https://m4sub.click/apply).
3. **Приєднайтеся до нашого [Discord](https://discord.gg/2TxYxe7cbp)** для зв’язку з адміністрацією та підтримки.
4. **Чекайте на схвалення** та додавання в білий список.  
   *(зазвичай це триває не більше 1 хвилини, бо ми використовуємо бота)*
5. Увійдіть на сервер за IP-адресою <span class="copyip" style="position: relative;" onclick="copy('play.m4sub.click')">
   play.m4sub.click
   <div id="alert-box" class="alert-box" style="position: absolute; bottom: -40px; right: 0; display: none;"><span style="font-weight: bold;">  </span> Скопійовано !</div></span>
6. **Зв'яжіть Discord та Minecraft** при першому вході на сервер бот MineBot відобразить повідомлення з кодом, який треба надіслати йому в особисті повідомлення.
7. **Вдалої гри**


<script setup>
function copy(address) {
  const input = document.createElement('input');
  input.value = address;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  input.remove();
  const alertBox = document.getElementById('alert-box');
  alertBox.style.display = 'inline';
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 2000);
}

// Робимо функцію глобальною
window.copy = copy;
</script>

<style>
  .alert-box {
    display: none;
    background-color:#3fad7b;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9em;
    z-index: 1000;
  }

  .copyip {
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-brand-1) !important;
    font-size: 0.7em;
    border-radius: 6px;
    padding: 5px 8px 5px;
    min-width: 300px;
    max-width: 300px;
    height: 100%;
    transition: border-color 0.25s;
    text-decoration: none !important;
    cursor: pointer;
  }

  .copyip:hover {
    border-color: var(--vp-c-brand-1);
    color: var(--vp-c-brand-1) !important;
  }
</style>
