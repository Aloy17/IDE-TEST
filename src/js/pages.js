let currentPage = 'loading-page';
let currentLesson = 1;
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
    }
}
function loadLessonDetail(lessonId) {
    if (typeof lessons === 'undefined') {
        console.error('Lessons not loaded!');
        return;
    }
    const lesson = lessons[lessonId];
    if (!lesson) {
        console.error(`Lesson ${lessonId} not found!`);
        return;
    }
    currentLesson = lessonId;
    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-body').innerHTML = lesson.content;
    document.getElementById('lesson-code').textContent = lesson.code;
    document.getElementById('lesson-output').textContent = lesson.output || '(Output will vary)';
    const prevBtn = document.getElementById('prev-lesson-btn');
    const nextBtn = document.getElementById('next-lesson-btn');
    if (lessonId <= 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    if (lessonId >= 6) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
    showPage('tutorial-detail-page');
}
function initLoadingScreen() {
    document.body.classList.add('loaded');
    showPage('home-page');
}
function initNavigation() {
    const tutorialBtn = document.getElementById('tutorial-btn');
    const ideBtn = document.getElementById('ide-btn');
    if (tutorialBtn) {
        tutorialBtn.addEventListener('click', () => {
            showPage('tutorial-page');
        });
    }
    if (ideBtn) {
        ideBtn.addEventListener('click', () => {
            showPage('ide-page');
        });
    }
    const tutorialBackBtn = document.getElementById('tutorial-back-btn');
    if (tutorialBackBtn) {
        tutorialBackBtn.addEventListener('click', () => {
            showPage('home-page');
        });
    }
    const lessonBackBtn = document.getElementById('lesson-back-btn');
    if (lessonBackBtn) {
        lessonBackBtn.addEventListener('click', () => {
            showPage('tutorial-page');
        });
    }
    const prevLessonBtn = document.getElementById('prev-lesson-btn');
    const nextLessonBtn = document.getElementById('next-lesson-btn');
    if (prevLessonBtn) {
        prevLessonBtn.addEventListener('click', () => {
            if (currentLesson > 1) {
                loadLessonDetail(currentLesson - 1);
            }
        });
    }
    if (nextLessonBtn) {
        nextLessonBtn.addEventListener('click', () => {
            if (currentLesson < 6) {
                loadLessonDetail(currentLesson + 1);
            }
        });
    }
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showPage('home-page');
        });
    }
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    tutorialCards.forEach(card => {
        card.addEventListener('click', () => {
            const lessonId = parseInt(card.dataset.lesson);
            loadLessonDetail(lessonId);
        });
    });
}
function updateNavActive(activeId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeItem = document.getElementById(activeId);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initNavigation();
});