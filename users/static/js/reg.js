const btnSubmitCreateUser = document.getElementById('btnSubmitCreateUser');

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

btnSubmitCreateUser.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const username = document.getElementById('usernameInput').value;

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
                alert(data.errors[0].message)
            } else {
                window.location.href = '/login/'
            }
        })
})