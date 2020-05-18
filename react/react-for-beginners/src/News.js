import React from 'react';
import PropTypes from 'prop-types';
import Article from './Article';

class News extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0
        };
    }

    render() {
        const data = this.props.data;
        let newsTemplate = [];

        if (data.length > 0) {
            newsTemplate = data.map((item, index) => {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                );
            });
        } else {
            newsTemplate = <p>Новостей нет</p>;
        }

        return (
            <div className="news">
                {newsTemplate}
                {
                    data.length > 0 
                    ? <strong className="news__count">
                        Всего новостей: {data.length}
                      </strong> 
                    : ''
                }
            </div>
        );
    }
}

News.propTypes = {
    data: PropTypes.array.isRequired
};

export default News;
