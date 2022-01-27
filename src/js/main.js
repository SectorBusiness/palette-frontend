import "./default/phone-mask.js";
import "./default/scroll.js";
import "./default/select";
import Swiper from 'swiper/swiper-bundle';
// import "./catalog/_catalog";
// import "./services/services";
// import "./specialists/specialists";
// import "./formButtom/formButtom";
// import "./modals/modals";
import {Fancybox} from "@fancyapps/ui/src/Fancybox/Fancybox.js";

("use strict");
window.addEventListener("DOMContentLoaded", () => {
    Fancybox.bind("[data-fancybox]", {
        // Your options go here
      });

      const toTopBtn = document.querySelector('.scroll-up');

      toTopBtn.addEventListener('click', ()=>{
        window.scrollTo( 0, 0 );
      });
      window.addEventListener('scroll', ()=>{
          if(window.scrollY > 94){
            toTopBtn.classList.add('show');
          }else{
            toTopBtn.classList.remove('show');
          }
      })

    const mobNavBtn = document.querySelector('.mobile-nav-btn');

    mobNavBtn.addEventListener('click', (e) => {
        mobNavBtn.classList.toggle('opened');
        document.body.classList.toggle('oy-h');
    });

    const subNavContainers = document.querySelectorAll('.sub-nav-container');
    if (subNavContainers) {
        subNavContainers.forEach(container => {
            container.addEventListener('click', (e) => {

                e.stopPropagation();
                const subNav = container.querySelector('.sub-nav');

                if (subNav && (subNav.style.height === '0px' || !subNav.style.height)) {
                    subNav.style.height = subNav.scrollHeight + 'px';
                    subNav.style.paddingTop = '25px';
                    document.body.addEventListener('click', e => {
                        if (e.target !== subNav) {
                            subNav.style.height = 0;
                            subNav.style.paddingTop = 0;
                        }
                    });
                }
            });
        });
    }
    const navLinks = document.querySelectorAll('.nav__link, .sub-nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.href.substring(link.href.indexOf('#'));
            
            const offset = document.querySelector(id).getBoundingClientRect().top - document.body.getBoundingClientRect().top;
            if (window.innerWidth <= 992 && link.parentElement.classList.contains('sub-nav-container')) {
                return;
            }else if(window.innerWidth <= 992 && link.classList.contains('sub-nav__link')){
                window.scrollTo(0, offset - 92);
                mobNavBtn.classList.remove('opened');
                document.body.classList.remove('oy-h');
            } else if (window.innerWidth <= 992) {
                window.scrollTo(0, offset - 94);
                mobNavBtn.classList.remove('opened');
                document.body.classList.remove('oy-h');
            } else {
               window.scrollTo(0, offset);
            }
        });
    });
    const modalWrappers = document.querySelectorAll('.modal-wrapper');
    modalWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', (e) => {
            if (!(e.target.closest('.modal'))) {
                wrapper.classList.remove('show');
                document.body.classList.remove('oy-h');
            }
        });
    });
    const closeBtns = document.querySelectorAll('.close');

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-wrapper').classList.remove('show');
            document.body.classList.remove('oy-h');
        });
    });

    const modalBtns = document.querySelectorAll('[data-modal]');
    modalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.dataset.modal;
            const modal = document.querySelector(`#${modalId}`);
            modal.classList.add('show');
            document.body.classList.add('oy-h');
            // console.log(btn.dataset);
            if (btn.hasAttribute('data-get-number')) {
                const number = btn.closest('[phone-container]').querySelector('input[type="tel"]').value;
                modal.querySelector('input[type="tel"]').value = number;
            }
        });
    });


    // Поменять условие появления окна об успешной отправке заявки
    const successModal = document.querySelector('#success');

    const submitBtns = document.querySelectorAll('[type="submit"]');
    submitBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (btn.closest('.modal-wrapper.show')) {
                btn.closest('.modal-wrapper.show').classList.remove('show');
                successModal.classList.add('show');

            }
        });
    });
    // Поменять условие появления окна об успешной отправке заявки --- END


    // const videoPlayBtn = document.querySelector('#video1play');
    // const video1 = document.querySelector('#video1');
    // videoPlayBtn.addEventListener('click', (e) => {
    //     e.preventDefault()
    //     if (!video1.paused) {
    //         video1.pause();
    //     } else {
    //         video1.play();
    //     }
    // });

    // class ShadowTabs {
    //     constructor(triggers, bodyes) {
    //         this.triggers = document.querySelectorAll(triggers);
    //         this.bodyes = document.querySelectorAll(bodyes);
    //     }

    //     setClick() {
    //         this.triggers.forEach((trigger, i) => {
    //             trigger.onclick = () => {
    //                 this.update(i);
    //             };
    //         });
    //     }

    //     update(active) {
    //         for (let x = 0; x < this.triggers.length; x++) {
    //             this.triggers[x].classList.remove("active");
    //             this.bodyes[x].classList.remove("show");
    //         }
    //         this.triggers[active].classList.add("active");
    //         this.bodyes[active].classList.add("show");
    //     }

    //     create() {
    //         if (
    //             this.triggers &&
    //             this.bodyes &&
    //             this.triggers.length == this.bodyes.length &&
    //             this.triggers.length != 0 &&
    //             this.bodyes.length != 0
    //         ) {
    //             this.update(0);
    //             this.setClick();
    //         } else {
    //             return "nothing was found";
    //         }
    //     }
    // }

    Dropdown('.has-dropdown-list .select_btn');
    // let tabs = new ShadowTabs(".heading__tabs--triggers li", ".heading__tabs--bodyes ");
    // tabs.create();

    function Dropdown(targets) {
        let _targets = document.querySelectorAll(targets);
        _targets.forEach(btn => {
            btn.onclick = function () {
                let dropdown = this.parentElement.querySelector('.hidden'),
                    text = this.querySelector('.text'),
                    hidden_items = this.parentElement.querySelectorAll('.hidden .hidden_item'),
                    hidden_input = this.parentElement.querySelector('.hidden_input');

                dropdown.classList.toggle('show');
                hidden_items.forEach(item => {
                    item.onclick = function () {
                        let mask = this.innerHTML.trim(),
                            val = this.getAttribute('data-value').trim();
                        text.innerHTML = mask;
                        hidden_input.value = val;
                        dropdown.classList.remove('show');
                    };
                });
            };
        });
    }
    var swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next1",
            prevEl: ".swiper-button-prev1",
        },
    });
    var swiper2 = new Swiper(".mySwiper2", {
        navigation: {
            nextEl: ".swiper-button-next2",
            prevEl: ".swiper-button-prev2",
        },
    });
    var swiper3 = new Swiper(".mySwiper3", {
        navigation: {
            nextEl: ".swiper-button-next3",
            prevEl: ".swiper-button-prev3",
        },
    });

    var Sswiper = new Swiper(".mySwiper4", {
        spaceBetween: 4,
        pagination: {
            el: ".swiper-pagination4",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next4",
            prevEl: ".swiper-button-prev4",
          },
        breakpoints: {
            992: {
                slidesPerView: 3,
                grid: {
                    rows: 2,
                },
            },
            0: {
                slidesPerView: 3,
                grid: {
                    rows: 1,
                },
                direction: "vertical"
            },
        },
    });
    var swiper5 = new Swiper(".mySwiper5", {
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination5",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next5",
            prevEl: ".swiper-button-prev5",
          },
        breakpoints: {
            992: {
                slidesPerView: 3,
                grid: {
                    rows: 2,
                },
            },
            0: {
                slidesPerView: 3,
                grid: {
                    rows: 1,
                },
                direction: "vertical"
            },
        },
    });
    // var swiper = new Swiper(".cause__slider", {
    //     slidesPerView: 2,
    //     spaceBetween: 34,
    //     pagination: {
    //         el: ".swiper-pagination",
    //         clickable: true,
    //     },
    // });

    // //слайдер на наши услуги 
    // let swiperServ = new Swiper(".ourServices-card-swiper", {
    //     slidesPerView: 2,
    //     spaceBetween: 30,
    //     allowTouchMove: false,
    // });


    // //слайдер отзывов видео 
    // let swiperVideo = new Swiper(".reviews-video", {
    //     pagination: {
    //         el: ".swiper-pagination-revVideo",
    //     },
    // });

    // //слайдер отзывов вертикальный

    // let swiperRevAlign = new Swiper(".reviews-slider-align", {
    //     direction: "vertical",
    //     pagination: {
    //       el: ".reviews-slider-align-pag",
    //       clickable: true,
    //     },
    //   });



    // var swiperObj = new Swiper(".catalog__object-slider", {});
});
