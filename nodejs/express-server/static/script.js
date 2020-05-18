setInterval(() => {
    fetch('/time-json')
        .then((res) => res.json())
        .then((data) => {
            document.querySelector('.current-time').innerHTML = data.time;
        });
}, 1000);
