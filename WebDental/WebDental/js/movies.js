document.addEventListener('DOMContentLoaded', function() {
    initMovies();

    // Filter event listeners
    document.getElementById('phaseFilter').addEventListener('change', filterAndDisplay);
    document.getElementById('sortMovies').addEventListener('change', filterAndDisplay);

    // View toggle listeners
    document.getElementById('gridView').addEventListener('click', () => toggleView('grid'));
    document.getElementById('listView').addEventListener('click', () => toggleView('list'));

    // Phase indicator listeners
    document.querySelectorAll('.phase-indicator').forEach(indicator => {
        indicator.addEventListener('click', function() {
            const phase = this.dataset.phase;
            document.getElementById('phaseFilter').value = phase;
            filterAndDisplay();
        });
    });
});

// Movies Database
const moviesData = [
    // Phase 1
    { id: 'iron-man', title: 'Iron Man', year: 2008, phase: 'phase1', director: 'Jon Favreau', duration: '126 min', rating: 7.9, boxOffice: '$585.8M', description: 'El millonario ingeniero Tony Stark crea una armadura para luchar contra el mal.', icon: 'fas fa-robot', color: 'danger' },
    { id: 'incredible-hulk', title: 'The Incredible Hulk', year: 2008, phase: 'phase1', director: 'Louis Leterrier', duration: '112 min', rating: 6.7, boxOffice: '$263.4M', description: 'Bruce Banner busca una cura para la maldición que lo convierte en Hulk.', icon: 'fas fa-fist-raised', color: 'success' },
    { id: 'iron-man-2', title: 'Iron Man 2', year: 2010, phase: 'phase1', director: 'Jon Favreau', duration: '124 min', rating: 7.0, boxOffice: '$623.9M', description: 'Tony Stark enfrenta presión del gobierno para compartir su tecnología.', icon: 'fas fa-robot', color: 'danger' },
    { id: 'thor', title: 'Thor', year: 2011, phase: 'phase1', director: 'Kenneth Branagh', duration: '115 min', rating: 7.0, boxOffice: '$449.3M', description: 'El poderoso pero arrogante dios Thor es expulsado de Asgard a la Tierra.', icon: 'fas fa-bolt', color: 'warning' },
    { id: 'captain-america-first-avenger', title: 'Captain America: The First Avenger', year: 2011, phase: 'phase1', director: 'Joe Johnston', duration: '124 min', rating: 6.9, boxOffice: '$370.6M', description: 'Steve Rogers se convierte en el supersoldado Capitán América.', icon: 'fas fa-shield-alt', color: 'primary' },
    { id: 'avengers', title: 'The Avengers', year: 2012, phase: 'phase1', director: 'Joss Whedon', duration: '143 min', rating: 8.0, boxOffice: '$1.519B', description: 'Los héroes más poderosos de la Tierra se unen para detener a Loki.', icon: 'fas fa-users', color: 'info' },
    // Phase 2
    { id: 'iron-man-3', title: 'Iron Man 3', year: 2013, phase: 'phase2', director: 'Shane Black', duration: '130 min', rating: 7.1, boxOffice: '$1.215B', description: 'Tony Stark enfrenta al Mandarín mientras lidia con ansiedad post-traumática.', icon: 'fas fa-robot', color: 'danger' },
    { id: 'thor-dark-world', title: 'Thor: The Dark World', year: 2013, phase: 'phase2', director: 'Alan Taylor', duration: '112 min', rating: 6.8, boxOffice: '$644.8M', description: 'Thor se alía con Loki para salvar los Nueve Reinos de los Elfos Oscuros.', icon: 'fas fa-bolt', color: 'warning' },
    { id: 'captain-america-winter-soldier', title: 'Captain America: The Winter Soldier', year: 2014, phase: 'phase2', director: 'Russo Brothers', duration: '136 min', rating: 7.7, boxOffice: '$714.4M', description: 'Steve Rogers descubre una conspiración dentro de S.H.I.E.L.D.', icon: 'fas fa-shield-alt', color: 'primary' },
    { id: 'guardians-galaxy', title: 'Guardians of the Galaxy', year: 2014, phase: 'phase2', director: 'James Gunn', duration: '121 min', rating: 8.0, boxOffice: '$773.3M', description: 'Un grupo de criminales intergalácticos debe unirse para detener a Ronan.', icon: 'fas fa-rocket', color: 'success' },
    { id: 'avengers-age-ultron', title: 'Avengers: Age of Ultron', year: 2015, phase: 'phase2', director: 'Joss Whedon', duration: '141 min', rating: 7.3, boxOffice: '$1.403B', description: 'Los Avengers deben detener a Ultron, una IA rebelde creada por Tony Stark.', icon: 'fas fa-users', color: 'info' },
    { id: 'ant-man', title: 'Ant-Man', year: 2015, phase: 'phase2', director: 'Peyton Reed', duration: '117 min', rating: 7.3, boxOffice: '$519.3M', description: 'Scott Lang asume el manto de Ant-Man para planear un atraco.', icon: 'fas fa-bug', color: 'warning' },
    // Phase 3
    { id: 'captain-america-civil-war', title: 'Captain America: Civil War', year: 2016, phase: 'phase3', director: 'Russo Brothers', duration: '147 min', rating: 7.8, boxOffice: '$1.155B', description: 'Los Avengers se dividen en dos facciones por una disputa política.', icon: 'fas fa-handshake-slash', color: 'primary' },
    { id: 'doctor-strange', title: 'Doctor Strange', year: 2016, phase: 'phase3', director: 'Scott Derrickson', duration: '115 min', rating: 7.5, boxOffice: '$677.8M', description: 'Un neurocirujano aprende las artes místicas tras un accidente.', icon: 'fas fa-magic', color: 'info' },
    { id: 'guardians-galaxy-2', title: 'Guardians of the Galaxy Vol. 2', year: 2017, phase: 'phase3', director: 'James Gunn', duration: '136 min', rating: 7.6, boxOffice: '$863.8M', description: 'Los Guardianes desentrañan el misterio del padre de Peter Quill.', icon: 'fas fa-rocket', color: 'success' },
    { id: 'spider-man-homecoming', title: 'Spider-Man: Homecoming', year: 2017, phase: 'phase3', director: 'Jon Watts', duration: '133 min', rating: 7.4, boxOffice: '$880.2M', description: 'Peter Parker equilibra su vida de estudiante con ser Spider-Man.', icon: 'fas fa-spider', color: 'danger' },
    { id: 'thor-ragnarok', title: 'Thor: Ragnarok', year: 2017, phase: 'phase3', director: 'Taika Waititi', duration: '130 min', rating: 7.9, boxOffice: '$854.0M', description: 'Thor debe escapar de un planeta alienígena para salvar Asgard de Hela.', icon: 'fas fa-bolt', color: 'warning' },
    { id: 'black-panther', title: 'Black Panther', year: 2018, phase: 'phase3', director: 'Ryan Coogler', duration: '134 min', rating: 7.3, boxOffice: '$1.347B', description: 'T\'Challa regresa a Wakanda para asumir el trono, pero es desafiado.', icon: 'fas fa-paw', color: 'dark' },
    { id: 'avengers-infinity-war', title: 'Avengers: Infinity War', year: 2018, phase: 'phase3', director: 'Russo Brothers', duration: '149 min', rating: 8.4, boxOffice: '$2.048B', description: 'Los Avengers luchan para detener a Thanos y su búsqueda de las Gemas del Infinito.', icon: 'fas fa-gem', color: 'info' },
    { id: 'ant-man-wasp', title: 'Ant-Man and the Wasp', year: 2018, phase: 'phase3', director: 'Peyton Reed', duration: '118 min', rating: 7.0, boxOffice: '$622.7M', description: 'Scott Lang se asocia con Hope van Dyne para una misión de rescate.', icon: 'fas fa-bug', color: 'warning' },
    { id: 'captain-marvel', title: 'Captain Marvel', year: 2019, phase: 'phase3', director: 'Anna Boden, Ryan Fleck', duration: '123 min', rating: 6.8, boxOffice: '$1.128B', description: 'Carol Danvers se convierte en una de las heroínas más poderosas del universo.', icon: 'fas fa-star', color: 'warning' },
    { id: 'avengers-endgame', title: 'Avengers: Endgame', year: 2019, phase: 'phase3', director: 'Russo Brothers', duration: '181 min', rating: 8.4, boxOffice: '$2.798B', description: 'Los Avengers restantes intentan deshacer las acciones de Thanos.', icon: 'fas fa-infinity', color: 'info' },
    { id: 'spider-man-far-home', title: 'Spider-Man: Far From Home', year: 2019, phase: 'phase3', director: 'Jon Watts', duration: '129 min', rating: 7.4, boxOffice: '$1.132B', description: 'Peter Parker es reclutado por Nick Fury durante unas vacaciones en Europa.', icon: 'fas fa-spider', color: 'danger' }
];

