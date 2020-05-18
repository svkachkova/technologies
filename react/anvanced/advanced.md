# Доступность контента

- HTML-атрибуты `aria-*`

```jsx
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
/>
```

- Семантическая вёрстка
- Подписи в формах

```jsx
<label htmlFor="namedInput">Имя:</label>
<input id="namedInput" type="text" name="name"/>
```

- Механизмы быстрого перехода к нужному контенту 
- Программное управление фокусом 
- Инструменты для разработки и тестирования...

# Разделение кода

## import() 

До:
```jsx
import { add } from './math';

console.log(add(16, 26));
```

После:
```jsx
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

## React.lazy 

До:
```jsx
import OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

После:
```jsx
import MyErrorBoundary from './MyErrorBoundary';
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <MyErrorBoundary>
      <Suspense fallback={<div>Загрузка...</div>}>
        <OtherComponent />
      <Suspense>
    </MyErrorBoundary>
  );
}
```

`React.lazy` в настоящее время поддерживает только экспорт по умолчанию.

## Разделение кода на основе маршрутов 

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Загрузка...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

# Контекст

Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях.

Контекст разработан для передачи «глобальных» данных (например, текущий аутентифицированный пользователь, UI-тема или выбранный язык).

```jsx
const MyContext = React.createContext(defaultValue);

<MyContext.Provider value={/* некоторое значение */}>

class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
  }
}
```

# Предохранители (Error Boundary)

Предохранители это компоненты React, которые отлавливают ошибки JavaScript в любом месте деревьев их дочерних компонентов, сохраняют их в журнале ошибок и выводят запасной UI вместо рухнувшего дерева компонентов. Предохранители отлавливают ошибки при рендеринге, в методах жизненного цикла и конструкторах деревьев компонентов, расположенных под ними.

- Используйте `static getDerivedStateFromError()` при рендеринге запасного UI в случае отлова ошибки. 
- Используйте `componentDidCatch()` при написании кода для журналирования информации об отловленной ошибке.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return <h1>Что-то пошло не так.</h1>;
    }
    return this.props.children; 
  }
}
```

```jsx
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

* Чтобы отловить ошибку в обработчике событий, пользуйтесь обычной JavaScript-конструкцией `try` / `catch`.

# Перенаправление рефов

Перенаправление рефов позволяет автоматически передавать реф компонента одному из его дочерних элементов. Большинству компонентов перенаправление рефов не нужно, но оно может быть полезно, например, если вы пишете библиотеку.

# Фрагменты

```jsx
function Glossary(props) {
  return (
    <React.Fragment>
      <td>Привет</td>
      <td>Мир</td>
    </React.Fragment>
  );
}
```

Сокращенная запись:
```jsx
function Columns() {
  return (
    <>
      <td>Привет</td>
      <td>Мир</td>
    </>
  );
}
```

# Компоненты высшего порядка

Компонент высшего порядка (Higher-Order Component, HOC) — это один из продвинутых способов для повторного использования логики.

HOC — это функция, которая принимает компонент и возвращает новый компонент.

    ...

# Взаимодействие со сторонними библиотеками
- Интеграция с плагинами, изменяющими DOM 
- Интеграция с другими визуальными библиотеками 
- Интеграция со слоем моделей 

# JSX в деталях

JSX — синтаксический сахар для функции `React.createElement(component, props, ...children)`.

- Использование записи через точку

```jsx
<MyComponents.DatePicker color="blue" />
```

- Выбор типа во время исполнения 

```jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

- Установка пропсов по умолчанию в «true» 

```jsx
<MyTextBox autocomplete />
// эквивалентно
<MyTextBox autocomplete={true} />
```

- React-компонент может возвращать массив элементов

```jsx
render() {
  return [
    <li key="A">Первый элемент</li>,
    <li key="B">Второй элемент</li>,
    <li key="C">Третий элемент</li>,
  ];
}
```

- Значения `false`, `null`, `undefined` и `true` — валидные дочерние компоненты. Просто они не рендерятся. Эти JSX-выражения будут рендерить одно и то же:

```jsx
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

- Рендер по условию

