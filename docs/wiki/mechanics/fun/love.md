---
authors:
  - MEGATREX4
---

# Любов

Ця функція додає цікавий елемент до гри, який визначає, коли два гравці одночасно крастяться поруч один з одним кілька разів, що символізує "любов".

### Як працює:

1. **Трекінг красту**: Кожного разу, коли гравець починає крастись, система перевіряє, чи є інші гравці поруч (в межах одного блоку).
2. **Лічильник**: Якщо поруч є ще один гравець, який також краститься, лічильник для кожної пари гравців збільшується на 1.
3. **Досягнення 5 разів**: Якщо два гравці одночасно крастяться поруч один з одним 5 разів, система вважає це проявом "любові" і виконується наступне:
   - Виводяться частинки сердець навколо кожного гравця.
   - Лічильники скидаються, щоб уникнути спаму.

### Мета:

Ця функція додає гумору та взаємодії між гравцями, створюючи маленький сюрприз для тих, хто часто краститься поруч з іншими, при цьому також даючи можливість для творчих ігрових моментів.