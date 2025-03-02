// Глобальные переменные
let cartItems = [];
let products = [
    { id: 1, name: "Ajazz AK820 Pro", price: 120, category: "keyboards", image: "keyboard.jpg" },
    { id: 2, name: "Logitech G502 X", price: 80, category: "speakers", image: "speakers.jpg" },
    { id: 3, name: "Samsung Odyssey G7", price: 520, category: "monitors", image: "monitor.jpg" },
    { id: 4, name: "HyperX Alloy Origins", price: 110, category: "keyboards", image: "keyboard 2.jpg" },
    { id: 5, name: "Razer DeathAdder V3", price: 70, category: "mice", image: "mouse 2.jpg" },
    { id: 6, name: "LG UltraGear 27GP850", price: 450, category: "monitors", image: "monitor 2.jpg" },
    { id: 7, name: "Keychron Q1", price: 150, category: "keyboards", image: "keyboard 3.jpg" },
    { id: 8, name: "Logitech MX Master 3S", price: 100, category: "mice", image: "mouse 3.jpg" },
    { id: 9, name: "ASUS ROG Swift PG279QM", price: 650, category: "monitors", image: "monitor 3.jpg" },
    { id: 10, name: "Ducky One 3", price: 130, category: "keyboards", image: "keyboard 4.jpg" },
    { id: 11, name: "Glorious Model O", price: 60, category: "mice", image: "mouse 4.jpg" },
    { id: 12, name: "Dell S2721DGF", price: 380, category: "monitors", image: "monitor 4.jpg" },
    { id: 13, name: "SteelSeries Apex Pro", price: 180, category: "keyboards", image: "keyboard5.jpg" },
    { id: 14, name: "Corsair K95 RGB Platinum", price: 200, category: "keyboards", image: "keyboard6.jpg" },
    { id: 15, name: "BenQ EX3501R", price: 600, category: "monitors", image: "monitor5.jpg" },
    { id: 16, name: "ASUS TUF Gaming VG259QM", price: 350, category: "monitors", image: "monitor6.jpg" },
    { id: 17, name: "Razer Basilisk V3", price: 90, category: "mice", image: "mouse5.jpg" },
    { id: 18, name: "Logitech G Pro X Superlight", price: 150, category: "mice", image: "mouse6.jpg" },
    { id: 19, name: "HyperX Cloud II", price: 100, category: "headsets", image: "headset1.jpg" },
    { id: 20, name: "SteelSeries Arctis Pro", price: 250, category: "headsets", image: "headset2.jpg" },
    { id: 21, name: "Razer BlackShark V2", price: 130, category: "headsets", image: "headset3.jpg" },
    { id: 22, name: "Logitech G733", price: 160, category: "headsets", image: "headset4.jpg" },
    { id: 23, name: "Corsair Virtuoso RGB Wireless", price: 180, category: "headsets", image: "headset5.jpg" },
    { id: 24, name: "Elgato Stream Deck", price: 150, category: "accessories", image: "streamdeck.jpg" },
    { id: 25, name: "Razer Seiren X", price: 100, category: "microphones", image: "mic.jpg" },
    { id: 26, name: "Shure SM7B", price: 400, category: "microphones", image: "mic2.jpg" },
    { id: 27, name: "Blue Yeti X", price: 170, category: "microphones", image: "mic3.jpg" },
    { id: 28, name: "Logitech C920 HD Pro", price: 80, category: "webcams", image: "webcam.jpg" },
    { id: 29, name: "Elgato Facecam", price: 200, category: "webcams", image: "webcam2.jpg" },
    { id: 30, name: "Razer LED strip", price: 40, category: "other", image: "led.jpg" },
     {id: 31, name: "Aula F75 ", price: 40, category: "keyboards", image: "keyboard7.jpg" },
     { id: 32, name: "MCHOSE A5 PRO", price: 25, category: "mice", image: "mouse7.jpg" },
     { id: 33, name: "AJAZZ AJ159 APEX", price: 20, category: "mice", image: "mouse8.jpg" },
];

// Инициализация страницы
function initPage() {
    renderProducts(products);
    setupEventListeners();
    updateCartCounter();
    
    // Загрузить корзину из localStorage если есть
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartCounter();
        renderCartItems();
    }
}
    

