* Автоматическая перекомпиляция `tsc -w app.ts`
* Версия ECMAScript `tsc app.ts -t ES2015`
* Удаление комментариев	`tsc app.ts --removeComments`
* Установка каталога `tsc --outDir D:\ts\js` app.ts
* Объединение файлов `tsc --outFile output.js app.ts hello.ts`
* Тип модуля `tsc -m commonjs app.ts`	("None", "CommonJS", "AMD", "System", "UMD", "ES6", "ES2015" и "ESNext")
* Несколько параметров `tsc -t ES5 --outDir js -m commonjs app.ts`
* Вызов справки `tsc -h`