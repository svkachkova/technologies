// simple form 

formElem.onsubmit = async (event) => {
    event.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
        method: 'POST',
        body: new FormData(formElem)
    });

    let result = await response.json();

    alert(result.message);
};
