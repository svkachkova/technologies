# Ссылка на селектор родителя
```scss
a
    font-weight: bold
    &:hover
        color: red 
```

CSS
```css
a { font-weight: bold; }
a:hover { color: red; }
```

# Вложенные свойства
```scss
.funky 
  font: 
    family: fantasy
    size: 30em
```

CSS
```css
.funky {
  font-family: fantasy;
  font-size: 30em; 
}
```

# Шаблонные селекторы
```scss
%for-grids 
    position: relative
    padding: 10px

.sgrid-N 
    @extend %for-grids
```

CSS
```css
.sgrid-N {
  position: relative;
  padding: 10px; 
}
```

# Интерактивная оболочка
в командной строке ввести sass -i

# Типы данных
  - числа (1.2, 13, 10px)
  - текстовые строки("foo", 'bar', baz)
  - цвета (blue, #04a3f9, rgba(255, 0, 0, 0.5))
  - булевы значения (true, false)
  - null
  - списки значений, с разделительными пробелами или запятыми (1.5em 1em 0 2em; Times New Roman, Arial, sans-serif)
  - массивы(мапы) (key1: value1, key2: value2)

# Списки
- `()` - пустой список
- `nth(list, num)` - функция для доступа к элементам в списке
- `join(list1, list2)` - объединение списков
- `append(list, elem)` - добавление элементов
- `@each`

# Мапы
- `map-get(map, key)` - получить value
- `map-merge(map1, map2)` - объединить мапы
- `@each`

```scss
$status-colors: (
  success: #27BA6C,
  info: #03a9f4,
)
.message 
  @each $status, $color in $status-colors 
    &--#{$status} 
      background: $color
```

CSS
```css
.message--success { background: #27ba6c; }
.message--info { background: #03a9f4; }
```

# Операции
- < > <= >= == !=
- and or not
- #{} - интерполяция

# Директива @media
```scss
.sidebar 
  width: 300px
  @media screen and (orientation: landscape) 
    width: 500px
```

CSS
```css
.sidebar { width: 300px; }
@media screen and (orientation: landscape) {
  .sidebar { width: 500px; } 
}
```

# Директива @extend
- !optional - не создавать новые селекторы

```scss
.error 
  border: 1px #f00
  background-color: #fdd

.seriousError 
  @extend .error
  border-width: 3px
```

CSS
```css
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError { border-width: 3px; }
```

# Директива @debug
- `@debug` выводит значения функций Sass средствами стандартного вывода ошибок
- @debug 10em + 12em;
- Line 1 DEBUG: 22em

# Управляющие директивы и выражения
- `if()`
- `@if @else`
- `@for $var from` ... `through/to` ...
- `@each $var in` ...
- `@while`

# Миксины
```scss
@mixin large-text 
  @include large-font
  color: #ff0000

@mixin large-font 
  font: 
    family: Arial
    size: 20px

@mixin mix2($color, $size: 2px)
  background-color: $color
  padding: $size
  
.header 
  @include large-text
  @include mix2(green)
```

CSS
```css
.header {
  font-family: Arial;
  font-size: 20px;
  color: #ff0000;
  background-color: green;
  padding: 2px;
}
```

# Функции
```scss
$grid-width: 40px
$gutter-width: 10px

@function -my-grid-width($n) 
  @return $n * $grid-width + ($n - 1) * $gutter-width

.sidebar 
  width: -my-grid-width(5)
```

CSS
```css
.sidebar { width: 240px; }
```
