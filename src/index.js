const refs = {
  playBtn: document.querySelector('.button__play-pause'),
  play: document.querySelector('.play'),
  pause: document.querySelector('.pause'),
  progressBar: document.querySelector('.progress__bar'),
  progress: document.querySelector('.progress'),
  song: document.querySelector('#audio'),
  burgerMenu: document.querySelector('.burger-menu'),
  bagdrop: document.querySelector('.backdrop'),
  closeMenu: document.querySelector('.close-btn'),
  dowlandMenu: document.querySelector('.link__trecks'),
  bagdropDown: document.querySelector('.dowland__bagdrop'),
  closeDown: document.querySelector('.close-btn-down'),  
}
refs.playBtn.addEventListener('click', onPlay);
function onPlay(){
  if (refs.playBtn.classList.contains('play')) {
    refs.playBtn.classList.remove('play')
    refs.playBtn.classList.add('pause')
    refs.song.play()
     }else{
      refs.playBtn.classList.add('play')
      refs.playBtn.classList.remove('pause')
      refs.song.pause()
     } 
}
refs.song.addEventListener('timeupdate', onSongTime)
function onSongTime(e){
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  refs.progressBar.style.width = `${progressPercent}%`; 
}

refs.progressBar.addEventListener('click', onProgress) 
 function onProgress (e){
  const width = refs.progress.clientWidth;
  let clickedOffSetX = e.offsetX;
  let soungDuration = refs.song.duration;

  refs.song.currentTime = (clickedOffSetX /  width) * soungDuration;
 
}



refs.burgerMenu.addEventListener('click', onModalContact);
refs.closeMenu.addEventListener('click', onModalContact);
refs.bagdrop.addEventListener('click', onModalContact);
function onModalContact(){
  if (refs.bagdrop.classList.contains('is-hidden')) {
    refs.bagdrop.classList.remove('is-hidden')
    document.body.classList.add('hidden')
     }else{
      refs.bagdrop.classList.add('is-hidden')
      document.body.classList.remove('hidden')
     } 
}
refs.dowlandMenu.addEventListener('click', onModalDown);
refs.bagdropDown.addEventListener('click', onModalDown);
refs.closeDown.addEventListener('click', onModalDown);
function onModalDown(){
  if (refs.bagdropDown.classList.contains('is-close')) {
    refs.bagdropDown.classList.remove('is-close')
    document.body.classList.add('hidden')
     }else{
      refs.bagdropDown.classList.add('is-close')
      document.body.classList.remove('hidden')
     } 
}
