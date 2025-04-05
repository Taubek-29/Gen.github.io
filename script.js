document.addEventListener('DOMContentLoaded', function() {
    // Кастомный курсор
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    // Анимация карточек при скролле
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.classList.add('animate__fadeInUp');
                card.style.animationDelay = `${index * 0.2}s`;
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запустить при загрузке
    
    // Обработка формы
    const portfolioForm = document.getElementById('portfolio-form');
    
    portfolioForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные
        const portfolioData = {
            name: document.getElementById('name').value,
            job: document.getElementById('job').value,
            about: document.getElementById('about').value,
            skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()),
            projects: document.getElementById('projects').value.split(',').map(project => project.trim()),
            email: document.getElementById('email').value,
            theme: document.getElementById('theme').value
        };
        
        // Сохраняем данные
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        
        // Перенаправляем на страницу портфолио
        window.location.href = 'portfolio.html';
    });
    
    // Плавные якорные ссылки
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});