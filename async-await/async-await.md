# Основы:

- `Async`/`await` — это новый способ написания асинхронного кода. Раньше использовали коллбэки и промисы.
- В основе `async`/`await` лежат промисы, нельзя использовать с коллбэками.
- Конструкции, построенные с использованием `async`/`await`, как и промисы, не блокируют главный поток выполнения программы.


# async function

Объявление async function определяет асинхронную функцию, которая возвращает объект `AsyncFunction`.

После вызова функция `async` возвращает `Promise`. Когда результат был получен, `Promise` завершается, возвращая полученное значение. Когда функция `async` выбрасывает исключение, `Promise` ответит отказом с выброшенным (`throws`) значением.

Функция `async` может содержать выражение `await`, которое приостанавливает выполнение функции `async` и ожидает ответа от переданного `Promise`, затем возобновляя выполнение функции `async` и возвращая полученное значение.

Ключевое слово `await` допустимо только в асинхронных функциях. В другом контексте вы получите ошибку `SyntaxError`.