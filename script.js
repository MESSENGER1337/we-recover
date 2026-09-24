// Global State Options
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

// Global Categories List
const CATEGORIES = [
  "Treatment Directory",
  "Healthcare & Medicaid",
  "Housing Assistance",
  "Employment & Jobs",
  "ID & Legal Documents",
  "Support Groups"
];

// 1. Dynamic Burger Navigation Rendering
function renderBurgerNav() {
  const accountNavContainer = document.getElementById('bpAccountNav');
  if (!accountNavContainer) return;

  const navItems = [
    { label: 'Treatment Directory', url: 'treatment.html', isIcon: false },
    { label: 'My Stuff', url: 'mystuff.html', isIcon: false },
    { label: 'Login', url: 'login.html', isIcon: false },
    { label: 'Settings', url: 'settings.html', isIcon: true }
  ];

  let html = `<p class="bp-label">ACCOUNT & NAVIGATION</p>`;

  navItems.forEach(item => {
    if (item.isIcon) {
      html += `
        <a href="${item.url}" class="neo-btn ink-btn bp-btn" style="text-decoration:none; display:flex; align-items:center;">
          <span>${item.label}</span>
          <svg class="icon-gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 13a7.97 7.97 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a8.1 8.1 0 0 0-1.7-1L14.9 3h-4l-.4 2.9a8.1 8.1 0 0 0-1.7 1l-2.5-1-2 3.5L6.4 11a7.97 7.97 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a8.1 8.1 0 0 0 1.7 1l.4 2.9h4l.4-2.9a8.1 8.1 0 0 0 1.7-1l2.5 1 2-3.5-2.1-1.6Z"/>
          </svg>
        </a>`;
    } else {
      html += `
        <a href="${item.url}" class="neo-btn ink-btn bp-btn" style="text-decoration:none;">
          ${item.label} <span>&rarr;</span>
        </a>`;
    }
  });

  accountNavContainer.innerHTML = html;
}

// 2. Dynamic Categories Bar & Drawer Rendering
function renderCategories() {
  const categoryBar = document.getElementById('categoryBar');
  const bpCategories = document.getElementById('bpCategories');

  if (categoryBar) {
    categoryBar.innerHTML = CATEGORIES.map(cat => {
      const isTreatment = cat.toLowerCase().includes('treatment');
      const href = isTreatment ? 'treatment.html' : 'blank.html';
      return `<a href="${href}" class="cat-btn">${cat}</a>`;
    }).join('');
  }

  if (bpCategories) {
    let catHtml = `<p class="bp-label">CATEGORIES</p>`;
    CATEGORIES.forEach(cat => {
      const isTreatment = cat.toLowerCase().includes('treatment');
      const href = isTreatment ? 'treatment.html' : 'blank.html';
      catHtml += `<a href="${href}" class="neo-btn ink-btn bp-btn" style="text-decoration:none;">${cat} <span>&rarr;</span></a>`;
    });
    bpCategories.innerHTML = catHtml;
  }
}

// 3. Populate State Selectors and Keep Synced
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

// 4. Burger Panel Open / Close Logic
function initBurgerPanel() {
  const burgerBtn = document.getElementById('burgerBtn');
  const burgerPanel = document.getElementById('burgerPanel');
  const overlay = document.getElementById('overlay');

  if (!burgerBtn || !burgerPanel || !overlay) return;

  function openMenu() {
    burgerPanel.classList.add('open');
    overlay.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    burgerPanel.classList.remove('open');
    overlay.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  }

  burgerBtn.addEventListener('click', () => {
    const isOpen = burgerPanel.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  overlay.addEventListener('click', closeMenu);
}

// 5. Header Bar Viewport Scroll Behavior
function initHeaderScroll() {
  const barFull = document.getElementById('barFull');
  const barCompact = document.getElementById('barCompact');

  if (!barFull || !barCompact) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      barFull.style.display = 'none';
      barCompact.style.display = 'flex';
    } else {
      barFull.style.display = 'flex';
      barCompact.style.display = 'none';
    }
  });
}

// Execute logic when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderBurgerNav();
  renderCategories();
  initStates();
  initBurgerPanel();
  initHeaderScroll();
});

// (function(){
//   var STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

//   var CATEGORIES = {
//     "HEALTH": ["Find a clinic", "Mental health support", "Medication access"],
//     "BASICS": ["Food assistance", "Housing help", "ID & documents"],
//     "RECOVER": ["Treatment directory", "Peer support groups", "Aftercare planning"],
//     "LEGAL": ["Know your rights", "Expungement help", "Find legal aid"],
//     "THRIVE": ["Job search", "Skills & training", "Community events"]
//   };

//   function buildStateOptions(select){
//     if(!select) return;
//     STATES.forEach(function(state){
//       var opt = document.createElement('option');
//       opt.value = state;
//       opt.textContent = state;
//       if(state !== "Oklahoma"){ opt.disabled = true; }
//       if(state === "Oklahoma"){ opt.selected = true; }
//       select.appendChild(opt);
//     });
//   }
//   buildStateOptions(document.getElementById('stateSelect'));
//   buildStateOptions(document.getElementById('stateSelectMobile'));

//   // ---- Navigation to standalone blank.html page ----
//   function navigateToBlank(title){
//     window.location.href = 'blank.html?page=' + encodeURIComponent(title);
//   }

//   // ---- category bar (desktop dropdowns) ----
//   var catBar = document.getElementById('categoryBar');
//   if(catBar){
//     Object.keys(CATEGORIES).forEach(function(name){
//       var wrap = document.createElement('div');
//       wrap.className = 'cat-item';

