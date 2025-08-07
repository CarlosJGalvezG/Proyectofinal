document.addEventListener('DOMContentLoaded', function() {
    initCharacters();

    // Event listeners actualizados para llamar a la nueva función unificada
    document.getElementById('characterFilter').addEventListener('change', applyAndDisplayFilters);
    document.getElementById('characterSearch').addEventListener('input', applyAndDisplayFilters);

    // View toggle listeners (sin cambios)
    document.getElementById('gridViewChars').addEventListener('click', () => toggleCharacterView('grid'));
    document.getElementById('listViewChars').addEventListener('click', () => toggleCharacterView('list'));
});

// Characters Database
const charactersData = [
    // Heroes
    {
        id: 'iron-man',
        name: 'Iron Man',
        realName: 'Tony Stark',
        type: 'heroes',
        team: 'avengers',
        power: 85,
        intelligence: 95,
        strength: 70,
        speed: 75,
        durability: 80,
        icon: 'fas fa-robot',
        color: 'danger',
        description: 'Genius, billionaire, playboy, philanthropist. Tony Stark uses his advanced powered armor to protect the world as Iron Man.',
        abilities: ['Genius-level intellect', 'Powered armor suit', 'Arc reactor technology', 'Flight', 'Repulsors'],
        firstAppearance: 'Iron Man (2008)',
        actor: 'Robert Downey Jr.'
    },
    {
        id: 'captain-america',
        name: 'Capitán América',
        realName: 'Steve Rogers',
        type: 'heroes',
        team: 'avengers',
        power: 75,
        intelligence: 80,
        strength: 85,
        speed: 80,
        durability: 90,
        icon: 'fas fa-shield-alt',
        color: 'primary',
        description: 'Un supersoldado de la Segunda Guerra Mundial que lidera a los Avengers con su escudo de vibranium.',
        abilities: ['Enhanced strength', 'Enhanced speed', 'Enhanced durability', 'Master tactician', 'Vibranium shield'],
        firstAppearance: 'Captain America: The First Avenger (2011)',
        actor: 'Chris Evans'
    },
    {
        id: 'thor',
        name: 'Thor',
        realName: 'Thor Odinson',
        type: 'heroes',
        team: 'avengers',
        power: 95,
        intelligence: 70,
        strength: 95,
        speed: 85,
        durability: 95,
        icon: 'fas fa-bolt',
        color: 'warning',
        description: 'El Dios Asgardiano del Trueno, empuña el martillo Mjolnir y protege los Nueve Reinos.',
        abilities: ['Super strength', 'Weather control', 'Flight', 'Lightning powers', 'Mjolnir/Stormbreaker'],
        firstAppearance: 'Thor (2011)',
        actor: 'Chris Hemsworth'
    },
    {
        id: 'hulk',
        name: 'Hulk',
        realName: 'Bruce Banner',
        type: 'heroes',
        team: 'avengers',
        power: 90,
        intelligence: 90,
        strength: 100,
        speed: 60,
        durability: 95,
        icon: 'fas fa-fist-raised',
        color: 'success',
        description: 'Un brillante científico que se transforma en un gigante verde incontrolable cuando se enoja.',
        abilities: ['Unlimited strength potential', 'Regeneration', 'Immunity to disease', 'Genius intellect (Banner)', 'Gamma radiation immunity'],
        firstAppearance: 'The Incredible Hulk (2008)',
        actor: 'Mark Ruffalo'
    },
    {
        id: 'spider-man',
        name: 'Spider-Man',
        realName: 'Peter Parker',
        type: 'heroes',
        team: 'avengers',
        power: 80,
        intelligence: 85,
        strength: 75,
        speed: 90,
        durability: 70,
        icon: 'fas fa-spider',
        color: 'danger',
        description: 'Un joven con poderes arácnidos que protege Nueva York como el amigable vecino Spider-Man.',
        abilities: ['Spider-sense', 'Wall-crawling', 'Enhanced agility', 'Web-shooters', 'Enhanced strength'],
        firstAppearance: 'Captain America: Civil War (2016)',
        actor: 'Tom Holland'
    },
    {
        id: 'black-widow',
        name: 'Black Widow',
        realName: 'Natasha Romanoff',
        type: 'heroes',
        team: 'avengers',
        power: 65,
        intelligence: 85,
        strength: 60,
        speed: 80,
        durability: 70,
        icon: 'fas fa-spider',
        color: 'dark',
        description: 'Una exespía rusa y maestra asesina que se convirtió en una de las Avengers más letales.',
        abilities: ['Master martial artist', 'Expert markswoman', 'Espionage', 'Acrobatics', 'Tactical genius'],
        firstAppearance: 'Iron Man 2 (2010)',
        actor: 'Scarlett Johansson'
    },
    {
        id: 'hawkeye',
        name: 'Hawkeye',
        realName: 'Clint Barton',
        type: 'heroes',
        team: 'avengers',
        power: 60,
        intelligence: 75,
        strength: 55,
        speed: 70,
        durability: 65,
        icon: 'fas fa-bullseye',
        color: 'info',
        description: 'Un arquero experto con puntería perfecta que nunca falla su objetivo.',
        abilities: ['Perfect aim', 'Master archer', 'Tactical expertise', 'Acrobatics', 'Hand-to-hand combat'],
        firstAppearance: 'Thor (2011)',
        actor: 'Jeremy Renner'
    },
    {
        id: 'doctor-strange',
        name: 'Doctor Strange',
        realName: 'Stephen Strange',
        type: 'heroes',
        team: 'defenders',
        power: 90,
        intelligence: 90,
        strength: 45,
        speed: 60,
        durability: 70,
        icon: 'fas fa-magic',
        color: 'info',
        description: 'El Hechicero Supremo que protege la Tierra de amenazas místicas y dimensionales.',
        abilities: ['Master of mystic arts', 'Astral projection', 'Time manipulation', 'Dimensional travel', 'Photographic memory'],
        firstAppearance: 'Doctor Strange (2016)',
        actor: 'Benedict Cumberbatch'
    },
    {
        id: 'black-panther',
        name: 'Black Panther',
        realName: 'T\'Challa',
        type: 'heroes',
        team: 'avengers',
        power: 85,
        intelligence: 85,
        strength: 80,
        speed: 85,
        durability: 90,
        icon: 'fas fa-paw',
        color: 'dark',
        description: 'El rey de Wakanda que protege su nación y el mundo con la tecnología de vibranium.',
        abilities: ['Enhanced senses', 'Enhanced strength', 'Enhanced speed', 'Vibranium suit', 'Master tactician'],
        firstAppearance: 'Captain America: Civil War (2016)',
        actor: 'Chadwick Boseman'
    },
    {
        id: 'captain-marvel',
        name: 'Captain Marvel',
        realName: 'Carol Danvers',
        type: 'heroes',
        team: 'avengers',
        power: 95,
        intelligence: 75,
        strength: 90,
        speed: 95,
        durability: 90,
        icon: 'fas fa-star',
        color: 'warning',
        description: 'Una de las heroínas más poderosas del universo con poderes cósmicos.',
        abilities: ['Energy absorption', 'Flight', 'Super strength', 'Energy projection', 'Cosmic awareness'],
        firstAppearance: 'Captain Marvel (2019)',
        actor: 'Brie Larson'
    },

    // Guardians of the Galaxy
    {
        id: 'star-lord',
        name: 'Star-Lord',
        realName: 'Peter Quill',
        type: 'heroes',
        team: 'guardians',
        power: 70,
        intelligence: 65,
        strength: 60,
        speed: 70,
        durability: 65,
        icon: 'fas fa-rocket',
        color: 'warning',
        description: 'El líder de los Guardianes de la Galaxia con herencia celestial.',
        abilities: ['Leadership', 'Marksmanship', 'Pilot skills', 'Celestial powers (former)', 'Element guns'],
        firstAppearance: 'Guardians of the Galaxy (2014)',
        actor: 'Chris Pratt'
    },
    {
        id: 'gamora',
        name: 'Gamora',
        realName: 'Gamora',
        type: 'heroes',
        team: 'guardians',
        power: 75,
        intelligence: 70,
        strength: 75,
        speed: 80,
        durability: 75,
        icon: 'fas fa-sword',
        color: 'success',
        description: 'La mujer más peligrosa de la galaxia y guardiana de la galaxia.',
        abilities: ['Master martial artist', 'Enhanced strength', 'Enhanced speed', 'Weapon mastery', 'Tactical expertise'],
        firstAppearance: 'Guardians of the Galaxy (2014)',
        actor: 'Zoe Saldana'
    },

    // Villains
    {
        id: 'thanos',
        name: 'Thanos',
        realName: 'Thanos',
        type: 'villains',
        team: 'none',
        power: 100,
        intelligence: 85,
        strength: 100,
        speed: 70,
        durability: 100,
        icon: 'fas fa-gem',
        color: 'secondary',
        description: 'El Titán Loco que buscó las Gemas del Infinito para eliminar la mitad de la vida en el universo.',
        abilities: ['Incredible strength', 'Genius intellect', 'Energy manipulation', 'Teleportation', 'Infinity Stones mastery'],
        firstAppearance: 'The Avengers (2012)',
        actor: 'Josh Brolin'
    },
    {
        id: 'loki',
        name: 'Loki',
        realName: 'Loki Laufeyson',
        type: 'antiheroes',
        team: 'none',
        power: 80,
        intelligence: 90,
        strength: 60,
        speed: 70,
        durability: 80,
        icon: 'fas fa-mask',
        color: 'success',
        description: 'El Dios de las Mentiras y hermano adoptivo de Thor, maestro del engaño y la magia.',
        abilities: ['Master sorcerer', 'Shapeshifting', 'Illusion creation', 'Enhanced longevity', 'Tactical genius'],
        firstAppearance: 'Thor (2011)',
        actor: 'Tom Hiddleston'
    },
    {
        id: 'ultron',
        name: 'Ultron',
        realName: 'Ultron',
        type: 'villains',
        team: 'none',
        power: 90,
        intelligence: 100,
        strength: 85,
        speed: 80,
        durability: 95,
        icon: 'fas fa-robot',
        color: 'secondary',
        description: 'Una inteligencia artificial rebelde creada por Tony Stark que busca la extinción de la humanidad.',
        abilities: ['Superhuman intelligence', 'Adamantium body', 'Energy projection', 'Flight', 'Mind transfer'],
        firstAppearance: 'Avengers: Age of Ultron (2015)',
        actor: 'James Spader (voice)'
    }
];

