// logout
const logout = () => {
    const query = `
    mutation {
        deleteTokenCookie {
            deleted
        }
    }
    `;

    fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
        }),
    }).then((res) => {
        location.href = '/';
    });
};

// modal exit

const btnExit = document.getElementById('btnExit');

btnExit.addEventListener('click', (event) => {
    logout();
})
