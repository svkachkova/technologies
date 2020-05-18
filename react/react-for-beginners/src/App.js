import React from 'react';
import events from 'events';
import News from './News';
import Add from './Add';

window.ee = new events.EventEmitter();

const	news = [
  {
    author:	'Саша Печкин',
    text: 'В четверг, четвертого числа...',
    bigText:	'в четыре с четвертью	часа четыре чёрненьких чумазеньких чертёнка чертили	чёрными	чернилами	чертёж.'
  },
  {
    author:	'Просто Вася',
    text:	'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {	
    author:	'Гость',
    text:	'Бесплатно.	Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  } 
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      news: news
    };
  }

  componentDidMount() {
    const self = this;

    window.ee.addListener('News.add', (item) => {
      const nextNews = item.concat(self.state.news);
      self.setState({
        news: nextNews
      });
    });
  }

  componentWillUnmount() {
    window.ee.removeListener('News.add');
  }

  render() {
    return (
      <div className="app">
        <Add />
        <h1 className="app__title">Новости</h1>
        <News data={this.state.news} />
      </div>
    );
  }
}

export default App;
