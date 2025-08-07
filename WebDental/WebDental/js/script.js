// MCU Universe - Custom JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Welcome Alert - MODIFICADO: Solo se ejecuta si el body tiene id="home-page"
    if (document.body.id === 'home-page') {
        showWelcomeAlert();
    }
    
    // Dark Mode Toggle
    initDarkMode();
    
    // Scroll to Top Button
    initScrollToTop();
    
    // Initialize Quiz if on fans page
    if (document.getElementById('quizContainer')) {
        initQuiz();
    }
    
    // Initialize Character Comparison if on fans page
    if (document.getElementById('comparisonContainer')) {
        initCharacterComparison();
    }
    
    // Initialize Theories if on theories page
    if (document.getElementById('theoriesContainer')) {
        initTheories();
    }
    
    // Contact Form
    if (document.getElementById('contactForm')) {
        initContactForm();
    }
    
    // Add hover effects to all cards
    initHoverEffects();
});

// Welcome Alert
function showWelcomeAlert() {
    setTimeout(() => {
        Swal.fire({
            title: '¡Bienvenido al MCU Universe!',
            text: '"Soy Iron Man" - Únete a la comunidad de fans más épica del MCU',
            icon: 'success',
            background: '#1a1a1a',
            color: '#ffffff',
            confirmButtonColor: '#e23636',
            confirmButtonText: '¡Empezar la Aventura!',
            timer: 5000,
            timerProgressBar: true,
            showClass: {
                popup: 'animate__animated animate__zoomIn'
            },
            hideClass: {
                popup: 'animate__animated animate__zoomOut'
            }
        });
    }, 1000);
}

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (!darkModeToggle) return; // Safety check

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }
    
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        showNotification(isDark ? 'Modo Oscuro Activado' : 'Modo Claro Activado', 'info');
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// MCU Quiz Data
const quizData = [
    {
        question: "¿Cuál es el nombre real de Iron Man?",
        options: ["Tony Stark", "Bruce Wayne", "Peter Parker", "Steve Rogers"],
        correct: 0
    },
    {
        question: "¿De qué planeta viene Thor?",
        options: ["Midgard", "Jotunheim", "Asgard", "Vanaheim"],
        correct: 2
    },
    {
        question: "¿Cuál es el nombre del escudo del Capitán América?",
        options: ["Vibranium Shield", "Adamantium Shield", "Steel Shield", "No tiene nombre específico"],
        correct: 3
    },
    {
        question: "¿Cómo se llama el martillo de Thor?",
        options: ["Gungnir", "Mjolnir", "Stormbreaker", "Hofund"],
        correct: 1
    },
    {
        question: "¿Quién es el director de S.H.I.E.L.D.?",
        options: ["Phil Coulson", "Maria Hill", "Nick Fury", "Tony Stark"],
        correct: 2
    }
];

let currentQuiz = 0;
let quizScore = 0;
let userAnswers = [];

// Initialize Quiz
function initQuiz() {
    displayQuizQuestion();
}

function displayQuizQuestion() {
    const container = document.getElementById('quizContainer');
    if (!container || currentQuiz >= quizData.length) return;
    
    const question = quizData[currentQuiz];
    
    container.innerHTML = `
        <div class="quiz-container">
            <h3>Pregunta ${currentQuiz + 1} de ${quizData.length}</h3>
            <div class="quiz-question">${question.question}</div>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" onclick="selectAnswer(${index}, this)">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <div class="mt-3">
                <button class="btn btn-primary" onclick="nextQuestion()" disabled id="nextBtn">
                    ${currentQuiz === quizData.length - 1 ? 'Finalizar Quiz' : 'Siguiente'}
                </button>
            </div>
            <div class="progress mt-3">
                <div class="progress-bar bg-danger" style="width: ${((currentQuiz + 1) / quizData.length) * 100}%"></div>
            </div>
        </div>
    `;
}

function selectAnswer(answerIndex, element) {
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    element.classList.add('selected');
    userAnswers[currentQuiz] = answerIndex;
    
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (userAnswers[currentQuiz] === quizData[currentQuiz].correct) {
        quizScore++;
    }
    
    currentQuiz++;
    
    if (currentQuiz >= quizData.length) {
        showQuizResults();
    } else {
        displayQuizQuestion();
    }
}