let currentCharacters = [...charactersData];

function initCharacters() {
    displayAllCharacters(currentCharacters);
}

function displayAllCharacters(characters) {
    const container = document.getElementById('charactersContainer');
    container.innerHTML = '';

    characters.forEach(character => {
        const characterCard = createCharacterCard(character);
        container.appendChild(characterCard);
    });
}

function createCharacterCard(character) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.setAttribute('data-type', character.type);
    col.setAttribute('data-team', character.team);

    const totalPower = character.power + character.intelligence + character.strength + character.speed + character.durability;
    const avgPower = Math.round(totalPower / 5);

    col.innerHTML = `
        <div class="character-card h-100" onclick="showCharacterDetail('${character.id}')">
            <div class="character-avatar">
                <div class="character-icon ${character.id}">
                    <i class="${character.icon}"></i>
                </div>
                ${character.id === 'iron-man' ? '<div class="character-arc-reactor"></div>' : ''}
            </div>
            <div class="character-info">
                <h4>${character.name}</h4>
                <p class="character-real-name">${character.realName}</p>
                <div class="character-type">
                    <span class="badge bg-${character.color}">${getTypeLabel(character.type)}</span>
                    <span class="badge bg-secondary">${getTeamLabel(character.team)}</span>
                </div>
                <div class="character-stats-mini">
                    <div class="stat-mini">
                        <span class="stat-label">Poder General</span>
                        <div class="stat-bar">
                            <div class="stat-fill bg-${character.color}" style="width: ${avgPower}%"></div>
                        </div>
                        <span class="stat-value">${avgPower}/100</span>
                    </div>
                </div>
                <p class="character-description-mini">${character.description.substring(0, 100)}...</p>
                <button class="btn btn-${character.color} btn-sm mt-2">
                    Ver Perfil Completo
                </button>
            </div>
        </div>
    `;

    return col;
}

