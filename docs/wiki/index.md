# Вікі M4sub

Ласкаво просимо на **M4SUB** — сервер у стилі **Vanilla+**, створений спільнотою для тих, хто шукає **класичний Minecraft з комфортними покращеннями**. Тут вас чекає **активна спільнота**, **справжній PvP&E досвід** та **свіжа версія гри** без модифікацій.

## Що робить M4SUB особливим?

1. **Vanilla+ геймплей** — класичний Minecraft з невеликими покращеннями для зручності гри.
2. **Майже завжди актуальна версія** — сервер оновлюється згідно з останніми релізами гри.
3. **PvP та PvE** — можливість вибору між мирною грою або захоплюючими битвами.
4. **Simple Voice Chat** — голосове спілкування прямо в грі для більшої інтерактивності.
5. **Keep Inventory** — можливість зберігати інвентар при смерті з невеликим штрафом досвіду.
6. **Без донату** — на сервері немає платних переваг, всі гравці в однакових умовах, але ви завжди можете підтримати сервер фінансово.
7. **Відсутність приватів** — у нас на сервері немає такого явища як `приват`.
8. **Самописні плагіни** — ми на сервері самостійно пишемо плагіни, скрипти та датапаки.

<div class="action-buttons">
  <a class="buttons" @click="go120">Приєднатися до сервера</a>
  <a class="buttons" @click="readMore">Читати вікі</a>
</div>

<script setup>
function go120() {
  window.location.href = "https://m4sub.click/apply/";
}

function readMore() {
  window.location.href = "/wiki/join.html";
}


</script>


<style>
    .buttons{
    display: block;
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-brand-1)!important;
    border-radius: 8px;
    padding: 11px 16px 13px;
    min-width: 300px;
    max-width: 300px;
    height: 100%;
    transition: border-color 0.25s;
    text-decoration: none!important;
    }

    .buttons:hover{
        border-color: var(--vp-c-brand-1);
        color: var(--vp-c-brand-1)!important;
        cursor: pointer;
    }

    .action-buttons {
    display: flex;
    gap: 16px;
    align-content: center;
    justify-content: center;
    align-items: center;
}

    .prev-next{
        display: none !important;
    }
</style>