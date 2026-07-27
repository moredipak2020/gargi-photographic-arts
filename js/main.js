// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - CORE APPLICATION SCRIPT
// Features: Gallery Filtering, Digital Flipbook Modal, Video Songs & Shorts Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  renderGallery('all');
  renderVideoShowcase('all');
  renderGearCabinet();
  initFilterControls();
  initVideoFilterControls();
  initModals();
  initGSAPAnimations();
});

// Header & Navigation Scroll Effect
function initHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

// Render Portfolio Gallery Grid
function renderGallery(filterCategory = 'all') {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = '';

  const filteredItems = filterCategory === 'all'
    ? galleryData.filter(item => item.type === 'image')
    : galleryData.filter(item => item.category === filterCategory && item.type === 'image');

  filteredItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.setAttribute('data-id', item.id);

    // Clean category badge name (e.g. WEDDINGS)
    const badgeText = item.category.toUpperCase();

    card.innerHTML = `
      <div class="gallery-img-wrapper">
        <img src="${item.src}" alt="${item.title}" class="gallery-img" loading="lazy" />
        <span class="gallery-card-badge">${badgeText}</span>
        <div class="gallery-card-overlay">
          <h3 class="gallery-card-title">${item.title}</h3>
          <div class="gallery-card-meta">
            <span>📷 ${item.exif.camera}</span>
            <span>📍 ${item.exif.location.split(',')[0]}</span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openLightbox(item.id));
    galleryGrid.appendChild(card);
  });
}

// Render AI Video Showcase Section
function renderVideoShowcase(videoFilter = 'all') {
  const videoGrid = document.getElementById('videoGrid');
  if (!videoGrid) return;

  videoGrid.innerHTML = '';
  
  let videoItems = galleryData.filter(item => item.type === 'video');
  if (videoFilter !== 'all') {
    videoItems = videoItems.filter(item => item.videoSubtype === videoFilter);
  }

  videoItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    const pipelineHTML = item.pipelineBadges
      ? item.pipelineBadges.map(b => `<span class="pipeline-badge">${b}</span>`).join('')
      : '';

    card.innerHTML = `
      <div class="video-thumb-container" onclick="openVideoModal('${item.youtubeId}', '${item.title}')">
        <img src="${item.src}" alt="${item.title}" class="video-thumb" />
        <div class="play-btn-overlay">
          <div class="play-icon">▶</div>
        </div>
      </div>
      <div class="video-card-body">
        <div class="video-pipeline-badges">${pipelineHTML}</div>
        <h3 class="gallery-card-title" style="font-size: 1.25rem;">${item.title}</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.4rem;">${item.exif.story}</p>
      </div>
    `;

    videoGrid.appendChild(card);
  });
}

// Render Photographer Gear Cabinet
function renderGearCabinet() {
  const gearGrid = document.getElementById('gearGrid');
  if (!gearGrid || typeof gearData === 'undefined') return;

  gearGrid.innerHTML = '';
  const icons = ['📷', '🔎', '📷', '🧠'];

  gearData.forEach((gear, idx) => {
    const card = document.createElement('div');
    card.className = 'gear-card glass-panel';
    card.innerHTML = `
      <div class="gear-icon">${icons[idx % icons.length]}</div>
      <span class="gear-type">${gear.type}</span>
      <h3 class="gear-title">${gear.name}</h3>
      <p class="gear-specs">${gear.specs}</p>
      <p class="gear-desc">${gear.description}</p>
    `;
    gearGrid.appendChild(card);
  });
}

// Gallery Filter Controls
function initFilterControls() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderGallery(category);
    });
  });
}

// Video Filter Controls
function initVideoFilterControls() {
  const videoFilterBtns = document.querySelectorAll('.filter-btn[data-video-filter]');
  videoFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      videoFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const videoSubtype = btn.getAttribute('data-video-filter');
      renderVideoShowcase(videoSubtype);
    });
  });
}

// Lightbox Modal Functions
function openLightbox(itemId) {
  const item = galleryData.find(i => i.id === itemId);
  if (!item) return;

  const modal = document.getElementById('lightboxModal');
  const mediaContainer = document.getElementById('lightboxMedia');
  const detailsContainer = document.getElementById('lightboxDetails');

  mediaContainer.innerHTML = `<img src="${item.src}" alt="${item.title}" />`;
  
  const flipbookBtnHTML = item.flipbookUrl
    ? `<a href="${item.flipbookUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="margin-bottom: 0.75rem; width: 100%; justify-content: center;">📖 Launch Royal Digital Flipbook Album ↗</a>`
    : '';

  detailsContainer.innerHTML = `
    <div>
      <span style="color: var(--gold-primary); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em;">${item.category} Collection</span>
      <h2 style="font-size: 2.2rem; margin: 0.3rem 0 1rem 0;">${item.title}</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${item.exif.story}</p>
      
      <div class="exif-list">
        <div class="exif-item">
          <label>Camera Body</label>
          <span>${item.exif.camera}</span>
        </div>
        <div class="exif-item">
          <label>Optics / Lens</label>
          <span>${item.exif.lens}</span>
        </div>
        <div class="exif-item">
          <label>Aperture & Shutter</label>
          <span>${item.exif.aperture} @ ${item.exif.shutter}</span>
        </div>
        <div class="exif-item">
          <label>ISO & Location</label>
          <span>${item.exif.iso} | ${item.exif.location.split(',')[0]}</span>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      ${flipbookBtnHTML}
      <button class="btn-outline" style="width: 100%; justify-content: center;" onclick="openBookingModalWithService('${item.category}')">Inquire for Similar Shoot</button>
    </div>
  `;

  modal.classList.add('active');
}

