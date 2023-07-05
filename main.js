let allPagesProject = document.getElementsByClassName('page_project');

if (allPagesProject.length !== 0) {
    for (var y = 0; y < allPagesProject.length; y++) {
        allPagesProject[y].setAttribute('data-number', y.toString());
        allPagesProject[y].style.zIndex = (500 - (y + 1)).toString();
    }
}
else {

    console.log('Страниц книги не найдено');

}

// Присвоим нулевой странице обработчик
allPagesProject[0].addEventListener('click', pageclick);

// Найдем кнопку влево и прикрепим листенер
let leftButton = document.getElementById('pressLeft');
leftButton.addEventListener('click', leftClick);

// Найдем кнопку вправо и прикрепим листенер
let rightButton = document.getElementById('pressRight');
rightButton.addEventListener('click', rightClick);


function leftClick() {

    var allPagesProject = document.getElementsByClassName('page_project');
    let target;

    if (allPagesProject.length !== 0) {
        for (var y = allPagesProject.length - 1; y > -1; y--) {

            if (allPagesProject[y].classList.contains('page-turned')) {
                target = allPagesProject[y];
                break;
            }

        }
    }

    if (typeof (target) != "undefined") performOperation(target, 'back');

}

function rightClick() {

    var allPagesProject = document.getElementsByClassName('page_project');
    let target;

    if (allPagesProject.length !== 0) {
        for (var y = 0; y < allPagesProject.length; y++) {

            if (allPagesProject[y].classList.contains('page-open')) {
                target = allPagesProject[y];
                break;
            }

        }
    }

    if (typeof (target) != "undefined") performOperation(target, 'forward');

}

function pageclick(e) {

    if (!e) e = window.event;
    var target = e.target || e.srcElement;

    while ((!target.classList.contains('page_project')) && (target.tagName != 'body')) {
        target = target.parentElement;
    }

    // Работаем дальше, только если в дереве DOM была найдена страница книги
    if (target.classList.contains('page_project')) expertSystem(target);

}

// Экспертная система при щелчке по странице в google chrome
function expertSystem(target) {

    let operation;

    if (target.classList.contains('page-open')) {

        operation = "forward";

    }
    else {

        operation = "back";

    }

    performOperation(target, operation);

}


