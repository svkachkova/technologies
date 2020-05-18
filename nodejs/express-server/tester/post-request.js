const axios = require('axios');

axios.default.post('http://localhost:3000/counter', { value: -5 })
    .then(({ data }) => console.log(data));
