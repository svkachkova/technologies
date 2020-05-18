# Препроцессинг

 `sass input.scss output.css`

`sass --watch input.scss output.css`

* sass следит за изменениями во всех файлах в папке app/sass
* и компилирует CSS в папку public/stylesheets
`sass --watch app/sass:public/stylesheets`

#  Конвертация Sass и SCSS

* Convert Sass to SCSS

`$ sass-convert style.sass style.scss`

* Convert SCSS to Sass

`$ sass-convert style.scss style.sass`

# Переменные
```scss
$primary-color: #333

body 
  color: $primary-color
```

CSS
```css
body {
  color: #333;
}
```

# Вложенности
```scss
nav
  ul
    margin: 0
    list-style: none

  li
    display: inline-block
```

CSS
```css
nav ul {...}
nav li {...}
```

# Фрагментирование

- Sass-файлы, содержащие отрывки CSS, называются фрагментами
- их можно использовать в других Sass-файлах
- фрагмент - Sass-файл с _ в имени:  _partial.scss
- он не будет скомпилирован в partial.css
- подключаются при помощи директивы @import

# Импорт

_reset.
```scss
html,
body
  margin:  0
  padding: 0
```

base.sass
```scss
@import reset
```

```scss
body
  font: 100% Helvetica, sans-serif
  background-color: #efefef
```

CSS
```scss
html, body {...}
body {...}
```

# Миксины

- миксины позволяют создавать группы деклараций CSS
- удобно использовать для вендорных префиксов

```scss
=transform($property)
  -webkit-transform: $property
  -ms-transform:     $property
  transform:         $property

.box
  +transform(rotate(30deg))
```

CSS
```css
.box {
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
}
```

# Расширение/Наследование

- класс-шаблон выводится только при использовании расширения

```scss
// не попадет в CSS, так как %equal-heights никогда не расширялся
%equal-heights
  display: flex

// попадет в CSS потому, что %message-shared расширен
%message-shared
  border: 1px solid #ccc
  color: #333

.message
  @extend %message-shared

.success
  @extend %message-shared
  border-color: green
```

CSS
```css
.message, .success {
  border: 1px solid #cccccc;
  color: #333;
}

.success {
  border-color: green;
}
```

# Математические операторы

- несколько стандартных операторов + - * / %

```scss
.container
  width: 100%

article[role="main"]
  float: left
  width: 600px / 960px * 100%
```

CSS
```css
.container {
  width: 100%;
}

article[role="main"] {
  float: left;
  width: 62.5%;
}
```
