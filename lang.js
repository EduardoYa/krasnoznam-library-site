const translations = {
    ru: {
        home: 'Главная',
        news: 'Новости',
        schedule: 'График работы',
        about: 'О библиотеке',
        welcome: 'Добро пожаловать!',
        brief: 'Сельская библиотека села Краснознаменное — уютное место для чтения и культурного развития.',
        weekdays: 'Понедельник — Пятница: 09:00–18:00',
        break: 'Перерыв: 13:00–14:00',
        weekends: 'Суббота — Воскресенье: выходной',
        address: 'Адрес: с. Краснознаменное, ул. Мектеп, 2',
        description1: 'Сельская библиотека села Краснознаменное — это уютное пространство, где каждый может найти книгу по душе.',
        description2: 'Мы работаем для школьников, студентов, учителей и всех жителей села.',
        services: 'Библиотека предоставляет:',
        service1: 'доступ к художественной и учебной литературе',
        service2: 'возможность чтения в читальном зале',
        service3: 'помощь в подборе литературы',
        service4: 'рекомендации по спискам чтения',
        goal: 'Наша цель — поддерживать интерес к чтению и развивать культурную жизнь нашего села.'
    },
    kz: {
        home: 'Басты бет',
        news: 'Жаңалықтар',
        schedule: 'Жұмыс кестесі',
        about: 'Кітапхана туралы',
        welcome: 'Қош келдіңіз!',
        brief: 'Краснознаменное ауылының ауылдық кітапханасы — оқу және мәдени даму үшін жайлы орын.',
        weekdays: 'Дүйсенбі — Жұма: 09:00–18:00',
        break: 'Үзіліс: 13:00–14:00',
        weekends: 'Сенбі — Жексенбі: демалыс',
        address: 'Мекенжай: Краснознаменное ауылы, Мектеп көшесі, 2',
        description1: 'Краснознаменное ауылының ауылдық кітапханасы — әркім өз талғамына сай кітап таба алатын жайлы кеңістік.',
        description2: 'Біз мектеп оқушылары, студенттер, мұғалімдер және ауылдың барлық тұрғындары үшін жұмыс істейміз.',
        services: 'Кітапхана ұсынады:',
        service1: 'көркем және оқу әдебиетіне қол жеткізу',
        service2: 'оқу залында оқу мүмкіндігі',
        service3: 'әдебиет таңдауда көмек',
        service4: 'оқу тізімдері бойынша ұсыныстар',
        goal: 'Біздің мақсатымыз — оқуға қызығушылықты қолдау және ауылымыздың мәдени өмірін дамыту.'
    }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    document.getElementById('lang-toggle').textContent = lang.toUpperCase();
}

document.addEventListener('DOMContentLoaded', () => {
    let lang = localStorage.getItem('lang') || 'ru';
    setLanguage(lang);

    document.getElementById('lang-toggle').addEventListener('click', () => {
        lang = lang === 'ru' ? 'kz' : 'ru';
        setLanguage(lang);
    });
});
