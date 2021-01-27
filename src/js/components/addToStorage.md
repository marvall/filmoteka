Документація до файлу addToStorage.js та викорислання фунцій в ньому

// Імпорт неохідних функцій у робочий файл

        import {
        addToStorage,
        addDisabledOnBtn,
        saveQueryOnStorage,
        } from './шлях/до/файлу/функцій/addToStorage';


//0.  Необхідні атрибути на кнопках 'add to watched' і 'add to queue'.

        <button
            data-index="id фільму"
            data-type="watched" або data-type="queue"
            type = "button" > add to {watched / queue} 
        </button >

// 1. Зробити посилання на спільний контейнер
// для кнопок додавання до localStorage

        const btnContainer = document.querySelector('#btn-container');


// 2. Потрібно повісити прослуховування подій на цей контейнер.

        btnContainer.addEventListener('click', addToStorage);


// 3. В кінці коду оголосити виклик функції addDisabledOnBtn і передати ій
// контейнер для кнопок. Це потрібно для початкового присвоєння 'disabled'
// (при перешому завантаження сторінки) кнопкам фільмів,
// які вже є в одному із масивів watched або queue відповідно.

        addDisabledOnBtn(btnContainer);



// Запис пошукового запису в localStorage

// 1. Посилання на форму яка включая в себе наш <input type="text">


        const form = document.querySelector('form');
    

// 2. Потрібно повісити прослуховування подій на цей форму.


            form.addEventListener('submit', saveQueryOnStorage);
 
