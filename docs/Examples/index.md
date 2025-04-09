title: Документація компонентів M4SUB
description: В цьому розділі описано, як додавати різні типи блоків до проекту в нашій документації.
authors:
  - MEGATREX4
  - Roll54
authors-nogithub:
  - Niko

# Документація компонентів M4SUB

Цей файл описує всі доступні користувацькі компоненти, що використовуються на сайті M4SUB для відображення предметів, крафтів, мобів та структур з Minecraft.

## Автори, описи та заголовки

Для того, щоб додати авторів до проекту, використовується стандартний формат MD таблиці. Ось як це виглядає:

```markdown
authors:
  - Ім'я автора 1
  - Ім'я автора 2
authors-nogithub:
  - Ім'я автора без GitHub
```

Також він може містити опис та заголовок для цього нам треба додати до цього блок також, наприклад опис, загловки та автори в цій статті записані так 

```markdown
title: Документація компонентів M4SUB
description: В цьому розділі описано, як додавати різні типи блоків до проекту в нашій документації.
authors:
  - MEGATREX4
  - Roll54
authors-nogithub:
  - Niko
```

## Компонент для форматування

### Очистка обтікання
```html
<Clear/>
```

Якщо після блоків з форматуванням зліва або справа ви хочете скинути форматування і наступний блок не обтікати текстом - використайте цей компонент і він вставить `div` блок що має клас `clear`, що вимкне обтікання текста.

### Спрайти в тексті

Ви можете додавати спрайти в текст, щоб зробити його більш яскравим, як тут <Sprite item="minecraft:diamond" />

```html
<Sprite item="minecraft:diamond" />
```

Цей код дає змогу вставляти спрайти в текст, роблячи його більш інтерактивним та привабливим. Спрайти можуть бути використані для відображення предметів або іконок, таких як блоки <Sprite item="minecraft:diamond_block" /> та предмети <Sprite item="minecraft:diamond" />.

До кожного спрайту можна застосувати розмір у символах `rem`, що дозволяє гнучко регулювати його відображення. Якщо розмір <Sprite item="minecraft:apple" :size="6" /> не вказано, за замовчуванням буде використано значення `1.4rem`, але ви можете змінити це значення, передавши інше значення для пропсу `size`.

```html
<Sprite item="minecraft:apple" :size="6" />
```

Окрім предметів, ми можемо відображати спрайти для структур та мобів. Для цього потрібно використовувати параметр `type`, вказуючи `mobs` для мобів або `structures` для структур. Наприклад:

- Спрайт для моба <Sprite item="minecraft:zombie" type="mobs" :size="3" />

```html
<Sprite item="minecraft:zombie" type="mobs" :size="3" />
```

- Спрайт для структури <Sprite item="minecraft:end_city_bridge_piece" type="structures" :size="3" />

```html
<Sprite item="minecraft:end_city_bridge_piece" type="structures" :size="3" />
```

Це дозволяє відображати іконки мобів та структур, роблячи текст ще більш виразним та захоплюючим.

## Компонент для предметів

Використовується для відображення іконки будь-якого предмета з Minecraft. Кожен предмет автоматично отримує зображення від текстур проекту, а також локалізовані назви.

**Приклад використання:**
### З користувацькими ім'ям

Деколи звісно якщо код не може знайти назву, або це може бути користувацький предмет з нашого серувера, то тоді ми можемо додати її вручну за допомогою пропсу `name` в компонент.

<Item item="minecraft:amethyst_shard" name="Фіолетовий кристалик" />
```html
<Item item="minecraft:amethyst_shard" name="Фіолетовий кристалик" />
```

### По центру
```html
<Item item="minecraft:amethyst_shard" />
```
<Item item="minecraft:amethyst_shard" />

Цей елемет також має властивість обтікання текстом 
### Справа
<Item item="minecraft:amethyst_shard" warp="right" />

```html
<Item item="minecraft:amethyst_shard" warp="right" />
```
<Clear/>
### Зліва
<Item item="minecraft:amethyst_shard" warp="left" />
```html
<Item item="minecraft:amethyst_shard" warp="left" />
```

<Clear/>
## Компонент для крафтів

Відображає сітку створення (3x3) з результатом, цей блок не має параметру `warp`, через його розміри на сторінці.

**Атрибути:**
- `:recipe` — масив з 9 позицій (зліва направо, зверху вниз).
- `:result` — результат крафту.

**Приклад**

```html
<CraftingGrid 
  :recipe="['minecraft:diamond', 'minecraft:diamond', 'minecraft:diamond', 
            '', 'minecraft:stick', '', 
            '', 'minecraft:stick', '']" 
  :result="'minecraft:diamond_sword'" 
/>
```

