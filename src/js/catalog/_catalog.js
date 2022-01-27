import instance from "../instance/api";

const container = document.querySelector(".object__list");
const loader = ` <div class="load-wrap d-none">
                    <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>`;

container.innerHTML += loader;

getCatalog();

function getCatalog() {
    container.querySelector(".load-wrap").classList.remove("d-none");
    container.querySelector(".load-wrap").classList.add("active");
    //Получаем все объекты
    instance
        .get("")
        .then(({data}) => {
            const xml = data;
            //Парсим XML
            const xmlDocument = new DOMParser().parseFromString(xml, "text/xml");

            for (const node of xmlDocument.querySelectorAll("object")) {
                const obj = `<div class="col-xl-4" data-rooms="${
                    node.querySelector("FlatRoomsCount").textContent
                }" data-floors="${node.querySelector("FloorsCount").textContent}" data-price="${
                    node.querySelector("Price").textContent
                }" data-area="${
                    node.querySelector("TotalArea").textContent
                }">
                    <div class="catalog__object">
                        <div class="catalog__object-image">
                            <div class="swiper catalog__object-slider">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <img src="${
                    node.querySelector("FullUrl")
                        .textContent
                }" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="catalog__object-type">
                            <span class="category">${
                    node.querySelector("Category").textContent
                }</span>
                            <span class="area">151 079 руб/м&sup2;</span>
                        </div>
                        <div class="catalog__object-room">
                            <span class="room">${
                    node.querySelector("FlatRoomsCount").textContent
                }-к квартира, ${
                    node.querySelector("TotalArea").textContent
                } м²</span>
                            <span class="price"><span>${
                    node.querySelector("Price").textContent
                }</span> руб.</span>
                        </div>
                        <div class="catalog__object-geo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11.67" height="16.67"
                                 viewBox="0 0 24 34"
                                 fill="none">
                                <path d="M12.0002 0.333332C5.55016 0.333332 0.333496 5.55 0.333496 12C0.333496 20.75 12.0002 33.6667 12.0002 33.6667C12.0002 33.6667 23.6668 20.75 23.6668 12C23.6668 5.55 18.4502 0.333332 12.0002 0.333332ZM12.0002 16.1667C9.70016 16.1667 7.8335 14.3 7.8335 12C7.8335 9.7 9.70016 7.83333 12.0002 7.83333C14.3002 7.83333 16.1668 9.7 16.1668 12C16.1668 14.3 14.3002 16.1667 12.0002 16.1667Z"
                                      fill="#FF7246"/>
                            </svg>
                            <span>${
                    node.querySelector("Address").textContent
                }</span>
                        </div>
                    </div>
                </div>`;
                container.querySelector(".load-wrap").classList.add("d-none");
                //рисуем все объекты
                container.innerHTML += obj;
                strReplace();
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

//Разбиваем стоимость на разряды
function strReplace() {
    let num = container.querySelectorAll(".price span");
    num.forEach((item) => {
        let str = "" + item.textContent;
        let result = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        item.textContent = result;
    });
}

//ФИЛЬТР КОСТЫЛЬ ЕБЕЙШИЙ

setTimeout(() => {
    const filterBox = container.querySelectorAll(".col-xl-4");
    const Filter = () => {

        //Местный Store
        const data = {
            rooms: null,
            floors: null,
            price: null,
            //area: null
        };

        FilterByRoom();
        FilterByFloor();
        //FilterByArea();

        function FilterByRoom() {
            document
                .querySelector(".catalog__filter--room ul")
                .addEventListener("click", (e) => {

//Проверка, чтобы чел не мимо кликнул
                    if (e.target.tagName !== "LI") return false;

                    let filterClass = e.target.dataset["f"];
                    data.rooms = filterClass;

                    filterBox.forEach((elem) => {
                        elem.classList.remove("hide");

//Флаги для комнат

                        let checkDataRooms = false;
                        if (data.rooms === null) {
                            checkDataRooms = false;
                        } else if (elem.dataset.rooms != data.rooms) {
                            checkDataRooms = true;
                        }
//Флаги для цены
                        let checkPrice = false;
                        if (data.price === null) {
                            checkPrice = false;
                        } else if (elem.dataset.price.search(data.price) == -1) {
                            checkPrice = true;
                        }
//Флаги для этажей
                        let checkDataFloors = false;
                        if (data.floors === null) {
                            checkDataFloors = false;
                        } else if (elem.dataset.floors != data.floors) {
                            checkDataFloors = true;
                        }
                        if (checkDataRooms || checkDataFloors || checkPrice) {
                            elem.classList.add("hide");
                        }
                    });
                });
        }

        function FilterByFloor() {
            document.querySelector(".for_floor").addEventListener("click", e => {
                //Проверка, чтобы чел не кликнул мимо
                if (e.target.tagName !== "DIV") return false;

                let filterClass = document.querySelector("input[name='for_floor']").value;
                data.floors = filterClass;

                filterBox.forEach((elem) => {
                    elem.classList.remove("hide");
//Флаги для комнат
                    let checkDataRooms = false;
                    if (data.rooms === null) {
                        checkDataRooms = false;
                    } else if (elem.dataset.rooms != data.rooms) {
                        checkDataRooms = true;
                    }
//Флаги для цены
                    let checkPrice = false;
                    if (data.price === null) {
                        checkPrice = false;
                    } else if (elem.dataset.price.search(data.price) == -1) {
                        checkPrice = true;
                    }
//Флаги для этажей
                    let checkDataFloors = false;
                    if (data.floors === null) {
                        checkDataFloors = false;
                    } else if (elem.dataset.floors != data.floors) {
                        checkDataFloors = true;
                    }
                    if (checkDataRooms || checkDataFloors || checkPrice) {
                        elem.classList.add("hide");
                    }
                });
            });
        }

//         function FilterByArea() {
//             document.querySelector(".for_area").addEventListener("click", e => {
//                 //Проверка, чтобы чел не кликнул мимо
//                 if (e.target.tagName !== "DIV") return false;
//
//                 let filterClass = document.querySelector("input[name='for_area']").value;
//                 data.area = filterClass;
//                 console.log(data.area);
//                 console.log(data.area >= 0 && data.area <= 30);
//                     filterBox.forEach((elem) => {
//                         elem.classList.remove("hide");
// //Флаги для комнат
//                         let checkDataRooms = false;
//                         if (data.rooms === null) {
//                             checkDataRooms = false;
//                         } else if (elem.dataset.rooms != data.rooms) {
//                             checkDataRooms = true;
//                         }
// //Флаги для цены
//                         let checkPrice = false;
//                         if (data.price === null) {
//                             checkPrice = false;
//                         } else if (elem.dataset.price.search(data.price) == -1) {
//                             checkPrice = true;
//                         }
// //Флаги для этажей
//                         let checkDataFloors = false;
//                         if (data.floors === null) {
//                             checkDataFloors = false;
//                         } else if (elem.dataset.floors != data.floors) {
//                             checkDataFloors = true;
//                         }
//                         //Флаги для площади
//                         let checkDataArea = false;
//                         if (data.area === null) {
//                             checkDataArea = false;
//                         } else if (elem.dataset.area != data.area) {
//                             checkDataArea = true;
//                         }
//                         if (elem.dataset.area > data.area && elem.dataset.area <= 30) {
//                             elem.classList.add("hide");
//                         }
//                     });
//             });
//         }

        document.querySelector("#price").oninput = function () {
            let val = this.value.trim();
            let priceItems = container.querySelectorAll(".col-xl-4");

            data.price = val;

            if (val != '') {
                priceItems.forEach(function (elem) {
//Флаги для комнат
                    let checkDataRooms = false;
                    if (data.rooms === null) {
                        checkDataRooms = false;
                    } else if (elem.dataset.rooms != data.rooms) {
                        checkDataRooms = true;
                    }
//Флаги для цены
                    let checkPrice = false;
                    if (data.price === null) {
                        checkPrice = false;
                    } else if (elem.dataset.price.search(data.price) == -1) {
                        checkPrice = true;
                    }
//Флаги для этажей
                    let checkDataFloors = false;
                    if (data.floors === null) {
                        checkDataFloors = false;
                    } else if (elem.dataset.floors != data.floors) {
                        checkDataFloors = true;
                    }

                    if (checkDataRooms || checkDataFloors || checkPrice) {
                        elem.classList.add('hide');
                    } else {
                        elem.classList.remove('hide');
                    }
                });
            } else {
                priceItems.forEach(function (elem) {
                        let checkDataRoomsAndFloors = false;
                        if (data.rooms === null || data.floors === null) {
                            checkDataRoomsAndFloors = false;
                        } else if (elem.dataset.rooms == data.rooms && elem.dataset.floors == data.floors) {
                            checkDataRoomsAndFloors = true;
                        }
                        if (checkDataRoomsAndFloors) {
                            elem.classList.remove('hide');
                        }
                    }
                );
            }
        };
    };

    Filter();

}, 1500);

// function FilterByRoom(triggers, objects) {
//     const _triggers = document.querySelectorAll(triggers);
//     let _objects = document.querySelectorAll(objects);

//     _triggers.forEach(trigger => {
//         trigger.addEventListener('click', () => {
//             Clear();
//             container.innerHTML += loader;
//             getCatalog();
//             if (trigger.textContent === '1к') {
//                 _objects.forEach(item => {
//                     if (item.dataset.rooms != 1) {
//                         item.remove();
//                     }
//                 });
//             }
//             if (trigger.textContent === '2к') {
//                 _objects.forEach(item => {
//                     if (item.dataset.rooms != 2) {
//                         item.remove();
//                     }
//                 });
//             }
//         });
//     });
// }

// const Clear = () => {
//     while (container.firstChild) {
//         container.removeChild(container.lastChild);
//     }
// };

// setTimeout(() => {
//     FilterByRoom(".catalog__filter--room li", ".object__list .col-xl-4");
// }, 1500);
