# Як доєднатись до m4sub
1. Увійдіть на сервер за IP-адресою <span class="copyip" style="position: relative;" onclick="copy('play.m4sub.click')">
   play.m4sub.click
   <div id="alert-box" class="alert-box" style="position: absolute; bottom: -40px; right: 0; display: none;"><span style="font-weight: bold;">  </span> Скопійовано !</div></span>
2. **Вдалої гри**


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
