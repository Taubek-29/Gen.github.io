document.addEventListener('DOMContentLoaded', function() {
    // Получаем сохраненные данные
    const portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || {
        name: "Иван Иванов",
        job: "Веб-разработчик",
        about: "Специалист с опытом работы в веб-разработке более 5 лет.",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        projects: ["Корпоративный сайт", "Интернет-магазин", "Мобильное приложение"],
        email: "example@mail.com",
        theme: "minimal"
    };

    // Текущий слайд
    let currentSlide = 0;
    
    // Темы для презентации
    const themes = {
        minimal: {
            primary: "#6e8efb",
            secondary: "#a777e3",
            bg: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            text: "#333"
        },
        creative: {
            primary: "#ff7e5f",
            secondary: "#feb47b",
            bg: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
            text: "#fff"
        },
        tech: {
            primary: "#43cea2",
            secondary: "#185a9d",
            bg: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
            text: "#fff"
        },
        elegant: {
            primary: "#614385",
            secondary: "#516395",
            bg: "linear-gradient(135deg, #614385 0%, #516395 100%)",
            text: "#fff"
        }
    };

    // Слайды презентации
    const slides = [
        {
            type: "cover",
            title: portfolioData.name,
            subtitle: portfolioData.job,
            theme: portfolioData.theme
        },
        {
            type: "about",
            title: "Обо мне",
            content: portfolioData.about,
            theme: portfolioData.theme
        },
        {
            type: "skills",
            title: "Мои навыки",
            items: portfolioData.skills,
            theme: portfolioData.theme
        },
        {
            type: "projects",
            title: "Мои проекты",
            items: portfolioData.projects,
            theme: portfolioData.theme
        },
        {
            type: "contact",
            title: "Контакты",
            email: portfolioData.email,
            theme: portfolioData.theme
        }
    ];

    // Инициализация презентации
    function initPresentation() {
        renderSidebar();
        renderCurrentSlide();
        setupEventListeners();
    }

    // Рендерим боковую панель
    function renderSidebar() {
        const sidebar = document.querySelector('.sidebar');
        
        // Превью слайдов
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slide-previews';
        
        slides.forEach((slide, index) => {
            const preview = document.createElement('div');
            preview.className = `slide-preview ${index === currentSlide ? 'active' : ''}`;
            preview.innerHTML = `
                <div style="background: ${themes[slide.theme].bg}; height: 120px; display: flex; justify-content: center; align-items: center; color: ${themes[slide.theme].text}; padding: 15px;">
                    <h3 style="text-align: center;">${slide.title}</h3>
                </div>
            `;
            preview.addEventListener('click', () => {
                currentSlide = index;
                renderCurrentSlide();
                updateActivePreview();
            });
            slidesContainer.appendChild(preview);
        });
        
        // Редактор
        const editor = document.createElement('div');
        editor.className = 'editor-panel';
        editor.innerHTML = `
            <h3>Редактировать</h3>
            <div class="editor-group">
                <label>Тема презентации</label>
                <div class="theme-selector">
                    ${Object.keys(themes).map(theme => `
                        <div class="theme-option ${theme === portfolioData.theme ? 'selected' : ''}" 
                             data-theme="${theme}"
                             style="background: ${themes[theme].bg}; color: ${themes[theme].text}; display: flex; justify-content: center; align-items: center;">
                            ${theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="editor-group">
                <label for="edit-name">Имя</label>
                <input type="text" id="edit-name" value="${portfolioData.name}">
            </div>
            <div class="editor-group">
                <label for="edit-job">Профессия</label>
                <input type="text" id="edit-job" value="${portfolioData.job}">
            </div>
            <button id="save-changes" class="btn btn-primary" style="width: 100%; margin-top: 20px;">Сохранить изменения</button>
        `;
        
        sidebar.innerHTML = '';
        sidebar.appendChild(slidesContainer);
        sidebar.appendChild(editor);
    }

    // Рендерим текущий слайд
    function renderCurrentSlide() {
        const slide = slides[currentSlide];
        const presentation = document.querySelector('.presentation-view');
        const theme = themes[slide.theme];
        
        let slideContent = '';
        
        switch(slide.type) {
            case 'cover':
                slideContent = `
                    <div style="background: ${theme.bg}; height: 100%; display: flex; justify-content: center; align-items: center; text-align: center; color: ${theme.text}; padding: 40px;">
                        <div>
                            <h1 style="font-size: 3.5rem; margin-bottom: 20px;">${slide.title}</h1>
                            <p style="font-size: 1.5rem; opacity: 0.9;">${slide.subtitle}</p>
                        </div>
                    </div>
                `;
                break;
                
            case 'about':
                slideContent = `
                    <div style="background: ${theme.bg}; height: 100%; color: ${theme.text}; padding: 60px;">
                        <h2 style="font-size: 2.5rem; margin-bottom: 30px;">${slide.title}</h2>
                        <p style="font-size: 1.2rem; line-height: 1.6;">${slide.content}</p>
                    </div>
                `;
                break;
                
            case 'skills':
                slideContent = `
                    <div style="background: ${theme.bg}; height: 100%; color: ${theme.text}; padding: 60px;">
                        <h2 style="font-size: 2.5rem; margin-bottom: 30px;">${slide.title}</h2>
                        <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                            ${slide.items.map(skill => `
                                <div style="background: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 50px;">
                                    ${skill}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
                
            case 'projects':
                slideContent = `
                    <div style="background: ${theme.bg}; height: 100%; color: ${theme.text}; padding: 60px;">
                        <h2 style="font-size: 2.5rem; margin-bottom: 30px;">${slide.title}</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
                            ${slide.items.map(project => `
                                <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px;">
                                    <h3 style="margin-bottom: 15px;">${project}</h3>
                                    <p>Описание проекта</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
                
            case 'contact':
                slideContent = `
                    <div style="background: ${theme.bg}; height: 100%; color: ${theme.text}; padding: 60px; display: flex; justify-content: center; align-items: center; text-align: center;">
                        <div>
                            <h2 style="font-size: 2.5rem; margin-bottom: 30px;">${slide.title}</h2>
                            <p style="font-size: 1.5rem; margin-bottom: 40px;">Готов к новым проектам!</p>
                            <a href="mailto:${slide.email}" style="background: white; color: ${theme.primary}; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; display: inline-block;">
                                Написать мне
                            </a>
                        </div>
                    </div>
                `;
                break;
        }
        
        presentation.innerHTML = `
            <div class="slide slide-enter">
                ${slideContent}
                <div class="slide-nav">
                    <button id="prev-slide">←</button>
                    <button id="next-slide">→</button>
                </div>
            </div>
        `;
    }

    // Обновляем активное превью
    function updateActivePreview() {
        document.querySelectorAll('.slide-preview').forEach((preview, index) => {
            preview.classList.toggle('active', index === currentSlide);
        });
    }

    // Настройка обработчиков событий
    function setupEventListeners() {
        // Навигация по слайдам
        document.addEventListener('click', function(e) {
            if (e.target.id === 'prev-slide') {
                currentSlide = Math.max(0, currentSlide - 1);
                renderCurrentSlide();
                updateActivePreview();
            }
            
            if (e.target.id === 'next-slide') {
                currentSlide = Math.min(slides.length - 1, currentSlide + 1);
                renderCurrentSlide();
                updateActivePreview();
            }
        });
        
        // Выбор темы
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.dataset.theme;
                
                // Обновляем все слайды
                slides.forEach(slide => {
                    slide.theme = theme;
                });
                
                // Обновляем UI
                document.querySelectorAll('.theme-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                
                renderSidebar();
                renderCurrentSlide();
            });
        });
        
        // Сохранение изменений
        document.getElementById('save-changes')?.addEventListener('click', function() {
            // Обновляем данные
            portfolioData.name = document.getElementById('edit-name').value;
            portfolioData.job = document.getElementById('edit-job').value;
            portfolioData.theme = slides[0].theme;
            
            // Обновляем слайды
            slides[0].title = portfolioData.name;
            slides[0].subtitle = portfolioData.job;
            slides.forEach(slide => {
                slide.theme = portfolioData.theme;
            });
            
            // Перерисовываем
            renderSidebar();
            renderCurrentSlide();
            
            // Сохраняем в localStorage
            localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
            
            alert('Изменения сохранены!');
        });
    }

    // Инициализируем презентацию
    initPresentation();
});