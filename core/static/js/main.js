const showLoginModal = localStorage.getItem('showLoginModal') === 'true';

if (showLoginModal) {
    const loginModal = document.getElementById('loginModal');

    loginModal.classList.add('show');
    loginModal.style.display = 'block';
    loginModal.role = 'dialog';
    
    localStorage.removeItem('showLoginModal');
}