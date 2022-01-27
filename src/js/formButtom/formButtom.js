const formButtomtriggr = document.querySelectorAll('.formButtom-body-triggers .item')
const formButtonDody = document.querySelectorAll('.formButtom-body-body')

formButtomtriggr.forEach((elem, index) => {
  elem.addEventListener('click', () => {
    formButtomtriggr.forEach(elem => {
      elem.classList.remove('active')
    })
    formButtonDody.forEach(elem => {
      elem.classList.remove('active')
    })
    elem.classList.add('active')
    formButtonDody[index].classList.add('active')
  })
})