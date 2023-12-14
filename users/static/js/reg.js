const btnSubmitCreateUser = document.getElementById('btnSubmitCreateUser');

btnSubmitCreateUser.addEventListener('click', (event) => {
    event.preventDefault();

    const query = `
        mutation CreateUser($email: String!, $password: String!, $username: String!) {
            createUser(email: $email, password: $password, username: $username) {
            user {
                username
                password
                email
            }
            }
        }
    `

    const email = document.getElementById('regEmailInput').value;
    const password = document.getElementById('regPasswordInput').value;
    const username = document.getElementById('regUsernameInput').value;
    const loginModal = document.getElementById('loginModal');

    const variables = {
        email,
        password,
        username
    }

    const body = JSON.stringify({
        query,
        variables
    })

    fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body
    })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                alert(data.errors[0].message);
            } else {
                window.location.href = '/'
            }
        })
})

const regToggleShowPass = document.getElementById('regToggleShowPass');

regToggleShowPass.addEventListener('click', (event) => {
    const inputPass = document.getElementById('regPasswordInput');

    if (inputPass.type == 'password') {
        inputPass.type = 'text';
        event.target.src = '/static/img/eye-slash-fill.svg';
    } else {
        inputPass.type = 'password';
        event.target.src = '/static/img/eye-fill.svg';
    }
})