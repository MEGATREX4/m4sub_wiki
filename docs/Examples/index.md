
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

**Приклад:**

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

```html
<Mob mob="minecraft:axolotl" />
```

## Компонент для структур

Використовується для візуального представлення структур Minecraft. Підтримує позиціювання (warp).

### Зліва

#### Приклад:
<Structure id="minecraft:ancient_city_left" warp="left" name="Стародавнє місто" />
```html
<Structure id="minecraft:ancient_city_left" warp="left" name="Стародавнє місто" />
```
Текст обходить зображення структури. (обхід зображення працює тільки для ПК)

<br><br><br><br>

### Справа

#### Приклад:
<Structure id="minecraft:stronghold_portal_room" warp="right" name="Енд Портал" />
```html
<Structure id="minecraft:stronghold_portal_room" warp="right" name="Енд Портал" />
```

Текст обходить зображення структури. (обхід зображення працює тільки для ПК)

<br><br><br><br>

### По центру (за замовчуванням)
#### Приклад:
<Structure id="minecraft:woodland_mansion_1x2d4" name="Woodland Mansion" />

```html
<Structure id="minecraft:woodland_mansion_1x2d4" name="Woodland Mansion" />
```



---

Ці компоненти значно спрощують візуальне представлення контенту з Minecraft та є інтерактивними елементами вашого сайту.
