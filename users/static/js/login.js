const btnSubmitLogin = document.getElementById('btnSubmitLogin');

const query = `
    mutation ($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
        payload
        token
        }
    }
`

btnSubmitLogin.addEventListener('click', (event) => {
    event.preventDefault();

    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

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