// Digital Flipbook Preview Modal
function openFlipbookModal(url) {
  closeModals();
  const modal = document.getElementById('flipbookModal');
  const container = document.getElementById('flipbookModalContainer');
  
  container.innerHTML = `
    <iframe src="${url}" style="width:100%; height:100%; border:0;" title="Royal Digital Flipbook Wedding Album"></iframe>
  `;

  modal.classList.add('active');
}

// Video Modal Function
function openVideoModal(youtubeId, title) {
  const modal = document.getElementById('videoModal');
  const videoContainer = document.getElementById('videoModalContainer');
  
  videoContainer.innerHTML = `
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 16px;">
      <iframe src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1" 
              title="${title}"
              style="position: absolute; top:0; left:0; width:100%; height:100%; border:0;" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
      </iframe>
    </div>
  `;

  modal.classList.add('active');
}

// Booking Inquiry Modal
function openBookingModalWithService(serviceCategory = 'weddings') {
  closeModals();
  const bookingModal = document.getElementById('bookingModal');
  const serviceSelect = document.getElementById('shootTypeSelect');
  if (serviceSelect && serviceCategory) {
    serviceSelect.value = serviceCategory;
  }
  bookingModal.classList.add('active');
}

function initModals() {
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  closeBtns.forEach(btn => btn.addEventListener('click', closeModals));

  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModals();
    });
  });

  const bookingForm = document.getElementById('inquiryForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thank you! Your inquiry has been logged. Dipak More will reach out to discuss your project details shortly.");
      closeModals();
    });
  }
}

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.classList.remove('active');
  });
  const videoContainer = document.getElementById('videoModalContainer');
  if (videoContainer) videoContainer.innerHTML = '';
  const flipbookContainer = document.getElementById('flipbookModalContainer');
  if (flipbookContainer) flipbookContainer.innerHTML = '';
}

// GSAP Animations
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  gsap.from('.hero-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 });
  gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, delay: 0.4 });
  gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.6 });
  gsap.from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
  gsap.from('.hero-showcase-frame', { opacity: 0, scale: 0.92, duration: 1.2, delay: 0.4 });
}
