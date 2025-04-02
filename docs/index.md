---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "M4sub Вікі"
  text: "Вікі по майнкрафт серверу m4sub"
  tagline: Тут ви будете радіти!
  actions:
    - theme: brand
      text: Переглянути вікі
      link: /wiki/
    - theme: alt
      text: Сайт проекту
      link: https://m4sub.click
---

<style>

  
.VPHomeHero {
  position: relative; /* необхідно для правильної роботи псевдоелемента */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 50px;

  border-radius: 0px 0px 30px 29px!important;
-webkit-border-radius: 0px 0px 30px 29px!important;
-moz-border-radius: 0px 0px 30px 29px!important;
  
}

.VPHomeHero:before {
  content: "";
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-image: url("./home.png");
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  min-height: 100%!important;
  min-width: 100%!important;
  max-height: 100%!important;
  max-width: 100%!important;
  width: 100%!important;
  height: 100%!important;
  
}

.VPHomeHero:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  
}

</style>