function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    var toggleIcon = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginDiv = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');

    console.log(window.location.pathname);
    

    if (document.getElementById('login-form') !== null) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;

            try {
                const response = await fetch('users.json');
                const users = await response.json();

                username = username.toLowerCase();
                password = password.toLowerCase();
                const isValidUser = users.some(user => user.username === username && user.password === password);

                if (isValidUser) {
                    localStorage.setItem('username', username);
                    window.location.href = 'home-image.html';
                } else {
                    const loginDiv = document.getElementById('login');
                    const passwordInput = document.getElementById('password');
                    const usernameInput = document.getElementById('username');

                    loginDiv.classList.add('shake');
                    setTimeout(() => {
                        loginDiv.classList.remove('shake');
                    }, 300);

                    passwordInput.classList.add('invalid');
                    usernameInput.classList.add('invalid');
                    setTimeout(() => {
                        passwordInput.classList.remove('invalid');
                        usernameInput.classList.remove('invalid');
                    }, 500);

                    passwordInput.value = '';
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
    
    if (window.location.pathname.includes('home-image.html')) {
        const imagePath = `images/${localStorage.getItem('username')}.png`; 
        localStorage.setItem('username', "");

        setImage(imagePath);
    }
    
    function setImage(imagePath) {
        const imageContainer = document.getElementById('imageContainer');
        const img = new Image();

        img.onload = function() {
            imageContainer.innerHTML = '';
            imageContainer.appendChild(img);
            img.classList.add('fade-in');
        };
        
        img.src = imagePath;
        img.alt = 'User Image'; 
    }
});