```jsx
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

# Оптимизация производительности

webpack для продакшен-сборки 

```jsx
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production'
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
};
```
## Анализ производительности компонентов с помощью вкладки Chrome «Performance» 

- Временно отключите все расширения Chrome, особенно React DevTools. 
- Убедитесь, что вы запускаете приложение в режиме разработки.
- Откройте в инструментах разработчика Chrome вкладку Performance и нажмите Record.
- Выполните действия, которые вы хотите проанализировать на производительность (более 20 секунд).
- Остановите запись.
- События React будут сгруппированы под меткой User Timing.

## Анализ производительности компонентов с помощью инструмента разработки «Profiler» 

React Developer Tools/Profiler

## Визуализация перерисовки виртуального DOM

React Developer Tools/Highlight Updates

# Порталы

Порталы позволяют рендерить дочерние элементы в DOM-узел, который находится вне DOM-иерархии родительского компонента.

```jsx
ReactDOM.createPortal(child, container)
```

Типовой случай применения порталов — когда в родительском компоненте заданы стили overflow: hidden или z-index, но вам нужно чтобы дочерний элемент визуально выходил за рамки своего контейнера. Например, диалоги, всплывающие карточки и всплывающие подсказки.

# Рефы и DOM

Рефы дают возможность получить доступ к DOM-узлам или React-элементам, созданным в рендер-методе.

Когда использовать рефы:

- Управление фокусом, выделение текста или воспроизведение медиа.
- Императивный вызов анимаций.
- Интеграция со сторонними DOM-библиотеками.

Рефы создаются с помощью `React.createRef()` и прикрепляются к React-элементам через `ref` атрибут.

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

Когда реф передаётся в методе `render`, ссылка на узел доступна через свойство рефа `current`.

```jsx
const node = this.myRef.current;
```
Добавление рефа к DOM-элементу (хранения ссылки на DOM-элемент).

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Фокус на текстовом поле"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

Добавление рефа к классовому компоненту (имитация клика по `CustomTextInput` сразу же после монтирования).

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

# Рендер-пропсы

Компонент с рендер-пропом берёт функцию, которая возвращает React-элемент, и вызывает её вместо реализации собственного рендера.

```jsx
<DataProvider render={data => (
  <h1>Привет, {data.target}</h1>
)}/>
```

## Использование рендер-пропа для сквозных задач 

```jsx
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Перемещайте курсор мыши!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

## Использование пропсов, отличных от render (как название передаваемого свойства)

Важно запомнить, что из названия паттерна «рендер-проп» вовсе не следует, что для его использования вы должны обязательно называть проп render. На самом деле, любой проп, который используется компонентом и является функцией рендеринга, технически является и «рендер-пропом».

```jsx
<Mouse children={mouse => (
  <p>Текущее положение курсора мыши: {mouse.x}, {mouse.y}</p>
)}/>
```
или

```jsx
<Mouse>
  {mouse => (
    <p>Текущее положение курсора мыши: {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```

# Строгий режим

StrictMode — инструмент для обнаружения потенциальных проблем в приложении. Также как и Fragment, StrictMode не рендерит видимого UI. Строгий режим активирует дополнительные проверки и предупреждения для своих потомков.

    Проверки строгого режима работают только в режиме разработки; они не оказывают никакого эффекта в продакшен-сборке.

```jsx
function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

На данный момент StrictMode помогает в:

- Обнаружении небезопасных методов жизненного цикла
- Предупреждении об использовании устаревшего API строковых реф
- Предупреждении об использовании устаревшего метода findDOMNode
- Обнаружении неожиданных побочных эффектов
- Обнаружении устаревшего API контекста

# Проверка типов с помощью PropTypes

```jsx
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Привет, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

Пример использования возможных валидаторов:

```jsx
MyComponent.propTypes = {
  // Можно объявить проп на соответствие определённому JS-типу.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
  optionalNode: PropTypes.node,
  optionalElement: PropTypes.element, // React-элемент
  optionalElementType: PropTypes.elementType, // Тип React-элемент (например, MyComponent)

  // Можно указать, что проп должен быть экземпляром класса
  optionalMessage: PropTypes.instanceOf(Message),

  // Вы можете задать ограничение конкретными значениями при помощи перечисления
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // Объект, одного из нескольких типов
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Массив объектов конкретного типа
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Объект со свойствами конкретного типа
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Объект с определённой структурой
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // предупреждение, если проп не передан
  requiredFunc: PropTypes.func.isRequired,

  // Значение любого типа
  requiredAny: PropTypes.any.isRequired,
```
Ограничение на один дочерний компонент 

```jsx
MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```
Значения пропсов по умолчанию 

```jsx
MyComponent.defaultProps = {
  propName: 'Something'
};
```

# Неуправляемые компоненты

Вместо того, чтобы писать обработчик события для каждого обновления состояния, вы можете использовать неуправляемый компонент и читать значения из DOM через реф.

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('Отправленное имя: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Имя:
          <input 
            defaultValue="Боб"  // Значение по умолчанию 
            type="text" 
            ref={this.input} />
        </label>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}
```

## Тег поля загрузки файла 

HTML-тег `<input type="file">` позволяет пользователю выбрать один или несколько файлов из дискового устройства, чтобы загрузить их на сервер, либо управлять ими с помощью JavaScript через File API. В React это всегда неуправляемый компонент.

```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

# Веб-компоненты

Использование веб-компонентов в React 

```jsx
class HelloMessage extends React.Component {
  render() {
    return <div>Привет, <x-search>{this.props.name}</x-search>!</div>;
  }
}
```

Использование React в веб-компонентах 

```jsx
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);
```
