# Rules of hooks

Хуки — это функции JavaScript, которые налагают два дополнительных правила:

## 1. Хуки следует вызывать только на верхнем уровне. 

Не вызывайте хуки внутри циклов, условий или вложенных функций. Всегда используйте хуки только внутри React-функций, до возврата какого-либо значения из них. Это позволит React правильно сохранять состояние хуков между множественными вызовами useState и useEffect.

## 2. Хуки следует вызывать только из функциональных компонентов React.

Не вызывайте хуки из обычных JavaScript-функций. Вместо этого можно:

- Вызывать хуки из функционального компонента React.
- Вызывать хуки из пользовательского хука.

Следуя этому правилу, можно гарантировать, что вся логика состояния компонента чётко видна из исходного кода.

## Плагин для ESLint

Мы выпустили плагин для ESLint `eslint-plugin-react-hooks`, который принуждает к соблюдению этих двух правил. Этот плагин включен по умолчанию в Create React App.