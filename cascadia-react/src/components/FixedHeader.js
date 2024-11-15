export default function FixedHeader() {
  const body = document.querySelector('body');
  const fixedHeader = document.querySelector('.js-player-multi');
  const fixPlayerInitials = () => body.classList.add('fixed');
  const unfixPlayerInitials = () => body.classList.remove('fixed');

  if (fixedHeader) {
    let scrollPos = window.scrollY;
    let fixedHeaderTop = fixedHeader.offsetTop;

    window.addEventListener('scroll', function() { 
      scrollPos = window.scrollY;
      if (scrollPos >= fixedHeaderTop) { fixPlayerInitials() }
      else { unfixPlayerInitials() }
    });
  }
}