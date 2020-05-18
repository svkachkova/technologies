import React from 'react';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authorIsEmpty: true,
            textIsEmpty: true,
            agreeNotChecked: true
        };

        this.author = React.createRef();
        this.text = React.createRef();
        this.checkrule = React.createRef();
        this.btn = React.createRef();

        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleChangeCheckRule = this.handleChangeCheckRule.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.author.current.focus();
    }

    handleChangeFile(filename, event) {
        const target = event.target;

        if (target.value.trim().length > 0) {
            this.setState({
                ['' + filename]: false
            });
        } else {
            this.setState({
                ['' + filename]: true
            });
        }
    }

    handleChangeCheckRule() {
        this.setState({
            agreeNotChecked: !this.state.agreeNotChecked
        });
    }

    handleClick(event) {
        event.preventDefault();

        const item = [{
            author: this.author.current.value,
            text: this.text.current.value,
            bigText: '...'
        }];

        window.ee.emit('News.add',	item);

        this.text.current.value = '';
        this.setState({
            textIsEmpty: true
        });
    }

    render() {
        const authorIsEmpty = this.state.authorIsEmpty;
        const textIsEmpty = this.state.textIsEmpty;
        const agreeNotChecked = this.state.agreeNotChecked;

        return (
            <form className="add cf">
                <input
                    className="add__author" 
                    type="text"
                    defaultValue=''
                    placeholder="Ваше имя" 
                    onChange={this.handleChangeFile.bind(this, 'authorIsEmpty')}
                    ref={this.author}
                />
                <textarea 
                    className="add__text"
                    defaultValue=''
                    placeholder="Текст новости" 
                    onChange={this.handleChangeFile.bind(this, 'textIsEmpty')}
                    ref={this.text}
                ></textarea>
                <label className="add__checkrule">
                    <input 
                        type="checkbox"
                        onChange={this.handleChangeCheckRule}
                        ref={this.checkrule}
                    />
                    Я согласен с правилами
                </label>
                <button
                    className="add__btn"
                    onClick={this.handleClick}
                    disabled={authorIsEmpty || textIsEmpty || agreeNotChecked}
                    ref={this.btn}
                >
                    Добавить новость
                </button>
            </form>
        );
    }
}

export default Add;
