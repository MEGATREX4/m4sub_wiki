
# Документація компонентів M4SUB

Цей файл описує всі доступні користувацькі компоненти, що використовуються на сайті M4SUB для відображення предметів, крафтів, мобів та структур з Minecraft.

## Компонент для предметів

Використовується для відображення іконки будь-якого предмета з Minecraft.

**Приклад використання:**

```html
<Item item="minecraft:amethyst_shard" />
```
<Item item="minecraft:amethyst_shard" />

## Компонент для крафтів

Відображає крафтінг-грид (3x3) з результатом.

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

### Зліва
<Mob mob="minecraft:axolotl" warp="left" />


#### Приклад
```html
<Mob mob="minecraft:axolotl" warp="left" /> 
```

### Справа
<Mob mob="minecraft:axolotl" warp="right" />

#### Приклад
```html
<Mob mob="minecraft:axolotl" warp="right" /> 
```

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

## Компонент для гравців

### По центру
<Player username="Notch" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />

#### Приклад
```html
<Player username="Notch" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />
```

### Зліва
<Player username="Notch" warp="left" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />

#### Приклад
```html
<Player username="Notch" warp="left" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />
```

### Справа
<Player username="Notch" warp="right" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />

#### Приклад
```html
<Player username="Notch" warp="right" :descriptions="['Creator of Minecraft', 'Also known as Markus Persson']" />
```

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

## Компонент для структур

Використовується для візуального представлення структур Minecraft. Підтримує позиціювання (warp).

### Зліва

#### Приклад
<Structure id="minecraft:ancient_city_left" warp="left" name="Стародавнє місто" />
```html
<Structure id="minecraft:ancient_city_left" warp="left" name="Стародавнє місто" />
```
Текст обходить зображення структури. (обхід зображення працює тільки для ПК)

### Справа

#### Приклад
<Structure id="minecraft:stronghold_portal_room" warp="right" name="Енд Портал" />
```html
<Structure id="minecraft:stronghold_portal_room" warp="right" name="Енд Портал" />
```

Текст обходить зображення структури. (обхід зображення працює тільки для ПК)

### По центру (за замовчуванням)
#### Приклад
<Structure id="minecraft:woodland_mansion_1x2d4" name="Woodland Mansion" />

```html
<Structure id="minecraft:woodland_mansion_1x2d4" name="Woodland Mansion" />
```

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

## Компонент для форматування

### Очистка обтікання
```html
<Clear/>
```

Якщо після блоків з форматуванням зліва або справа ви хочете скинути форматування і наступний блок не обтікати текстом - використайте цей компонент і він вставить `div` блок що має клас `clear`, що вимкне обтікання текста.