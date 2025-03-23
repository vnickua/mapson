document.addEventListener('DOMContentLoaded', function() {
    // Прокручування до контенту при натисканні на стрілку в хедері
    const headerArrow = document.querySelector('.header-arrow');
    const introSection = document.querySelector('.intro');
    
    if (headerArrow && introSection) {
        headerArrow.addEventListener('click', function() {
            introSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Ефект паралаксу для хедера
    const headerLogo = document.querySelector('.header-logo');
    
    if (headerLogo) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition < 600) {
                // Створюємо ефект паралаксу, логотип рухається повільніше ніж прокручування
                headerLogo.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        });
    }

    // Дані для відображення в модальних вікнах
    const featureData = {
        map: {
            title: "Карта",
            icon: "map",
            image: "img/map.png",
            description: "Основний екран для перегляду карти та навігації. Тут ви можете переглядати карту, додавати точки, використовувати GPS відстеження своєї позиції та переміщатись по карті.\nЯкщо натиснути на екран та тримати в потрібному місці - можна додати точку в цьому місці."
        },
        layers: {
            title: "Шари",
            icon: "layer-group",
            image: "img/list_map.png",
            description: "Управління картографічними шарами. Додавайте власні MBTiles шари та керуйте їх видимістю на карті. З \"коробки\" є тільки Демо карта для демонстрації роботи додатку.\nДля використання вкласних карт та накладок формату .MBTILES - придбайте PREMIUM версію.\nВ преміум версії ви зможете використовувати ваші карти від додатку FMAP в додатку MapsON."
        },
        points: {
            title: "Точки",
            icon: "map-pin",
            image: "img/list_point.png",
            description: "Екран для управління вашими точками. Додавайте та видаляйте точки. \n- Натиснувши на назву точки та потримавши - перейдете до точки на карті. \n- Свайп в ліво на точці в списку - дозволяє видалити точку. \n- Свайп списку точок вниз - вмикає/вимикає \"режим фільту\" для точок в списку. \n- Перемикач навпроти точки - вмикає/вимикає показ точки на карті"
        },
        settings: {
            title: "Налаштування",
            icon: "cog",
            image: "img/seting.png",
            description: "Налаштування програми. Тут ви можете налаштувати відображення карти, змінити параметри та очистити збережені дані. (НЕ видаляє точки та накладки)."
        }
    };

    // Відкриття модального вікна з деталями функції
    const featureCards = document.querySelectorAll('.feature-card');
    const modal = document.getElementById('featureModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.querySelector('.feature-modal-icon');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');

    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const section = this.dataset.section;
            const data = featureData[section];
            
            modalTitle.textContent = data.title;
            modalIcon.className = `feature-modal-icon fas fa-${data.icon}`;
            modalImage.src = data.image;
            modalDescription.textContent = data.description;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Блокуємо прокрутку
        });
    });

    // Закриття модального вікна
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Відновлюємо прокрутку
    });

    // Закриття вікна при кліку поза модальним вікном
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Обробка форми контактів
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Тут можна додати код для відправки форми на сервер
        // Оскільки це демонстрація, ми покажемо повідомлення про успішну відправку
        
        const formData = {
            name,
            email,
            subject,
            message
        };
        
        console.log('Дані форми:', formData);
        
        // Створюємо повідомлення про успіх
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Дякуємо за ваше повідомлення, ${name}! Ми зв'яжемося з вами найближчим часом.</p>
        `;
        
        // Очищаємо форму і показуємо повідомлення
        contactForm.reset();
        contactForm.appendChild(successMessage);
        
        // Видаляємо повідомлення після 5 секунд
        setTimeout(() => {
            successMessage.classList.add('fade-out');
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 5000);
    });

    // Додаємо стилі для повідомлення про успіх
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            background-color: rgba(76, 217, 100, 0.1);
            border-left: 4px solid var(--accent-color);
            padding: 1rem;
            margin-top: 2rem;
            display: flex;
            align-items: center;
            border-radius: var(--border-radius);
            animation: fadeIn 0.5s;
        }
        
        .success-message i {
            color: var(--accent-color);
            font-size: 2rem;
            margin-right: 1rem;
        }
        
        .fade-out {
            opacity: 0;
            transition: opacity 0.5s;
        }
    `;
    document.head.appendChild(style);

    // Плавна анімація для елементів сторінки при прокрутці
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.premium-info, .contact-form, .footer-info, .footer-links');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Початкові стилі для елементів до анімації
    const elementsToAnimate = document.querySelectorAll('.premium-info, .contact-form, .footer-info, .footer-links');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s, transform 0.8s';
    });
    
    // Запускаємо анімацію при завантаженні та прокрутці
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}); 