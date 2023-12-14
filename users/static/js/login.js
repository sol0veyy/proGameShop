const btnSubmitLogin = document.getElementById('btnSubmitLogin');


btnSubmitLogin.addEventListener('click', (event) => {
    event.preventDefault();

    const query = `
        mutation ($username: String!, $password: String!) {
            tokenAuth(username: $username, password: $password) {
                payload
                token
            }
        }
    `

    const username = document.getElementById('loginUsernameInput').value;
    const password = document.getElementById('loginPasswordInput').value;

    const variables = {
        username,
        password
    }

    const body = JSON.stringify({
        query,
        variables
    })

    fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body
    })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                alert(data.errors[0].message)
            } else {
                window.location.href = '/'
            }
        })
})


const loginToggleShowPass = document.getElementById('loginToggleShowPass');

loginToggleShowPass.addEventListener('click', (event) => {
    const inputPass = document.getElementById('loginPasswordInput');
    
    if (inputPass.type == 'password') {
        inputPass.type = 'text';
        event.target.src = '/static/img/eye-slash-fill.svg';
    } else {
        inputPass.type = 'password';
        event.target.src = '/static/img/eye-fill.svg';
    }
})