// === AÑADIDO: Películas de la Fase 4 ===
const phase4Movies = [
    { id: 'black-widow', title: 'Black Widow', year: 2021, phase: 'phase4', director: 'Cate Shortland', duration: '134 min', rating: 6.7, boxOffice: '$379.8M', description: 'Natasha Romanoff confronta su pasado y una peligrosa conspiración.', icon: 'fas fa-user-secret', color: 'dark' },
    { id: 'shang-chi', title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, phase: 'phase4', director: 'Destin Daniel Cretton', duration: '132 min', rating: 7.4, boxOffice: '$432.2M', description: 'Shang-Chi debe confrontar el pasado que creyó haber dejado atrás.', icon: 'fas fa-ring', color: 'danger' },
    { id: 'eternals', title: 'Eternals', year: 2021, phase: 'phase4', director: 'Chloé Zhao', duration: '156 min', rating: 6.3, boxOffice: '$402.1M', description: 'Una raza de seres inmortales se reúne para proteger a la humanidad.', icon: 'fas fa-atom', color: 'primary' },
    { id: 'spider-man-no-way-home', title: 'Spider-Man: No Way Home', year: 2021, phase: 'phase4', director: 'Jon Watts', duration: '148 min', rating: 8.2, boxOffice: '$1.922B', description: 'La identidad de Spider-Man es revelada, trayendo caos a su vida.', icon: 'fas fa-spider', color: 'danger' },
    { id: 'doctor-strange-multiverse', title: 'Doctor Strange in the Multiverse of Madness', year: 2022, phase: 'phase4', director: 'Sam Raimi', duration: '126 min', rating: 6.9, boxOffice: '$955.8M', description: 'Doctor Strange viaja por el multiverso para enfrentar a un nuevo adversario.', icon: 'fas fa-magic', color: 'info' },
    { id: 'thor-love-and-thunder', title: 'Thor: Love and Thunder', year: 2022, phase: 'phase4', director: 'Taika Waititi', duration: '118 min', rating: 6.2, boxOffice: '$760.9M', description: 'Thor busca la paz interior, pero debe enfrentarse al Carnicero de Dioses.', icon: 'fas fa-bolt', color: 'warning' },
    { id: 'black-panther-wakanda-forever', title: 'Black Panther: Wakanda Forever', year: 2022, phase: 'phase4', director: 'Ryan Coogler', duration: '161 min', rating: 6.7, boxOffice: '$859.2M', description: 'Wakanda llora la pérdida del Rey T\'Challa y lucha por proteger su nación.', icon: 'fas fa-paw', color: 'dark' }
];

