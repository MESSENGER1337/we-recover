(function(){
  var STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

  var CATEGORIES = {
    "HEALTH": ["Find a clinic", "Mental health support", "Medication access"],
    "BASICS": ["Food assistance", "Housing help", "ID & documents"],
    "RECOVER": ["Treatment directory", "Peer support groups", "Aftercare planning"],
    "LEGAL": ["Know your rights", "Expungement help", "Find legal aid"],
    "THRIVE": ["Job search", "Skills & training", "Community events"]
  };

  function buildStateOptions(select){
    STATES.forEach(function(state){
      var opt = document.createElement('option');
      opt.value = state;
      opt.textContent = state;
      if(state !== "Oklahoma"){ opt.disabled = true; }
      if(state === "Oklahoma"){ opt.selected = true; }
      select.appendChild(opt);
    });
  }
  buildStateOptions(document.getElementById('stateSelect'));
  buildStateOptions(document.getElementById('stateSelectMobile'));

  // ---- category bar (desktop dropdowns) ----
  var catBar = document.getElementById('categoryBar');
  Object.keys(CATEGORIES).forEach(function(name){
    var wrap = document.createElement('div');
    wrap.className = 'cat-item';

    var btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.setAttribute('aria-expanded','false');
    btn.innerHTML = name + ' <svg class="cat-chevron" viewBox="0 0 10 7" fill="none"><path d="M0 0L5 7L10 0Z" fill="currentColor"/></svg>';

    var panel = document.createElement('div');
    panel.className = 'cat-panel neo-raised';
    CATEGORIES[name].forEach(function(item){
      var b = document.createElement('button');
      b.textContent = item;
      b.addEventListener('click', function(){
        closeAllCatPanels();
        showBlank(item);
      });
      panel.appendChild(b);
    });

    btn.addEventListener('click', function(){
      var isOpen = panel.classList.contains('open');
      closeAllCatPanels();
      if(!isOpen){
        panel.classList.add('open');
        btn.setAttribute('aria-expanded','true');
      }
    });

    wrap.appendChild(btn);
    wrap.appendChild(panel);
    catBar.appendChild(wrap);
  });

  function closeAllCatPanels(){
    document.querySelectorAll('.cat-panel').forEach(function(p){ p.classList.remove('open'); });
    document.querySelectorAll('.cat-btn').forEach(function(b){ b.setAttribute('aria-expanded','false'); });
  }
  document.addEventListener('click', function(e){
    if(!e.target.closest('.cat-item')){ closeAllCatPanels(); }
  });

  // ---- burger panel categories ----
  var bpCategories = document.getElementById('bpCategories');
  Object.keys(CATEGORIES).forEach(function(name){
    var cat = document.createElement('div');
    cat.className = 'bp-cat';

    var head = document.createElement('button');
    head.innerHTML = name + ' <svg class="cat-chevron" viewBox="0 0 10 7" fill="none"><path d="M0 0L5 7L10 0Z" fill="currentColor"/></svg>';
    head.addEventListener('click', function(){ cat.classList.toggle('open'); });

    var sub = document.createElement('div');
    sub.className = 'bp-sub';
    CATEGORIES[name].forEach(function(item){
      var b = document.createElement('button');
      b.textContent = item;
      b.addEventListener('click', function(){
        closeBurger();
        showBlank(item);
      });
      sub.appendChild(b);
    });

    cat.appendChild(head);
    cat.appendChild(sub);
    bpCategories.appendChild(cat);
  });

  // ---- burger open/close ----
  var burgerBtn = document.getElementById('burgerBtn');
  var burgerPanel = document.getElementById('burgerPanel');
  var overlay = document.getElementById('overlay');

  function openBurger(){
    burgerPanel.classList.add('open');
    overlay.classList.add('open');
    burgerBtn.classList.add('open');
    burgerBtn.setAttribute('aria-expanded','true');
  }
  function closeBurger(){
    burgerPanel.classList.remove('open');
    overlay.classList.remove('open');
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded','false');
  }
  burgerBtn.addEventListener('click', function(){
    burgerPanel.classList.contains('open') ? closeBurger() : openBurger();
  });
  overlay.addEventListener('click', closeBurger);

  // ---- top-level nav buttons -> blank pages ----
  document.querySelectorAll('[data-page]').forEach(function(btn){
    btn.addEventListener('click', function(){
      closeBurger();
      var label = btn.textContent.trim() || btn.getAttribute('data-page');
      showBlank(label);
    });
  });

  // ---- blank page view ----
  var mainContent = document.getElementById('mainContent');
  var hero = document.getElementById('hero');
  var blankPage = document.getElementById('blankPage');
  var blankTitle = document.getElementById('blankTitle');
  var flash = document.getElementById('einkFlash');

  function einkFlash(){
    flash.classList.remove('flashing');
    void flash.offsetWidth;
    flash.classList.add('flashing');
  }

  function showBlank(title){
    einkFlash();
    blankTitle.textContent = title;
    hero.hidden = true;
    mainContent.hidden = true;
    blankPage.hidden = false;
    window.scrollTo(0, 0);
  }
  document.getElementById('blankBack').addEventListener('click', function(){
    einkFlash();
    blankPage.hidden = true;
    hero.hidden = false;
    mainContent.hidden = false;
  });

  // ---- fixed bar: only its CONTENTS swap on scroll, its own box never resizes,
  // so there is nothing here that can ever shift the page or fight the scroll. ----
  var bar = document.getElementById('site-bar');
  var mq = window.matchMedia('(max-width: 640px)');

  var ENTER = 80;  // switch to compact past this
  var EXIT  = 40;  // only switch back once above this (hysteresis avoids flicker at the edge)
  var collapsed = false;

  function setCollapsed(next){
    if(next === collapsed) return;
    collapsed = next;
    bar.classList.toggle('scrolled', collapsed);
    document.body.classList.toggle('nav-collapsed', collapsed);
  }

  var ticking = false;
  function onScroll(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      // Removed the mq.matches check so scrolling logic runs on all screen sizes
      var y = window.scrollY;
      if(!collapsed && y > ENTER){ setCollapsed(true); }
      else if(collapsed && y < EXIT){ setCollapsed(false); }
      
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});

})();