// Отрисовка продуктов
function renderProducts(productsToRender) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsContainer.innerHTML = '<div class="no-products">Товары не найдены</div>';
        return;
    }
    
    productsToRender.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.dataset.category = product.category;
        productElement.dataset.id = product.id;
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
        `;
        
        productElement.style.animationDelay = `${index * 0.1}s`;
        productsContainer.appendChild(productElement);
    });
    
    // Переподключить обработчики событий к новым элементам
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
            animateAddToCart(this);
        });
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Фильтрация по категориям
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Удалить активный класс со всех кнопок
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Добавить активный класс выбранной кнопке
            this.classList.add('active');
            
            // Фильтрация товаров
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === category);
                renderProducts(filteredProducts);
            }
        });
    });
    
    // Поиск товаров
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            renderProducts(products);
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm)
        );
        
        renderProducts(filteredProducts);
    });
    
    // Корзина - показать/скрыть выпадающее меню
    const cart = document.querySelector('.cart');
    cart.addEventListener('click', function(e) {
        const dropdown = this.querySelector('.cart-dropdown');
        dropdown.classList.toggle('show');
        e.stopPropagation();
    });
    
    // Закрыть корзину при клике вне её
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.cart')) {
            const dropdown = document.querySelector('.cart-dropdown');
            if (dropdown && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Проверяем, есть ли уже такой товар в корзине
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        // Увеличиваем количество
        cartItems[existingItemIndex].quantity += 1;
    } else {
        // Добавляем новый товар
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    updateCartCounter();
    renderCartItems();
    showSuccessNotification(`${product.name} добавлен в корзину`);
}

// Удаление товара из корзины
function removeFromCart(productId) {
    const index = cartItems.findIndex(item => item.id === productId);
    
    if (index > -1) {
        const product = cartItems[index];
        
        if (product.quantity > 1) {
            // Если больше одного, уменьшаем количество
            cartItems[index].quantity -= 1;
        } else {
            // Удаляем товар из корзины
            cartItems.splice(index, 1);
        }
        
        // Сохраняем корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        
        updateCartCounter();
        renderCartItems();
        showErrorNotification(`${product.name} удален из корзины`);
    }
}

// Очистка корзины
function clearCart() {
    cartItems = [];
    localStorage.removeItem('cart');
    updateCartCounter();
    renderCartItems();
    showSuccessNotification('Корзина очищена');
}

// Обновление счетчика товаров в корзине
function updateCartCounter() {
    const counter = document.querySelector('.cart-counter');
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    counter.textContent = totalItems;
}

// Отрисовка товаров в корзине
function renderCartItems() {
    const cartList = document.querySelector('.cart-list');
    const cartTotal = document.querySelector('.cart-total');
    
    cartList.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartList.innerHTML = '<li class="empty-cart">Корзина пуста</li>';
        cartTotal.textContent = 'Итого: $0';
        return;
    }
    
    let total = 0;
    
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div class="cart-item-info">
                <span>${item.name}</span>
                <span>$${item.price} x ${item.quantity}</span>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item" data-id="${item.id}">-</button>
                <button class="add-item" data-id="${item.id}">+</button>
            </div>
        `;
        
        cartList.appendChild(li);
    });
    
    // Добавить кнопку очистки корзины
    const clearButton = document.createElement('button');
    clearButton.className = 'clear-cart';
    clearButton.textContent = 'Очистить корзину';
    cartList.appendChild(clearButton);
    
    cartTotal.textContent = `Итого: $${total}`;
    
    // Добавить обработчики событий
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            removeFromCart(productId);
        });
    });
    
    document.querySelectorAll('.add-item').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
        });
    });
    
    document.querySelector('.clear-cart')?.addEventListener('click', function(e) {
        e.stopPropagation();
        clearCart();
    });
}