<CraftingGrid 
  :recipe="['minecraft:diamond', 'minecraft:diamond', 'minecraft:diamond', 
            '', 'minecraft:stick', '', 
            '', 'minecraft:stick', '']" 
  :result="'minecraft:diamond_sword'" 
/>

## Компонент для мобів

Використовується для відображення моделі або іконки моба.

**Приклад використання:**

### По центру
<Mob mob="minecraft:axolotl" />

```html
<Mob mob="minecraft:axolotl" />
```
<Clear/>
### Зліва
<Mob mob="minecraft:axolotl" warp="left" />


#### Приклад
```html
<Mob mob="minecraft:axolotl" warp="left" /> 
```
<Clear/>
### Справа
<Mob mob="minecraft:axolotl" warp="right" />

#### Приклад
```html
<Mob mob="minecraft:axolotl" warp="right" /> 
```
<Clear/>
### Моб з описом
<Mob
  name="Скелет"
  mob="minecraft:skeleton"
  warp="right"
  :descriptions="[
    'Здоров\'я: 20',
    'Атака: 2–5 (лук)',
    'Не горить у воді',
    'Спавн: в темряві, уночі'
  ]"
/>

#### Приклад
```html
<Mob
  name="Скелет"
  mob="minecraft:skeleton"
  warp="right"
  :descriptions="[
    'Здоров\'я: 20',
    'Атака: 2–5 (лук)',
    'Не горить у воді',
    'Спавн: в темряві, уночі'
  ]"
/>
```
<Clear/>
## Компонент для гравців

### По центру
<Player username="Notch" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />

#### Приклад
```html
<Player username="Notch" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />
```
<Clear/>
### Зліва
<Player username="Notch" warp="left" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />

#### Приклад
```html
<Player username="Notch" warp="left" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />
```
<Clear/>
### Справа
<Player username="Notch" warp="right" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />

#### Приклад
```html
<Player username="Notch" warp="right" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />
```
<Clear/>
### Компонент для ролей у гравців
Кожен гравець може мати роль. Використовується для відображення ролі гравця додайте roleIcon="icon" для зображення іконки, та role="назва ролі"(тут може бути будь-який рядок ролі).

Значків у нас всього 6: `admin`, `moderator`, `helper`, `media`, `donater`, `player`, кожна з ролей має унікальне зображення.


|      Адмін      |    Модератор    |    Помічник     |     Медіа      |   Донатер    |    Гравець    |
|:--------------:|:--------------:|:--------------:|:--------------:|:--------------:|:--------------:|
|      admin      |     moderator    |     helper      |      media     |    donater    |     player     |
| <i class="role-icon admin"></i> | <i class="role-icon moderator"></i> | <i class="role-icon helper"></i> | <i class="role-icon media"></i> | <i class="role-icon donater"></i> | <i class="role-icon player"></i> |

#### Приклад
<player username="Yevhen4" roleIcon="admin" role="Адмін" warp="right" :descriptions="['Засновник сервера', 'Стрімер']" />

```html
  <player username="Yevhen4" 
          roleIcon="admin"
          role="Адмін" warp="right"
          :descriptions="['Засновник сервера', 'Стрімер']" 
  />
```
<Clear/>
## Компонент для структур

Використовується для візуального представлення структур Minecraft. Підтримує позиціювання (warp).

### Зліва

#### Приклад
<Structure id="minecraft:ancient_city_left" warp="left" name="Стародавнє місто" />
```html
<Structure id="minecraft:ancient_city_left" warp="left" name="Стародавнє місто" />
```
Текст обходить зображення структури. (обхід зображення працює тільки для ПК)
<Clear/>
### Справа

#### Приклад
<Structure id="minecraft:stronghold_portal_room" warp="right" name="Енд Портал" />
```html
<Structure id="minecraft:stronghold_portal_room" warp="right" name="Енд Портал" />
```

Текст обходить зображення структури. (обхід зображення працює тільки для ПК)
<Clear/>
### По центру (за замовчуванням)
#### Приклад
<Structure id="minecraft:woodland_mansion_1x2d4" name="Woodland Mansion" />

```html
<Structure id="minecraft:woodland_mansion_1x2d4" name="Woodland Mansion" />
```
<Clear/>
### Структура з описом
<Structure
  id="minecraft:desert_well"
  warp="right"
  :descriptions="[
    'Місце спавну: пустеля',
    'Містить 1-2 блоки золота',
    'Може мати біля себе генератор'
  ]"
/>

#### Приклад
```html
<Structure
  id="minecraft:desert_well"
  warp="right"
  :descriptions="[
    'Місце спавну: пустеля',
    'Містить 1-2 блоки золота',
    'Може мати біля себе генератор'
  ]"
/>
```