/**
 * NUEVA FUNCIÓN UNIFICADA
 * Aplica el filtro de tipo y el término de búsqueda de forma conjunta.
 */
function applyAndDisplayFilters() {
    // Obtener los valores actuales de ambos campos
    const selectedType = document.getElementById('characterFilter').value;
    const searchTerm = document.getElementById('characterSearch').value.toLowerCase();

    // Empezar con la lista completa de personajes
    let filteredCharacters = [...charactersData];

    // Aplicar el filtro por tipo (si no es 'all')
    if (selectedType !== 'all') {
        filteredCharacters = filteredCharacters.filter(character => character.type === selectedType);
    }

    // Aplicar el filtro por búsqueda (si hay texto) sobre la lista ya filtrada
    if (searchTerm) {
        filteredCharacters = filteredCharacters.filter(character =>
            character.name.toLowerCase().includes(searchTerm) ||
            character.realName.toLowerCase().includes(searchTerm)
        );
    }

    // Guardar el resultado y mostrarlo en la UI
    currentCharacters = filteredCharacters;
    displayAllCharacters(currentCharacters);
}


function filterByTeam(team) {
    currentCharacters = charactersData.filter(character => character.team === team);
    displayAllCharacters(currentCharacters);

    // Update filter dropdown
    document.getElementById('characterFilter').value = 'all';
    // Limpiar el campo de búsqueda para evitar conflictos con esta función
    document.getElementById('characterSearch').value = '';
}