function showQuizResults() {
    const container = document.getElementById('quizContainer');
    const percentage = (quizScore / quizData.length) * 100;
    
    let resultMessage = '';
    if (percentage >= 80) {
        resultMessage = '¡Eres un verdadero Avenger! 🦾';
    } else if (percentage >= 60) {
        resultMessage = '¡Buen trabajo, futuro héroe! 🛡️';
    } else {
        resultMessage = '¡Necesitas más entrenamiento! 📚';
    }
    
    container.innerHTML = `
        <div class="quiz-container text-center">
            <h2>¡Quiz Completado!</h2>
            <div class="display-4 text-primary mb-3">${quizScore}/${quizData.length}</div>
            <div class="h4 mb-4">${percentage.toFixed(0)}% de aciertos</div>
            <div class="h5 text-warning mb-4">${resultMessage}</div>
            <button class="btn btn-danger" onclick="restartQuiz()">Repetir Quiz</button>
            <button class="btn btn-outline-primary ms-2" onclick="shareResults()">Compartir Resultado</button>
        </div>
    `;
}

function restartQuiz() {
    currentQuiz = 0;
    quizScore = 0;
    userAnswers = [];
    displayQuizQuestion();
}

function shareResults() {
    const percentage = (quizScore / quizData.length) * 100;
    const text = `¡Acabo de completar el Quiz MCU con ${percentage.toFixed(0)}% de aciertos! 🦾 #MCUUniverse`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Resultado Quiz MCU',
            text: text,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(text);
        showNotification('Resultado copiado al portapapeles', 'success');
    }
}

// Character Comparison Data
const characters = [
    { name: "Iron Man", realName: "Tony Stark", power: 85, intelligence: 95, strength: 70, speed: 75, image: "🦾" },
    { name: "Thor", realName: "Thor Odinson", power: 95, intelligence: 70, strength: 95, speed: 85, image: "🔨" },
    { name: "Hulk", realName: "Bruce Banner", power: 90, intelligence: 90, strength: 100, speed: 60, image: "💚" },
    { name: "Capitán América", realName: "Steve Rogers", power: 75, intelligence: 80, strength: 85, speed: 80, image: "🛡️" },
    { name: "Spider-Man", realName: "Peter Parker", power: 80, intelligence: 85, strength: 75, speed: 90, image: "🕷️" }
];

// Initialize Character Comparison
function initCharacterComparison() {
    displayCharacterSelection();
}