//       var btn = document.createElement('button');
//       btn.className = 'cat-btn';
//       btn.setAttribute('aria-expanded','false');
//       btn.innerHTML = name + ' <svg class="cat-chevron" viewBox="0 0 10 7" fill="none"><path d="M0 0L5 7L10 0Z" fill="currentColor"/></svg>';

//       var panel = document.createElement('div');
//       panel.className = 'cat-panel neo-raised';
//       CATEGORIES[name].forEach(function(item){
//         var b = document.createElement('button');
//         b.textContent = item;
//         b.addEventListener('click', function(){
//           closeAllCatPanels();
//           navigateToBlank(item);
//         });
//         panel.appendChild(b);
//       });

//       btn.addEventListener('click', function(){
//         var isOpen = panel.classList.contains('open');
//         closeAllCatPanels();
//         if(!isOpen){
//           panel.classList.add('open');
//           btn.setAttribute('aria-expanded','true');
//         }
//       });

//       wrap.appendChild(btn);
//       wrap.appendChild(panel);
//       catBar.appendChild(wrap);
//     });
//   }

//   function closeAllCatPanels(){
//     document.querySelectorAll('.cat-panel').forEach(function(p){ p.classList.remove('open'); });
//     document.querySelectorAll('.cat-btn').forEach(function(b){ b.setAttribute('aria-expanded','false'); });
//   }
//   document.addEventListener('click', function(e){
//     if(!e.target.closest('.cat-item')){ closeAllCatPanels(); }
//   });

//   // ---- burger panel categories ----
//   var bpCategories = document.getElementById('bpCategories');
//   if(bpCategories){
//     Object.keys(CATEGORIES).forEach(function(name){
//       var cat = document.createElement('div');
//       cat.className = 'bp-cat';

//       var head = document.createElement('button');
//       head.innerHTML = name + ' <svg class="cat-chevron" viewBox="0 0 10 7" fill="none"><path d="M0 0L5 7L10 0Z" fill="currentColor"/></svg>';
//       head.addEventListener('click', function(){ cat.classList.toggle('open'); });

//       var sub = document.createElement('div');
//       sub.className = 'bp-sub';
//       CATEGORIES[name].forEach(function(item){
//         var b = document.createElement('button');
//         b.textContent = item;
//         b.addEventListener('click', function(){
//           closeBurger();
//           navigateToBlank(item);
//         });
//         sub.appendChild(b);
//       });

//       cat.appendChild(head);
//       cat.appendChild(sub);
//       bpCategories.appendChild(cat);
//     });
//   }

//   // ---- burger open/close ----
//   var burgerBtn = document.getElementById('burgerBtn');
//   var burgerPanel = document.getElementById('burgerPanel');
//   var overlay = document.getElementById('overlay');

//   function openBurger(){
//     burgerPanel.classList.add('open');
//     overlay.classList.add('open');
//     burgerBtn.classList.add('open');
//     burgerBtn.setAttribute('aria-expanded','true');
//     document.body.classList.add('no-scroll');
//   }
//   function closeBurger(){
//     burgerPanel.classList.remove('open');
//     overlay.classList.remove('open');
//     burgerBtn.classList.remove('open');
//     burgerBtn.setAttribute('aria-expanded','false');
//     document.body.classList.remove('no-scroll');
//   }
//   if(burgerBtn){
//     burgerBtn.addEventListener('click', function(){
//       burgerPanel.classList.contains('open') ? closeBurger() : openBurger();
//     });
//   }
//   if(overlay){
//     overlay.addEventListener('click', closeBurger);
//   }

//   // ---- top-level & footer nav buttons -> blank page ----
//   document.querySelectorAll('[data-page]').forEach(function(btn){
//     btn.addEventListener('click', function(e){
//       e.preventDefault();
//       closeBurger();
//       var label = btn.getAttribute('data-page') || btn.textContent.trim();
//       navigateToBlank(label);
//     });
//   });

//   // ---- Initialize blank.html title from URL query params ----
//   var blankTitle = document.getElementById('blankTitle');
//   if(blankTitle){
//     var params = new URLSearchParams(window.location.search);
//     var pageParam = params.get('page');
//     if(pageParam){
//       blankTitle.textContent = decodeURIComponent(pageParam);
//     }
//   }

//   // ---- Back button handler on blank.html ----
//   var blankBack = document.getElementById('blankBack');
//   if(blankBack){
//     blankBack.addEventListener('click', function(){
//       window.location.href = 'index.html';
//     });
//   }

//   // ---- fixed bar: adaptive scroll toggling ----
//   var bar = document.getElementById('site-bar');
//   var hero = document.getElementById('hero');

//   if(bar && hero){
//     var ENTER = 80;
//     var EXIT  = 40;
//     var collapsed = false;

//     function setCollapsed(next){
//       if(next === collapsed) return;
//       collapsed = next;
//       bar.classList.toggle('scrolled', collapsed);
//       document.body.classList.toggle('nav-collapsed', collapsed);
//     }

//     var ticking = false;
//     function onScroll(){
//       if(ticking) return;
//       ticking = true;
//       requestAnimationFrame(function(){
//         var y = window.scrollY || window.pageYOffset;
//         if(!collapsed && y > ENTER){ setCollapsed(true); }
//         else if(collapsed && y < EXIT){ setCollapsed(false); }
        
//         ticking = false;
//       });
//     }
//     window.addEventListener('scroll', onScroll, {passive:true});
//   }

// })();