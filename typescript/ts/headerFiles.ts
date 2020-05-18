// ------------------------
// ---заголовочные файлы---
// ------------------------

// файлы с расширением .d.ts описывают синтаксис и структуру функций и свойств, 
// которые могут использоваться в программе, не предоставляя при этом конкретной реализации

// популярные библиотеки
// https://github.com/DefinitelyTyped/DefinitelyTyped
 
// 1. создадим в проекте каталог @types, а в нем - подкаталог jquery

// 2. в @types/jquery поместим заголовочный файл для jquery (index.d.ts)
// https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/jquery/index.d.ts

// 3. в корневой папке проекта создадим index.html:
// <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
// <script src="app.js"></script>

// 4. в корневой папке создадим app.ts:
// /// <reference path="@types/jquery/index.d.ts" />

// 5. можно использовать jquery
