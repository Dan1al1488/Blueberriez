document.addEventListener("DOMContentLoaded", function () {
    const usernameEl = document.getElementById("username");
    const emailEl = document.getElementById("email");
    const profilePic = document.getElementById("profile-pic");
    const editProfileBtn = document.getElementById("edit-profile");
    const logoutBtn = document.getElementById("logout");

    // Загружаем данные пользователя из LocalStorage (если есть)
    const userData = JSON.parse(localStorage.getItem("user")) || {
        username: "Имя пользователя",
        email: "user@example.com",
        avatar: "default-avatar.png"
    };

    usernameEl.textContent = userData.username;
    emailEl.textContent = userData.email;
    profilePic.src = userData.avatar;

    // Кнопка редактирования профиля
    editProfileBtn.addEventListener("click", function () {
        const newName = prompt("Введите новое имя:", userData.username);
        if (newName) {
            userData.username = newName;
            usernameEl.textContent = newName;
            localStorage.setItem("user", JSON.stringify(userData));
        }
    });

    // Выход из аккаунта
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("user");
        alert("Вы вышли из аккаунта");
        window.location.href = "login.html"; // Перенаправление на страницу входа
    });
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
});

// При смене темы стили меняются
document.body.classList.add(localStorage.getItem('theme') || 'dark-theme');

document.getElementById('theme-toggle').addEventListener('click', function() {
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light-theme');
    } else {
        localStorage.setItem('theme', 'dark-theme');
    }
});

function goToHome() {
    window.location.href = "index.html"; // Меняй на свой путь к главной
}

document.querySelector(".edit-btn").addEventListener("click", function() {
    alert("Функция редактирования профиля пока не реализована!");
});

document.querySelector(".logout-btn").addEventListener("click", function() {
    alert("Вы успешно вышли из аккаунта!");
    window.location.href = "login.html"; // Поменяй на страницу входа
});

