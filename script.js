/**
 * WE RECOVER - Main Application Script
 */

// ==========================================================================
// 1. DATA CONFIGURATION
// ==========================================================================

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];

const CATEGORY_GROUPS = [
  {
    title: "HEALTH",
    items: [
      { label: "Medicaid & Insurance", url: "blank.html" },
      { label: "Community Clinics", url: "blank.html" },
      { label: "Mental Health", url: "blank.html" }
    ]
  },
  {
    title: "BASICS",
    items: [
      { label: "Housing & Shelter", url: "blank.html" },
      { label: "Food Assistance", url: "blank.html" },
      { label: "Transportation", url: "blank.html" }
    ]
  },
  {
    title: "RECOVER",
    items: [
      { label: "Treatment Directory", url: "treatment.html" },
      { label: "Support Groups", url: "blank.html" },
      { label: "Peer Support", url: "blank.html" },
      { label: "Harm Reduction", url: "blank.html" }
    ]
  },
  {
    title: "LEGAL",
    items: [
      { label: "ID & Certificates", url: "blank.html" },
      { label: "Record Expungement", url: "blank.html" },
      { label: "Legal Aid", url: "blank.html" }
    ]
  },
  {
    title: "THRIVE",
    items: [
      { label: "Employment & Jobs", url: "blank.html" },
      { label: "Banking & Money", url: "blank.html" },
      { label: "Education & Training", url: "blank.html" }
    ]
  }
];

// ==========================================================================
// 2. RENDERING & EVENT HELPERS
// ==========================================================================

/**
 * Handles dropdown category navigation:
 * Resets the dropdown back to placeholder text, blurs focus to restore
 * the unpressed appearance, closes the burger panel, and navigates.
 */
function handleCategoryChange(selectEl) {
  if (!selectEl || !selectEl.value) return;
  const targetUrl = selectEl.value;

  // 1. Revert select control back to placeholder
  selectEl.value = "";

  // 2. Remove browser focus to restore the unpressed/raised CSS appearance
  selectEl.blur();

  // 3. Close mobile navigation menu if open
  const burgerPanel = document.getElementById('burgerPanel');
  const overlay = document.getElementById('overlay');
  const burgerBtn = document.getElementById('burgerBtn');

  if (burgerPanel) burgerPanel.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');

  // 4. Navigate to destination
  window.location.href = targetUrl;
}

/**
 * Builds HTML for category dropdown `<select>` elements.
 */
function buildCategorySelectHTML(group, selectClass = "ink-select") {
  const options = group.items
    .map(item => `<option value="${item.url}">${item.label}</option>`)
    .join('');

  return `
    <select class="${selectClass}" onchange="handleCategoryChange(this)" aria-label="${group.title} Category">
      <option value="" selected disabled>${group.title}</option>
      ${options}
    </select>`;
}

/**
 * Renders Account & Navigation links inside the slide-out burger menu.
 */
function renderBurgerNav() {
  const accountNavContainer = document.getElementById('bpAccountNav');
  if (!accountNavContainer) return;

  const navItems = [
    { label: 'My Stuff', url: 'mystuff.html', isIcon: false },
    { label: 'Login', url: 'login.html', isIcon: false },
    { label: 'Settings', url: 'settings.html', isIcon: true }
  ];

  let html = `<p class="bp-label">ACCOUNT & NAVIGATION</p>`;

  navItems.forEach(item => {
    if (item.isIcon) {
      html += `
        <a href="${item.url}" class="neo-btn ink-btn bp-btn nav-link-flex">
          <span>${item.label}</span>
          <svg class="icon-gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 13a7.97 7.97 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a8.1 8.1 0 0 0-1.7-1L14.9 3h-4l-.4 2.9a8.1 8.1 0 0 0-1.7 1l-2.5-1-2 3.5L6.4 11a7.97 7.97 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a8.1 8.1 0 0 0 1.7 1l.4 2.9h4l.4-2.9a8.1 8.1 0 0 0 1.7-1l2.5 1 2-3.5-2.1-1.6Z"/>
          </svg>
        </a>`;
    } else {
      html += `
        <a href="${item.url}" class="neo-btn ink-btn bp-btn nav-link">
          ${item.label} <span>&rarr;</span>
        </a>`;
    }
  });

  accountNavContainer.innerHTML = html;
}

/**
 * Renders Category Selectors into both Hero section and Burger Panel.
 */
function renderCategoryDropdowns() {
  const bpCategories = document.getElementById('bpCategories');
  const heroCategoryNav = document.getElementById('heroCategoryNav');

  // Populate Burger Menu Categories (dark ink selects)
  if (bpCategories) {
    let html = `<p class="bp-label">CATEGORIES</p>`;
    CATEGORY_GROUPS.forEach(group => {
      html += `<div class="bp-select-row-item">
        ${buildCategorySelectHTML(group, 'ink-select')}
      </div>`;
    });
    bpCategories.innerHTML = html;
  }

  // Populate Hero Category Bar (light neomorphic selects)
  if (heroCategoryNav) {
    heroCategoryNav.innerHTML = CATEGORY_GROUPS
      .map(group => buildCategorySelectHTML(group, 'neo-select'))
      .join('');
  }
}

/**
 * Populates state selector dropdowns and synchronizes their selections.
 */
function initStates() {
  const selects = [
    document.getElementById('stateSelect'),
    document.getElementById('stateSelectMobile')
  ].filter(Boolean);

  selects.forEach(select => {
    select.innerHTML = STATES.map(st => 
      `<option value="${st}" ${st === 'Oklahoma' ? 'selected' : ''}>${st}</option>`
    ).join('');

    select.addEventListener('change', (e) => {
      const val = e.target.value;
      selects.forEach(s => s.value = val);
    });
  });
}

// ==========================================================================
// 3. INTERACTIVE CONTROLS
// ==========================================================================

/**
 * Handles Opening/Closing of Mobile Burger Navigation Panel and prevents body scroll when active.
 */
function initBurgerPanel() {
  const burgerBtn = document.getElementById('burgerBtn');
  const burgerPanel = document.getElementById('burgerPanel');
  const overlay = document.getElementById('overlay');

  if (!burgerBtn || !burgerPanel || !overlay) return;

  function openMenu() {
    burgerPanel.classList.add('open');
    overlay.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    burgerPanel.classList.remove('open');
    overlay.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  burgerBtn.addEventListener('click', () => {
    const isOpen = burgerPanel.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  overlay.addEventListener('click', closeMenu);
}

/**
 * Toggles Header compact state upon page scrolling.
 */
function initHeaderScroll() {
  const siteBar = document.getElementById('site-bar');
  if (!siteBar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      siteBar.classList.add('scrolled');
    } else {
      siteBar.classList.remove('scrolled');
    }
  });
}

// ==========================================================================
// 4. INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderBurgerNav();
  renderCategoryDropdowns();
  initStates();
  initBurgerPanel();
  initHeaderScroll();
});
