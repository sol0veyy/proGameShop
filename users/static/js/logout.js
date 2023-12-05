// logout
const btnExit = document.getElementById('btnExit');

btnExit.addEventListener('click', () => {
    const query = `
        mutation {
            deleteTokenCookie {
                deleted
            }
        }
    `

    fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query
        })
    })
        .then((res) => {
            location.href = '/';
        })
})