// Transition de page uniforme (fondu) sur tout le site GGMobilités
document.addEventListener('DOMContentLoaded', function(){
  requestAnimationFrame(function(){ document.body.classList.add('page-ready'); });
});

document.addEventListener('click', function(e){
  const a = e.target.closest('a');
  if(!a) return;
  const href = a.getAttribute('href');
  if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
  if(a.target === '_blank' || a.hasAttribute('download')) return;
  if(href.startsWith('http') && !href.includes(location.hostname)) return;
  if(e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  document.body.classList.remove('page-ready');
  document.body.classList.add('page-leaving');
  setTimeout(function(){ location.href = href; }, 200);
});

// Repositionne les menus déroulants qui dépasseraient de l'écran (responsive)
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.nav-dropdown').forEach(function(dd){
    const menu = dd.querySelector('.dropdown-menu');
    if(!menu) return;
    dd.addEventListener('mouseenter', function(){
      menu.style.left = '';
      menu.style.right = '';
      const rect = menu.getBoundingClientRect();
      if(rect.right > window.innerWidth - 10){
        menu.style.left = 'auto';
        menu.style.right = '0';
      }
      if(rect.left < 10 && menu.style.right){
        // évite qu'il déborde aussi à gauche sur très petits écrans
        menu.style.right = '';
        menu.style.left = '0';
        menu.style.maxWidth = (window.innerWidth - 20) + 'px';
      }
    });
  });
});

// Petit utilitaire réutilisable : mettre un bouton en état "chargement"
function setBtnLoading(btn, loadingText){
  if(!btn) return;
  btn.dataset.originalText = btn.dataset.originalText || btn.innerHTML;
  btn.classList.add('btn-loading');
  btn.innerHTML = '<span class="loader-spin"></span> ' + (loadingText || 'Chargement...');
}
function unsetBtnLoading(btn){
  if(!btn) return;
  btn.classList.remove('btn-loading');
  if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
}
