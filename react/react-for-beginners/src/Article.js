import React from 'react';
import PropTypes from 'prop-types';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            isVisible: true
        });
    }

    render() {
        const data = this.props.data;

        let link = <a href="#" onClick={this.handleClick} className="news__readmore">Подробнее</a>;
        let bigText = '';

        if (this.state.isVisible) {
            link = '';
            bigText = <p className="news__big-text">{data.bigText}</p>;
        }

        return (
            <div className="article">
                <p className="news__author">{data.author}: </p>
                <p className="news__text">{data.text}</p>
                {link}
                {bigText}              
            </div>
        );
    }
}

Article.propTypes = {
    data: PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired
    })
};

export default Article;
