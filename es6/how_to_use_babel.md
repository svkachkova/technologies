1. Открыть папку проека в VS Code.
2. В терминале: `npm init -y` (-y - параметры по умолчанию).
3. Установить babel: `npm install babel-cli babel-core babel-preset-es2015 --save-dev`. 

        -cli - интерфейс командной  строки
        -core - основной модуль
        -preset-es2015 - для транспиляции es6
        --save-dev - изменит package.json

4. Создать папку `src` (source - источник) для исходного кода.
5. Создать папку `dist` (distribution - распространение) для конечного кода.
6. В package.json в разделе "scripts" написать `"build": "babel src -d dist --presets es2015"` (-d переместить из...в...)
7. Чтобы все само обновлялось `"watch": "babel src -d dist --presets es2015 -w"` (-w babel смотрит за изменениями в файлах из src)
8. Запустить `npm run watch`.