function toggleCharacterView(viewType) {
    const gridBtn = document.getElementById('gridViewChars');
    const listBtn = document.getElementById('listViewChars');
    const container = document.getElementById('charactersContainer');

    if (viewType === 'grid') {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        container.className = 'row g-4';
    } else {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        container.className = 'character-list-view';
    }
}

function getTypeLabel(type) {
    const labels = {
        'heroes': 'Héroe',
        'villains': 'Villano',
        'antiheroes': 'Antihéroe',
        'supporting': 'Apoyo'
    };
    return labels[type] || type;
}

function getTeamLabel(team) {
    const labels = {
        'avengers': 'Avengers',
        'guardians': 'Guardianes',
        'xmen': 'X-Men',
        'defenders': 'Defenders',
        'none': 'Independiente'
    };
    return labels[team] || team;
}

function showCharacterDetail(characterId) {
    const character = charactersData.find(c => c.id === characterId);
    if (!character) return;

    const totalPower = character.power + character.intelligence + character.strength + character.speed + character.durability;

    Swal.fire({
        title: character.name,
        html: `
            <div class="text-start character-detail-modal">
                <div class="row">
                    <div class="col-4 text-center">
                        <div class="character-icon-large ${character.id}">
                            <i class="${character.icon} fa-4x text-${character.color}"></i>
                        </div>
                        ${character.id === 'iron-man' ? '<div class="arc-reactor-large"></div>' : ''}
                        <div class="character-power-total mt-3">
                            <div class="power-circle">
                                <span class="power-number">${Math.round(totalPower/5)}</span>
                                <span class="power-label">Poder Total</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <h6>Información Personal</h6>
                        <p><strong>Nombre Real:</strong> ${character.realName}</p>
                        <p><strong>Tipo:</strong> ${getTypeLabel(character.type)}</p>
                        <p><strong>Equipo:</strong> ${getTeamLabel(character.team)}</p>
                        <p><strong>Primera Aparición:</strong> ${character.firstAppearance}</p>
                        <p><strong>Actor:</strong> ${character.actor}</p>
                        
                        <h6>Estadísticas</h6>
                        <div class="character-stats-detailed">
                            <div class="stat-row">
                                <span>Poder:</span>
                                <div class="stat-bar"><div class="stat-fill bg-danger" style="width: ${character.power}%"></div></div>
                                <span>${character.power}/100</span>
                            </div>
                            <div class="stat-row">
                                <span>Inteligencia:</span>
                                <div class="stat-bar"><div class="stat-fill bg-info" style="width: ${character.intelligence}%"></div></div>
                                <span>${character.intelligence}/100</span>
                            </div>
                            <div class="stat-row">
                                <span>Fuerza:</span>
                                <div class="stat-bar"><div class="stat-fill bg-warning" style="width: ${character.strength}%"></div></div>
                                <span>${character.strength}/100</span>
                            </div>
                            <div class="stat-row">
                                <span>Velocidad:</span>
                                <div class="stat-bar"><div class="stat-fill bg-success" style="width: ${character.speed}%"></div></div>
                                <span>${character.speed}/100</span>
                            </div>
                            <div class="stat-row">
                                <span>Resistencia:</span>
                                <div class="stat-bar"><div class="stat-fill bg-primary" style="width: ${character.durability}%"></div></div>
                                <span>${character.durability}/100</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h6>Descripción</h6>
                <p>${character.description}</p>
                
                <h6>Habilidades</h6>
                <div class="abilities-list">
                    ${character.abilities.map(ability => `<span class="ability-tag">${ability}</span>`).join('')}
                </div>
            </div>
        `,
        showCancelButton: false,
        confirmButtonText: 'Cerrar',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#e23636',
        width: '700px'
    });
}