// Upcoming Movies
const upcomingMovies = [
    { id: 'deadpool-3', title: 'Deadpool & Wolverine', year: 2024, phase: 'phase5', director: 'Shawn Levy', duration: 'N/A', rating: 'N/A', boxOffice: 'N/A', description: 'Wade Wilson regresa en una aventura multiversal junto a Wolverine.', icon: 'fas fa-mask', color: 'danger', releaseDate: '2024-07-26' },
    { id: 'blade', title: 'Blade', year: 2025, phase: 'phase5', director: 'Yann Demange', duration: 'N/A', rating: 'N/A', boxOffice: 'N/A', description: 'El cazador de vampiros llega al MCU interpretado por Mahershala Ali.', icon: 'fas fa-moon', color: 'dark', releaseDate: '2025-11-07' },
    { id: 'fantastic-four', title: 'The Fantastic Four', year: 2025, phase: 'phase6', director: 'Matt Shakman', duration: 'N/A', rating: 'N/A', boxOffice: 'N/A', description: 'La Primera Familia de Marvel finalmente llega al MCU.', icon: 'fas fa-fire', color: 'primary', releaseDate: '2025-07-25' }
];

// Unifica todas las películas en un solo arreglo
const allMoviesData = [...moviesData, ...phase4Movies, ...upcomingMovies];
let currentMovies = [...allMoviesData];

function initMovies() {
    filterAndDisplay();
}

