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
