
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const weaponCards = document.querySelectorAll('.weapon-card');

    function filterWeapons(category) {
        weaponCards.forEach(card => {
            if (category === 'all') {
                card.classList.add('visible');
            } else if (card.dataset.category === category) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterWeapons(button.dataset.filter);
        });
    });

    filterWeapons('all');

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const subRegions = document.querySelector('.sub-regions');

                
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const activeContent = document.getElementById(tabId);
            activeContent.classList.add('active');
            activeContent.style.display = 'block';

            if (tabId === 'ainsel') {
                subRegions.classList.add('active');
            } else {
                subRegions.classList.remove('active');
            }
        });
    });

    const activeContent = document.querySelector('.tab-content.active');
    if (activeContent) {
        activeContent.style.display = 'block';
    }

    const regionButtons = document.querySelectorAll('.region-btn');
    regionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const regionName = button.getAttribute('data-region');
            console.log(`Exploring ${regionName}`);
        });
    });

    const mapImage = document.querySelector('.map-image');
    const mapOverlay = document.querySelector('.map-overlay');
    const mapFilters = document.querySelectorAll('.filter-options input');
    const mapMarkers = document.querySelectorAll('.map-marker');

    let scale = 1;
    mapImage.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        scale = Math.min(Math.max(1, scale + delta), 3);
        mapImage.style.transform = `scale(${scale})`;
    });

    mapFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            const filterType = filter.getAttribute('data-filter');
            mapMarkers.forEach(marker => {
                if (filter.checked) {
                    marker.classList.add('active');
                } else {
                    marker.classList.remove('active');
                }
            });
        });
    });

    mapMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            const tooltip = marker.querySelector('.marker-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            }
        });

        marker.addEventListener('mouseleave', () => {
            const tooltip = marker.querySelector('.marker-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.weapon-card, .armor-card, .boss-card, .npc-card');

            items.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    }

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.weapon-card, .armor-card, .boss-card, .npc-card, .beginners-card').forEach(card => {
        animateOnScroll.observe(card);
    });

    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('darkMode', null);
        }
    });

    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    const modal = document.getElementById('weaponModal');
    const closeModal = document.querySelector('.close-modal');
    const detailsButtons = document.querySelectorAll('.details-button');

    const weaponData = {
        'uchigatana': {
            title: 'Uchigatana',
            type: 'Katana',
            image: 'images/weapons/uchigatana.jpg',
            stats: {
                physical: 115,
                magic: 0,
                fire: 0,
                lightning: 0,
                holy: 0
            },
            requirements: {
                strength: 11,
                dexterity: 15,
                intelligence: 0,
                faith: 0,
                arcane: 0
            },
            scaling: {
                strength: 'D',
                dexterity: 'D',
                intelligence: '-',
                faith: '-',
                arcane: '-'
            },
            location: 'Starting weapon for the Samurai class, or found in the Deathtouched Catacombs in Limgrave.',
            description: 'A katana with a long single-edged curved blade. A unique weapon wielded by the samurai from the Land of Reeds. The blade, with its undulating design, boasts extraordinary sharpness.',
            skill: 'Unsheathe: Sheathe blade, holding it at either the left or right hip. Follow up with either a normal or strong attack to perform a swift slash or strong slash.'
        },
        'rivers-of-blood': {
            title: 'Rivers of Blood',
            type: 'Katana',
            image: 'images/weapons/rivers-of-blood.jpg',
            stats: {
                physical: 76,
                magic: 0,
                fire: 76,
                lightning: 0,
                holy: 0
            },
            requirements: {
                strength: 12,
                dexterity: 18,
                intelligence: 0,
                faith: 0,
                arcane: 20
            },
            scaling: {
                strength: 'D',
                dexterity: 'D',
                intelligence: '-',
                faith: '-',
                arcane: 'C'
            },
            location: 'Dropped by Bloody Finger Okina at the Church of Repose in the Mountaintops of the Giants.',
            description: 'Weapon of Okina, swordsman from the Land of Reeds. A cursed weapon that has felled countless men. As if the blade itself was steeped in blood.',
            skill: 'Corpse Piler: Lunge forward to deliver a series of bloody slash attacks. Follow up with additional inputs to continue the attack sequence.'
        },
        'dark-moon-greatsword': {
            title: 'Dark Moon Greatsword',
            type: 'Greatsword',
            image: 'images/weapons/dark-moon-greatsword.jpg',
            stats: {
                physical: 82,
                magic: 78,
                fire: 0,
                lightning: 0,
                holy: 0
            },
            requirements: {
                strength: 16,
                dexterity: 11,
                intelligence: 38,
                faith: 0,
                arcane: 0
            },
            scaling: {
                strength: 'D',
                dexterity: 'D',
                intelligence: 'B',
                faith: '-',
                arcane: '-'
            },
            location: 'Reward for completing Ranni\'s questline.',
            description: 'A Moonlight Greatsword, bestowed upon them by Lunar Princess Ranni. The blade is imbued with the power of the full moon.',
            skill: 'Moonlight Greatsword: Enchant the blade with frost, then follow up with a strong attack to launch a wave of moonlight.'
        }
    };

    function openWeaponModal(weaponId) {
        const weapon = weaponData[weaponId];
        if (!weapon) return;

        document.querySelector('.weapon-title').textContent = weapon.title;
        document.querySelector('.weapon-type').textContent = weapon.type;
        document.querySelector('.modal-image img').src = weapon.image;
        document.querySelector('.modal-image img').alt = weapon.title;

        Object.entries(weapon.stats).forEach(([stat, value]) => {
            const statFill = document.querySelector(`[data-stat="${stat}"]`);
            if (statFill) {
                statFill.style.width = `${(value / 200) * 100}%`;
                statFill.textContent = value;
            }
        });

        Object.entries(weapon.requirements).forEach(([req, value]) => {
            const reqValue = document.querySelector(`.req-item:has(.req-label:contains('${req}')) .req-value`);
            if (reqValue) {
                reqValue.textContent = value;
            }
        });

        const scalingGrid = document.querySelector('.scaling-grid');
        scalingGrid.innerHTML = '';
        Object.entries(weapon.scaling).forEach(([stat, grade]) => {
            if (grade !== '-') {
                const scalingItem = document.createElement('div');
                scalingItem.className = 'scaling-item';
                scalingItem.innerHTML = `
                    <span class="stat-label">${stat}</span>
                    <span class="scaling-grade">${grade}</span>
                `;
                scalingGrid.appendChild(scalingItem);
            }
        });

        document.querySelector('.location-details').textContent = weapon.location;
        document.querySelector('.description-text').textContent = weapon.description;
        document.querySelector('.skill-details').textContent = weapon.skill;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeWeaponModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    detailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const weaponId = button.closest('.weapon-card').dataset.weaponId;
            openWeaponModal(weaponId);
        });
    });

    closeModal.addEventListener('click', closeWeaponModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeWeaponModal();
        }
    });

    const areaCards = document.querySelectorAll('.area-card');
    const subAreas = document.getElementById('ainsel-sub-areas');
    const areaDetailsContainer = document.querySelector('.area-details-container');
    const areaDetails = document.querySelectorAll('.area-details');
    const closeButtons = document.querySelectorAll('.close-area-btn');
    const subAreaButtons = document.querySelectorAll('.sub-area-nav-btn');
    
    areaCards.forEach(card => {
        const viewButton = card.querySelector('.view-area-btn');
        const areaId = card.getAttribute('data-area');
        
        viewButton.addEventListener('click', function() {
            if (areaId === 'ainsel') {
                subAreas.classList.add('active');
                
                subAreas.scrollIntoView({ behavior: 'smooth' });
            } else {
                showAreaDetails(areaId);
            }
        });
    });
    
    const subAreaCards = document.querySelectorAll('.sub-area-card');
    subAreaCards.forEach(card => {
        const viewButton = card.querySelector('.view-sub-area-btn');
        const areaId = card.getAttribute('data-area');
        
        viewButton.addEventListener('click', function() {
            showAreaDetails(areaId);
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            areaDetailsContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    subAreaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const areaId = button.getAttribute('data-area');
            showAreaDetails(areaId);
        });
    });
    
    function showAreaDetails(areaId) {
        areaDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        
        const selectedArea = document.getElementById(`${areaId}-details`);
        if (selectedArea) {
            areaDetailsContainer.style.display = 'block';
            selectedArea.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            selectedArea.scrollTop = 0;
        }
    }
    
    areaDetailsContainer.addEventListener('click', function(e) {
        if (e.target === areaDetailsContainer) {
            areaDetailsContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    areaCards.forEach(card => {
        observer.observe(card);
    });
    
    subAreaCards.forEach(card => {
        observer.observe(card);
    });
});

// Interactive Map
function initMap() {
    const map = L.map('eldenRingMap', {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        zoomControl: true
    });

    const mapBounds = [[0, 0], [1000, 1000]];
    const mapImage = L.imageOverlay('images/maps/elden-ring-map.jpg', mapBounds);
    mapImage.addTo(map);
    map.fitBounds(mapBounds);

    const createIcon = (type) => {
        return L.divIcon({
            className: 'custom-marker',
            html: `<svg width="24" height="24"><use href="images/markers/markers.svg#${type}"/></svg>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    };

    const icons = {
        grace: createIcon('grace'),
        merchant: createIcon('merchant'),
        boss: createIcon('boss'),
        dungeon: createIcon('dungeon'),
        item: createIcon('item')
    };

    const markers = {
        grace: [],
        merchant: [],
        boss: [],
        dungeon: [],
        item: []
    };

    const locations = [
        { type: 'grace', name: 'First Step', coords: [100, 100], description: 'Starting point for Tarnished' },
        { type: 'grace', name: 'Church of Elleh', coords: [120, 150], description: 'First merchant and crafting table' },
        { type: 'grace', name: 'Gatefront', coords: [180, 200], description: 'Near the first major boss encounter' },
        
        // Merchants
        { type: 'merchant', name: 'Kalé', coords: [130, 160], description: 'First merchant you encounter at Church of Elleh' },
        { type: 'merchant', name: 'Merchant of the Roundtable', coords: [250, 300], description: 'Found in the Roundtable Hold' },
        
        // Bosses
        { type: 'boss', name: 'Margit, the Fell Omen', coords: [190, 210], description: 'First major boss at Stormveil Castle' },
        { type: 'boss', name: 'Godrick the Grafted', coords: [220, 240], description: 'First Shardbearer boss' },
        
        // Dungeons
        { type: 'dungeon', name: 'Stormveil Castle', coords: [200, 230], description: 'First legacy dungeon' },
        { type: 'dungeon', name: 'Limgrave Tunnels', coords: [150, 180], description: 'Early game mining tunnel' },
        
        // Items
        { type: 'item', name: 'Golden Seed', coords: [140, 170], description: 'Upgrades your flask' },
        { type: 'item', name: 'Sacred Tear', coords: [160, 190], description: 'Upgrades flask potency' }
    ];

    locations.forEach(loc => {
        const marker = L.marker(loc.coords, { icon: icons[loc.type] })
            .bindPopup(`
                <div class="marker-popup">
                    <h3>${loc.name}</h3>
                    <p>${loc.description}</p>
                    ${loc.type === 'boss' ? '<p class="boss-warning">⚠️ Challenging boss fight</p>' : ''}
                    ${loc.type === 'dungeon' ? '<p class="dungeon-info">🏰 Legacy Dungeon</p>' : ''}
                </div>
            `, {
                className: `popup-${loc.type}`,
                maxWidth: 300
            });
        marker.addTo(map);
        markers[loc.type].push(marker);
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (filter === 'all') {
                Object.values(markers).forEach(markerGroup => {
                    markerGroup.forEach(marker => {
                        marker.addTo(map);
                        marker.getElement().style.opacity = '1';
                    });
                });
            } else {
                Object.entries(markers).forEach(([type, markerGroup]) => {
                    markerGroup.forEach(marker => {
                        if (type === filter) {
                            marker.addTo(map);
                            marker.getElement().style.opacity = '1';
                        } else {
                            marker.getElement().style.opacity = '0';
                            setTimeout(() => marker.remove(), 300);
                        }
                    });
                });
            }
        });
    });

    const searchInput = document.getElementById('mapSearch');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        locations.forEach(loc => {
            const marker = markers[loc.type].find(m => 
                m.getLatLng().lat === loc.coords[0] && 
                m.getLatLng().lng === loc.coords[1]
            );
            
            if (loc.name.toLowerCase().includes(searchTerm) || 
                loc.description.toLowerCase().includes(searchTerm)) {
                marker.addTo(map);
                marker.getElement().style.opacity = '1';
            } else {
                marker.getElement().style.opacity = '0';
                setTimeout(() => marker.remove(), 300);
            }
        });
    });

    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();
}); 

// Audio area 

let lechatmusic = document.getElementById("bg-music");
let clickButton = document.getElementById("cbx-51");

clickButton.addEventListener("change", () => {
    if (clickButton.checked) {
      lechatmusic.play();
    } else {
        lechatmusic.pause();
    }
  });