// Улучшенная анимация добавления в корзину
function animateAddToCart(button) {
    // Анимация кнопки
    button.style.animation = 'addToCartAnimation 0.5s';
    setTimeout(() => {
        button.style.animation = '';
    }, 500);
    
    // Создаем летящее изображение
    const productImg = button.closest('.product').querySelector('img');
    const rect = productImg.getBoundingClientRect();
    const cartIcon = document.querySelector('.cart');
    const cartRect = cartIcon.getBoundingClientRect();
    
    const flyingImg = document.createElement('img');
    flyingImg.src = productImg.src;
    flyingImg.className = 'fly-image';
    flyingImg.style.width = `${rect.width}px`;
    flyingImg.style.height = `${rect.height}px`;
    flyingImg.style.position = 'fixed';
    flyingImg.style.left = `${rect.left}px`;
    flyingImg.style.top = `${rect.top}px`;
    flyingImg.style.zIndex = '9999';
    flyingImg.style.borderRadius = '8px';
    
    // Расчет конечной точки анимации (центр корзины)
    const endX = cartRect.left + cartRect.width / 2 - rect.left - rect.width / 2;
    const endY = cartRect.top + cartRect.height / 2 - rect.top - rect.height / 2;
    
    flyingImg.style.setProperty('--end-x', `${endX}px`);
    flyingImg.style.setProperty('--end-y', `${endY}px`);
    
    document.body.appendChild(flyingImg);
    
    // Удаляем элемент после завершения анимации
    setTimeout(() => {
        flyingImg.remove();
        
        // Анимация корзины
        cartIcon.classList.add('bump');
        setTimeout(() => {
            cartIcon.classList.remove('bump');
        }, 500);
    }, 800);
}

// Показать красивое уведомление об успехе
function showSuccessNotification(message) {
    showNotification(message, 'success');
}

// Показать красивое уведомление об ошибке
function showErrorNotification(message) {
    showNotification(message, 'error');
}

