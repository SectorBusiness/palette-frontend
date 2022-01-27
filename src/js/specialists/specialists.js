const specTrigger = document.querySelectorAll('.specialists-header-tabs .item');
const specBody = document.querySelectorAll('.specialists-content');

specTrigger.forEach((elem, index) => {
  elem.onclick = () => {
    specBody.forEach(elem => {
      elem.classList.remove('active');
    })
    specTrigger.forEach(elem => {
      elem.classList.remove('active');
    })
    elem.classList.add('active')
    specBody[index].classList.add('active')
  }
})