function displayCharacterSelection() {
    const container = document.getElementById('comparisonContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="text-center mb-4">
            <h3>Selecciona dos personajes para comparar</h3>
        </div>
        <div class="row" id="characterGrid">
            ${characters.map((char, index) => `
                <div class="col-md-4 col-lg-2 mb-3">
                    <div class="character-card" onclick="selectCharacter(${index}, this)">
                        <div class="display-1 mb-2">${char.image}</div>
                        <h5>${char.name}</h5>
                        <small class="text-muted">${char.realName}</small>
                    </div>
                </div>
            `).join('')}
        </div>
        <div id="selectedCharacters" class="mt-4"></div>
        <div id="comparisonResult" class="mt-4"></div>
    `;
}

let selectedCompCharacters = [];

function selectCharacter(index, element) {
    if (selectedCompCharacters.length >= 2) {
        selectedCompCharacters = [];
        document.querySelectorAll('#characterGrid .character-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.getElementById('comparisonResult').innerHTML = '';
    }
    
    if (!selectedCompCharacters.includes(index)) {
        selectedCompCharacters.push(index);
        element.classList.add('selected');
        
        if (selectedCompCharacters.length === 2) {
            setTimeout(() => compareCharacters(), 500);
        }
    }
}

function compareCharacters() {
    const char1 = characters[selectedCompCharacters[0]];
    const char2 = characters[selectedCompCharacters[1]];
    
    const char1Total = char1.power + char1.intelligence + char1.strength + char1.speed;
    const char2Total = char2.power + char2.intelligence + char2.strength + char2.speed;
    
    const winner = char1Total >= char2Total ? char1 : char2; // >= para manejar empates
    const container = document.getElementById('comparisonResult');
    
    container.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-5">
                <div class="character-card p-3 ${winner === char1 ? 'winner' : ''}">
                    <div class="display-1 mb-2">${char1.image}</div>
                    <h4>${char1.name}</h4>
                    <div class="stats">
                        <div>Poder: ${char1.power}/100</div>
                        <div>Inteligencia: ${char1.intelligence}/100</div>
                        <div>Fuerza: ${char1.strength}/100</div>
                        <div>Velocidad: ${char1.speed}/100</div>
                        <div class="fw-bold mt-2">Total: ${char1Total}/400</div>
                    </div>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="vs-text display-4">VS</div>
            </div>
            <div class="col-md-5">
                <div class="character-card p-3 ${winner === char2 ? 'winner' : ''}">
                    <div class="display-1 mb-2">${char2.image}</div>
                    <h4>${char2.name}</h4>
                    <div class="stats">
                        <div>Poder: ${char2.power}/100</div>
                        <div>Inteligencia: ${char2.intelligence}/100</div>
                        <div>Fuerza: ${char2.strength}/100</div>
                        <div>Velocidad: ${char2.speed}/100</div>
                        <div class="fw-bold mt-2">Total: ${char2Total}/400</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center mt-4">
            <h3 class="text-warning">🏆 ¡${winner.name} gana la batalla!</h3>
            <button class="btn btn-primary mt-3" onclick="initCharacterComparison()">Nueva Comparación</button>
        </div>
    `;
}

// Theories System
let theories = [
    { id: 1, title: "Los X-Men ya están en el MCU", content: "Evidencia de que los mutantes han estado ocultos en el MCU desde el principio...", author: "MarvelFan2024", date: "2024-01-15", likes: 42 },
    { id: 2, title: "Doctor Doom será el próximo gran villano", content: "Análisis de las pistas dejadas sobre la llegada de Victor Von Doom...", author: "TheoryMaster", date: "2024-01-10", likes: 38 }
];

function initTheories() {
    displayTheories();
}

function displayTheories() {
    const container = document.getElementById('theoriesContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Teorías del MCU</h2>
            <button class="btn btn-primary" onclick="showAddTheoryModal()">
                <i class="fas fa-plus"></i> Nueva Teoría
            </button>
        </div>
        <div id="theoriesList">
            ${theories.map(theory => `
                <div class="theory-card">
                    <h4>${theory.title}</h4>
                    <p>${theory.content}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="theory-author">Por: ${theory.author}</span>
                            <small class="theory-date ms-2">${new Date(theory.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-danger" onclick="likeTheory(${theory.id})">
                                <i class="fas fa-heart"></i> ${theory.likes}
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function showAddTheoryModal() {
    Swal.fire({
        title: 'Nueva Teoría MCU',
        html: `
            <div class="text-start">
                <div class="mb-3"><input type="text" class="form-control" id="theoryTitle" placeholder="Título de tu teoría"></div>
                <div class="mb-3"><textarea class="form-control" id="theoryContent" rows="4" placeholder="Explica tu teoría..."></textarea></div>
                <div class="mb-3"><input type="text" class="form-control" id="theoryAuthor" placeholder="Tu nombre de usuario"></div>
            </div>`,
        showCancelButton: true,
        confirmButtonText: 'Publicar Teoría',
        cancelButtonText: 'Cancelar',
        background: '#1a1a1a', color: '#ffffff', confirmButtonColor: '#e23636',
        preConfirm: () => {
            const title = document.getElementById('theoryTitle').value;
            const content = document.getElementById('theoryContent').value;
            const author = document.getElementById('theoryAuthor').value;
            if (!title || !content || !author) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }
            return { title, content, author };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            addTheory(result.value);
        }
    });
}

function addTheory(theoryData) {
    const newTheory = {
        id: theories.length > 0 ? Math.max(...theories.map(t => t.id)) + 1 : 1,
        title: theoryData.title,
        content: theoryData.content,
        author: theoryData.author,
        date: new Date().toISOString().split('T')[0],
        likes: 0
    };
    
    theories.unshift(newTheory);
    displayTheories();
    showNotification('¡Teoría publicada exitosamente!', 'success');
}

function likeTheory(theoryId) {
    const theory = theories.find(t => t.id === theoryId);
    if (theory) {
        theory.likes++;
        displayTheories();
    }
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Enviando mensaje...', 'info');
        setTimeout(() => {
            showNotification('¡Mensaje enviado exitosamente!', 'success');
            form.reset();
        }, 2000);
    });
}

// Utility Function
function showNotification(message, type = 'info') {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#1a1a1a',
        color: '#ffffff',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
    
    Toast.fire({ icon: type, title: message });
}

function initHoverEffects() {
    document.querySelectorAll('.card, .feature-card, .news-card, .character-card, .team-card, .theory-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-5px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    });
}