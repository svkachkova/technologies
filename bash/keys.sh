#!/bin/bash

# ./keys.sh -a -b test -d -- 5 10 15

while [ -n "$1" ]; do
  case "$1" in
    -a) echo "Found the -a option" ;;
    -b) 
      param="$2"
      echo "Found the -b option, with parameter value $param"
      shift ;;
    -c) echo "Found the -c option" ;;
    --) shift; break ;;
    *) echo "$1 is not an option" ;;
  esac
  shift
done

count=1
for param in "$@"; do
  echo "Parameter #$count: $param"
  count=$[ $count + 1 ]
done

# Стандартные Linux ключи
# -a Вывести все объекты.
# -c Произвести подсчёт.
# -d Указать директорию.
# -e Развернуть объект.
# -f Указать файл, из которого нужно прочитать данные.
# -h Вывести справку по команде.
# -i Игнорировать регистр символов.
# -l Выполнить полноформатный вывод данных.
# -n Использовать неинтерактивный (пакетный) режим.
# -o Позволяет указать файл, в который нужно перенаправить вывод.
# -q Выполнить скрипт в quiet-режиме.
# -r Обрабатывать папки и файлы рекурсивно.
# -s Выполнить скрипт в silent-режиме.
# -v Выполнить многословный вывод.
# -x Исключить объект.
# -y Ответить «yes» на все вопросы.