function performOperation(target, operation) {

    // Определим номер страницы в списке
    let page_number = parseInt(target.getAttribute('data-number'));

    // Удалим классы анимации у страницы
    target.classList.remove("flip-right-to-left");
    target.classList.remove("flip-left-to-right");

    // Найдем объект книги, для последующего изменения
    let styleBook = document.getElementById('book');

    // Объявим объект для расстановки приоритетов визуализации
    let orderPages = {};
    // let orderPages;

    // Объявим массив страниц для присвоение обработки нажатия кнопки мыши
    let clickPages = [];

    switch (operation) {

        // Если пользователь идет вперед по книге
        case "forward":

            // ******** Выполним действия с размерами книги ********

            // Если это открытие первой страницы, увеличим размер книги
            if (target.classList.contains("page-first")) {

                styleBook.style.width = "1140px";

            }

            // Если это открытие последней страницы, уменьшим размер книги
            // и сдвинем ее расположение в центр
            if (target.classList.contains("page-last")) {

                styleBook.style.width = "570px";
                styleBook.style.left = "570px";

            }

            // ******** Выполним действия с выбранной страницей ********

            // Удалим класс открыто и применим класс перевернуто
            target.classList.remove("page-open");
            target.classList.add("page-turned");

            // Применим класс анимация переворота страницы
            target.classList.add("flip-right-to-left");

            // ******** Выполним действия с видимостью страниц и назначим обработку событий нажатия страницы ********

            // Если это открытие первой страницы, сделаем видимой ее и вторую страницу
            if (target.classList.contains("page-first")) {

                // orderPages = { [page_number] : 600, [page_number+1] : 599};

                orderPages[page_number] = 600;
                orderPages[page_number + 1] = 599;
                clickPages.push(page_number);
                clickPages.push(page_number + 1);

            }
            else {

                // Если это открытие последней страницы, сделаем видимой ее и предыдущую ей страницу
                if (target.classList.contains("page-last")) {

                    // orderPages = { [page_number] : 600, [page_number-1] : 599};
                    orderPages[page_number] = 600;
                    orderPages[page_number - 1] = 599;
                    clickPages.push(page_number);

                }
                // Если это открытие страниц в середине книжки
                else {

                    // orderPages = { [page_number-1] : 598, [page_number] : 600, [page_number+1] : 599};

                    orderPages[page_number - 1] = 598;
                    orderPages[page_number] = 600;
                    orderPages[page_number + 1] = 599;
                    clickPages.push(page_number);
                    clickPages.push(page_number + 1);

                }

            }

            break;

        // Если пользователь идет назад по книге
        case "back":

            // ******** Выполним действия с размерами книги ********

            // Если последняя страница книги была закрыта и книгу открывают, размер книги надо увеличить
            if (target.classList.contains("page-last")) {

                styleBook.style.width = "1140px";
                styleBook.style.left = "0px";

            }

            // Если первая страница книги была открыта и ее закрывают, размер книги надо уменьшить
            if (target.classList.contains("page-first")) {

                styleBook.style.width = "570px";

            }

            // ******** Выполним действия с выбранной страницей ********

            // Удалим класс открыто и применим класс перевернуто
            target.classList.remove("page-turned");
            target.classList.add("page-open");

            // Применим класс анимации переворота страницы
            target.classList.add("flip-left-to-right");

            // ******** Выполним действия с видимостью страниц ********

            // Если первая страница книги была открыта и ее закрывают
            if (target.classList.contains("page-first")) {

                // orderPages = {  [page_number] : 600, [page_number+1] : 599 };
                orderPages[page_number] = 600;
                orderPages[page_number + 1] = 599;
                clickPages.push(page_number);


            }
            else {

                // Если последняя страница книги была закрыта и ее открывают
                if (target.classList.contains("page-last")) {

                    // orderPages = { [page_number-1] : 599, [page_number] : 600 };
                    orderPages[page_number - 1] = 599;
                    orderPages[page_number] = 600;
                    clickPages.push(page_number);
                    clickPages.push(page_number - 1);


                }
                // Если это возврат к началу книги ( открывает страницы в обратном направлении)
                else {

                    // orderPages = { [page_number-1] : 599, [page_number] : 600, [page_number+1] : 598};
                    orderPages[page_number - 1] = 599;
                    orderPages[page_number] = 600;
                    orderPages[page_number + 1] = 598;
                    clickPages.push(page_number - 1);
                    clickPages.push(page_number);

                }

            }

            break;



        default:

            console.log('Не возможно выполнить неизвестную операцию');

            break;
    }

    setZIndexPages(orderPages);
    setListenerClick(clickPages);

}

function setZIndexPages(orderPages) {

    var allPagesProject = document.getElementsByClassName('page_project');

    if (allPagesProject.length !== 0) {
        for (var y = 0; y < allPagesProject.length; y++) {

            allPagesProject[y].style.zIndex = (500 - (y + 1)).toString();
            // allPagesProject[y].removeEventListener('click', pageclick, false);
        }

    }

    if (typeof (orderPages) != "undefined") {

        for (key in orderPages) {

            allPagesProject[key].style.zIndex = orderPages[key];

        }

    }
    else {
        console.log('Приоритет визаулизации страниц не получен');
    }

}

function setListenerClick(clickPages) {

    if ((typeof (clickPages) !== "undefined") || (clickPages !== [])) {

        var allPagesProject = document.getElementsByClassName('page_project');


        // Удалим все обработчики событий у страниц.
        // Присвоем новые если они нужны
        if (allPagesProject.length !== 0) {
            for (var y = 0; y < allPagesProject.length; y++) {

                // Если этой странице не требуется листенер, а у нее он был - удалим
                if (clickPages.indexOf(y) == -1) {

                    allPagesProject[y].removeEventListener('click', pageclick, false);

                }
                // Если этой странице требуется листенер, а у нее его не было - присвоим
                else {

                    allPagesProject[y].addEventListener('click', pageclick);

                }



            }

        }

    }
    else {
        console.log('Номера страниц для присвоения обработчика нажатия на страницу не получены');
    }

}