const toggleShowPass = document.getElementById('toggleShowPass');
const inputPass = document.getElementById('passwordInput');

toggleShowPass.addEventListener('click', (event) => {
    if (inputPass.type == 'password') {
        inputPass.type = 'text';
        event.target.src = '/static/img/eye-slash-fill.svg';
    } else {
        inputPass.type = 'password';
        event.target.src = '/static/img/eye-fill.svg';
    }
})
