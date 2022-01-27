//карточки долго грузятся просто
setTimeout(() => {
  //базовые кнопки модалки
  const bodyHTML = document.querySelector('body');
  const modalBg = document.querySelector('.modal-bg');
  const clolseModalBtn = document.querySelectorAll('.modal-close');

  //модалки
  const modalFeedback = document.querySelector('.modal-feedback');
  const modalServices = document.querySelector('.modal-serv');
  const modalHouse = document.querySelector('.modal-house');
  const modalPerson = document.querySelector('.modal-person');
  const modalNameServ = document.querySelector('.modal-nameServ');

  //кнопки вызывающие модалки
  const modFeedbackTrigger = document.querySelectorAll('.modFeedback');
  const modServivesTrigger = document.querySelectorAll('.modServTrigger');
  const modCatalorObject = document.querySelectorAll('.catalog__object');
  const modPersonTrigger = document.querySelectorAll('.specialists-card-title .details');
  const modOurServicesCard = document.querySelectorAll('.ourServices-swiper-card');

  //персонал переменные 
  const persImg = document.querySelectorAll('.specialists-card-body img');
  const persName = document.querySelectorAll('.specialists-card-title h5');
  const persState = document.querySelectorAll('.sepcialist-card-proff');

  const modalPersonImg = document.querySelector('.modal-person-img img');
  const modalPesonName = document.querySelector('.modal-person-left h3');
  const modalPersonState = document.querySelector('.modal-person-left p');
  const modalTelLink = document.querySelector('.modal-person-right .phone');
  const modalTelText = document.querySelector('.modal-person-right .phone .desc .tel');

  //услуги переменные
  const nameCardServ = document.querySelectorAll('.ourServices-swiper-card h5');

  const modalServName = document.querySelector('.nameServ-name');

  //основные функции модалок
  const closeModals = () => {
    modalBg.classList.remove('active');
    modalFeedback.classList.remove('active');
    modalServices.classList.remove('active');
    modalHouse.classList.remove('active');
    bodyHTML.classList.remove('active');
    modalPerson.classList.remove('active');
    modalNameServ.classList.remove('active');
  }
  const openModal = () => {
    modalBg.classList.add('active');
    bodyHTML.classList.add('active');
  }

  //закрывание модалок
  modalBg.onclick = () => {
    closeModals();
  }
  clolseModalBtn.forEach(elem => {
    elem.onclick = () => {
      closeModals();
    };
  });

  //открытие модалок
  modFeedbackTrigger.forEach(elem => {
    elem.onclick = () => {
      openModal();
      modalFeedback.classList.add('active');
    };
  });
  modServivesTrigger.forEach(elem => {
    elem.onclick = () => {
      openModal();
      modalServices.classList.add('active');
    };
  });
  modCatalorObject.forEach(elem => {
    elem.onclick = () => {
      openModal();
      modalHouse.classList.add('active');
    };
  });

  //персонал
  modPersonTrigger.forEach((elem, index) => {
    elem.onclick = () => {
      modalPersonImg.src = persImg[index].src
      modalPesonName.textContent = persName[index].textContent
      modalPersonState.textContent = persState[index].textContent

      openModal();
      modalPerson.classList.add('active');

    };
  });

  //услги
  modOurServicesCard.forEach((elem, index) => {
    elem.onclick = () => {
      modalServName.textContent = nameCardServ[index].textContent
      openModal();
      modalNameServ.classList.add('active');
    };
  });

}, 2000);