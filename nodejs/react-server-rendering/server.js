const http = require('http');
const React = require('react');
const { renderToString } = require('react-dom/server');

// <div style={{}}>Hello</div>

const Hello = props =>
    React.createElement(
        'div',
        {
            style: {
                fontSize: '3em',
                color: 'red'
            }
        },
        `Hello ${props.toWhat}`
    );

http
    .createServer((req, res) =>
        res.end(
            renderToString(React.createElement(Hello, { toWhat: 'World' }, null))
        )
    )
    .listen(3000);