// Показать уведомление
function showNotification(message, type) {
    // Создать элемент уведомления, если его еще нет в DOM
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    
    const container = document.querySelector('.notification-container');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.marginBottom = '10px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(50px)';
    notification.style.transition = 'opacity 0.3s, transform 0.3s';
    
    notification.innerHTML = `
        <div style="margin-right: 10px; font-size: 20px;">${type === 'success' ? '✓' : '✗'}</div>
        <div>${message}</div>
    `;
    
    container.appendChild(notification);
    
    // Показать уведомление с анимацией
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Скрыть и удалить уведомление
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(50px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Запуск инициализации при загрузке DOM
document.addEventListener('DOMContentLoaded', initPage);

// Enhanced cart animation function
function animateAddToCart(button) {
    // Animate button
    button.style.animation = 'addToCartAnimation 0.5s';
    setTimeout(() => {
        button.style.animation = '';
    }, 500);
    
    // Create flying image effect
    const productImg = button.closest('.product').querySelector('img');
    const rect = productImg.getBoundingClientRect();
    const cartIcon = document.querySelector('.cart');
    const cartRect = cartIcon.getBoundingClientRect();
    
    const flyingImg = document.createElement('img');
    flyingImg.src = productImg.src;
    flyingImg.className = 'fly-image';
    flyingImg.style.width = `${rect.width}px`;
    flyingImg.style.height = `${rect.height}px`;
    flyingImg.style.position = 'fixed';
    flyingImg.style.left = `${rect.left}px`;
    flyingImg.style.top = `${rect.top}px`;
    flyingImg.style.zIndex = '9999';
    flyingImg.style.borderRadius = '8px';
    
    // Calculate end point (center of cart)
    const endX = cartRect.left + cartRect.width / 2 - rect.width / 2 - rect.left;
    const endY = cartRect.top + cartRect.height / 2 - rect.height / 2 - rect.top;
    
    flyingImg.style.setProperty('--end-x', `${endX}px`);
    flyingImg.style.setProperty('--end-y', `${endY}px`);
    
    document.body.appendChild(flyingImg);
    
    // Remove flying image after animation ends
    setTimeout(() => {
        flyingImg.remove();
        
        // Animate cart with enhanced bump effect
        cartIcon.classList.add('bump');
        
        // Add glow effect to cart
        cartIcon.style.boxShadow = '0 0 20px var(--accent-color)';
        
        setTimeout(() => {
            cartIcon.classList.remove('bump');
            cartIcon.style.boxShadow = '';
        }, 500);
    }, 800);
}

// Improved renderCartItems function
function renderCartItems() {
    const cartList = document.querySelector('.cart-list');
    const cartTotal = document.querySelector('.cart-total');
    
    cartList.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartList.innerHTML = '<li class="empty-cart">😢 Ваша корзина пуста</li>';
        cartTotal.textContent = 'Итого: $0';
        
        // Remove clear cart button if exists
        const existingClearBtn = document.querySelector('.clear-cart');
        if (existingClearBtn) {
            existingClearBtn.remove();
        }
        return;
    }
    
    let total = 0;
    
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div class="cart-item-info">
                <span>${item.name}</span>
                <span>$${item.price} x ${item.quantity}</span>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item" data-id="${item.id}">-</button>
                <button class="add-item" data-id="${item.id}">+</button>
            </div>
        `;
        
        cartList.appendChild(li);
    });
    
    // Create clear cart button if it doesn't exist
    if (!document.querySelector('.clear-cart')) {
        const clearButton = document.createElement('button');
        clearButton.className = 'clear-cart';
        clearButton.textContent = 'Очистить корзину';
        
        const cartDropdown = document.querySelector('.cart-dropdown');
        cartDropdown.appendChild(clearButton);
        
        clearButton.addEventListener('click', function(e) {
            e.stopPropagation();
            clearCart();
        });
    }
    
    cartTotal.textContent = `Итого: $${total}`;
    
    // Add event listeners
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            removeFromCart(productId);
        });
    });
    
    document.querySelectorAll('.add-item').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
        });
    });
}
 
  

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    const ratingText = document.getElementById("rating-text");
    let selectedRating = 0;

    // Обработчик клика на звёзды
    stars.forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = parseInt(this.getAttribute("data-value"));

            stars.forEach(s => s.classList.remove("active"));
            for (let i = 0; i < selectedRating; i++) {
                stars[i].classList.add("active");
            }

            ratingText.innerText = `Ваша оценка: ${selectedRating} ⭐`;
        });
    });

    // Загрузка отзывов
    function loadReviews() {
        const reviewsList = document.getElementById("reviews-list");
        reviewsList.innerHTML = "";

        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.forEach(review => {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML = `<strong>${review.name}</strong> (${review.rating} ⭐) <p>${review.comment}</p>`;
            reviewsList.appendChild(reviewElement);
        });
    }

    // Обработчик кнопки "Оставить отзыв"
    document.getElementById("submit-review").addEventListener("click", function () {
        const username = document.getElementById("username").value.trim();
        const comment = document.getElementById("comment").value.trim();

        if (!username || !comment || selectedRating === 0) {
            alert("Пожалуйста, поставьте оценку, укажите имя и напишите комментарий.");
            return;
        }

        const newReview = { name: username, rating: selectedRating, comment: comment };
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Очищаем форму
        document.getElementById("username").value = "";
        document.getElementById("comment").value = "";
        ratingText.innerText = "";
        stars.forEach(s => s.classList.remove("active"));
        selectedRating = 0;

        loadReviews();
    });

    loadReviews();
});

document.addEventListener("DOMContentLoaded", function () {
    const reviews = [
        "Крутая мышь! 🔥",
        "Очень доволен качеством! 😍",
        "Сайт топчик! 🏆",
        "Быстрая доставка, спасибо! 🚀",
        "Отличный магазин, советую! ⭐",
        "Мышка реально удобная, рука не устаёт даже после долгой игры! 🎮",
        "Клавиатура шикарная, переключатели мягкие, печатать одно удовольствие. 😍",
        "Не ожидал такой быстрой доставки, курьер приехал через два дня! 🚀",
        "Камера топовая, качество изображения на стримах огонь! 🔥",
        "Купил себе LED-подсветку – теперь сетап выглядит как из киберпанка! 🌌",
        "Отличный магазин, всё чётко: цена, доставка, качество! 👍",
        "Уже второй раз тут заказываю, никогда не подводили. Спасибо! 😊",
        "Наушники мощные, звук чистый, басы качают! 🎧",
        "Сайт удобный, интерфейс понятный, всё оформил за пару минут. 🔥",
        "Брал подарок другу, ему очень понравилось! Теперь тоже тут заказываю. 🎁"
    ];


    const reviewsContainer = document.getElementById("reviews-container");

    function addReview(text) {
        const reviewBox = document.createElement("div");
        reviewBox.classList.add("review-box");
        reviewBox.textContent = text;
        reviewsContainer.appendChild(reviewBox);

        // Удаление старых отзывов, чтобы не перегружать контейнер
        if (reviewsContainer.children.length > 5) {
            reviewsContainer.removeChild(reviewsContainer.children[0]);
        }
    }

    function cycleReviews() {
        let index = 0;
        setInterval(() => {
            addReview(reviews[index]);
            index = (index + 1) % reviews.length;
        }, 3000); // Новый отзыв каждые 3 секунды
    }

    cycleReviews();
});