// Función unificada para filtrar y ordenar
function filterAndDisplay() {
    const selectedPhase = document.getElementById('phaseFilter').value;
    const sortBy = document.getElementById('sortMovies').value;

    let filteredMovies;

    if (selectedPhase === 'all') {
        filteredMovies = [...allMoviesData];
    } else {
        filteredMovies = allMoviesData.filter(movie => movie.phase === selectedPhase);
    }

    switch (sortBy) {
        case 'chronological':
            filteredMovies.sort((a, b) => a.year - b.year || new Date(a.releaseDate) - new Date(b.releaseDate));
            break;
        case 'rating':
            filteredMovies.sort((a, b) => {
                if (a.rating === 'N/A') return 1;
                if (b.rating === 'N/A') return -1;
                return b.rating - a.rating;
            });
            break;
        case 'alphabetical':
            filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    currentMovies = filteredMovies;
    displayMovies(currentMovies);
    updatePhaseIndicators(selectedPhase);
}

function displayMovies(movies) {
    const container = document.getElementById('moviesContainer');
    if (!container) return;
    container.innerHTML = '';

    if (movies.length === 0) {
        container.innerHTML = `<div class="col-12 text-center"><p class="lead">No se encontraron películas para esta fase.</p></div>`;
        return;
    }

    movies.forEach(movie => {
        container.appendChild(createMovieCard(movie));
    });
}

function createMovieCard(movie) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.setAttribute('data-phase', movie.phase);

    const isUpcoming = !!movie.releaseDate;
    const isReleased = !isUpcoming;

    const cardHTML = `
        <div class="movie-card h-100 ${isUpcoming ? 'upcoming-card' : ''}" ${isReleased ? `onclick="showMovieDetail('${movie.id}')"` : ''}>
            <div class="movie-poster">
                <div class="movie-icon"><i class="${movie.icon} fa-3x text-${movie.color}"></i></div>
                <div class="movie-phase">${getPhaseLabel(movie.phase)}</div>
                ${isReleased ? `<div class="movie-rating"><i class="fas fa-star text-warning"></i> ${movie.rating}</div>` : `<div class="upcoming-badge">PRÓXIMAMENTE</div>`}
            </div>
            <div class="movie-info">
                <h5>${movie.title}</h5>
                <div class="movie-meta">
                    ${isReleased 
                        ? `<span><i class="fas fa-calendar text-primary"></i> ${movie.year}</span>
                           <span><i class="fas fa-clock text-info"></i> ${movie.duration}</span>`
                        : `<span class="upcoming-date"><i class="fas fa-calendar-alt text-primary"></i> ${formatDate(movie.releaseDate)}</span>`
                    }
                </div>
                <p class="movie-description">${movie.description.substring(0, 100)}...</p>
                ${isReleased 
                    ? `<div class="movie-stats">
                           <div><i class="fas fa-user-tie text-secondary"></i> ${movie.director}</div>
                           <div><i class="fas fa-dollar-sign text-success"></i> ${movie.boxOffice}</div>
                       </div>`
                    : ''
                }
            </div>
        </div>
    `;
    
    col.innerHTML = cardHTML;
    return col;
}

function toggleView(viewType) {
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');
    const container = document.getElementById('moviesContainer');
    if (!container || !gridBtn || !listBtn) return;

    if (viewType === 'grid') {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        container.className = 'row g-4';
    } else {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        container.className = 'list-view';
    }
}

function updatePhaseIndicators(selectedPhase) {
    document.querySelectorAll('.phase-indicator').forEach(indicator => {
        indicator.classList.toggle('active', indicator.dataset.phase === selectedPhase);
    });
}

function getPhaseLabel(phase) {
    const labels = {
        'phase1': 'Fase 1', 'phase2': 'Fase 2', 'phase3': 'Fase 3',
        'phase4': 'Fase 4', 'phase5': 'Fase 5', 'phase6': 'Fase 6'
    };
    return labels[phase] || phase;
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

function showMovieDetail(movieId) {
    const movie = allMoviesData.find(m => m.id === movieId);
    if (!movie) return;

    Swal.fire({
        title: movie.title,
        html: `
            <div class="text-start movie-detail-modal">
                <div class="row">
                    <div class="col-4 text-center">
                        <i class="${movie.icon} fa-4x text-${movie.color} mb-3"></i>
                        <div class="movie-rating-large">
                            <i class="fas fa-star text-warning"></i>
                            ${movie.rating}/10
                        </div>
                    </div>
                    <div class="col-8">
                        <h6>Información General</h6>
                        <p><strong>Año:</strong> ${movie.year}</p>
                        <p><strong>Director:</strong> ${movie.director}</p>
                        <p><strong>Duración:</strong> ${movie.duration}</p>
                        <p><strong>Fase:</strong> ${getPhaseLabel(movie.phase)}</p>
                        <p><strong>Recaudación:</strong> ${movie.boxOffice}</p>
                    </div>
                </div>
                <h6 class="mt-3">Sinopsis</h6>
                <p>${movie.description}</p>
            </div>
        `,
        showCancelButton: false,
        confirmButtonText: 'Cerrar',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#e23636',
        width: '600px'
    });
}