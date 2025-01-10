console.log('TASK 1');

class Library {
    #books = [];

    get allBooks() {
        return this.#books;
    }
    
    hasBook(title) {
        return this.#books.indexOf(title) >= 0;
    }

    addBook(title) {
        if (!this.hasBook(title)) 
            this.#books.push(title);
        else
            throw new Error('Такая книга уже существует');
    }

    removeBook(title) {
        // Найти индекс книги
        const indToDelete = this.#books.indexOf(title);
        // Удалить в случае успеха
        if (indToDelete >= 0) 
            this.#books.splice(indToDelete, 1);
        else
            throw new Error('Такой книги не существует');
    }

    constructor(books) {
        if (new Set(books).size != books.length) {
            throw new Error('В списке книг есть дубликаты');
        }
        this.#books = books;
    }
}

const someBooks = ['Малыш', 'Обитаемый остров', 'Трудно быть богом', 'Лезвие бритвы', 'Задача 3 тел'];

const someDublicateBooks = ['Малыш', 'Обитаемый остров', 'Трудно быть богом', 'Малыш', 'Лезвие бритвы', 'Задача 3 тел'];

try {

    const library = new Library(someBooks);
    // const doubleLibrary = new Library(someDublicateBooks); // Исключение
    console.log(library.allBooks);

    const someBook = '30000 лье под водой';

    console.log(`Наличие книги ${someBook} в библиотеке ${library.hasBook(someBook)}`);
    library.addBook(someBook);
    console.log(library.allBooks);
    console.log(`Наличие книги ${someBook} в библиотеке ${library.hasBook(someBook)}`);
    // library.addBook(someBook); // Исключение
    console.log(library.allBooks);

    library.removeBook(someBook);
    console.log(`Наличие книги ${someBook} в библиотеке ${library.hasBook(someBook)}`);
    // library.removeBook(someBook); // Исключение

} catch (error) {
    console.log(error.message);
}

console.log('TASK 2');

function showReviews(rootEl) {
    // СОЗДАЕМ SELECT
    const selectProdEl = document.createElement('select');
    rootEl.append(selectProdEl);
    const options = [];

    // НАЧАЛЬНО ЗАПОЛНЯЕМ ОТЗЫВЫ
    initialData.forEach(element => {
        const prodUlElement = document.createElement('ul');
        prodUlElement.textContent = element.product;
        options.push(element.product);
        rootEl.append(prodUlElement);
        element.reviews.forEach(review => {
            const commentLi = document.createElement('li');
            commentLi.textContent = review.text;
            prodUlElement.append(commentLi);
        });
    });

    // ЗАПОЛНЯЕМ SELECT
    options.forEach(option => {
        const newOption = document.createElement('option');
        newOption.textContent = option;
        newOption.setAttribute('value', option);
        selectProdEl.append(newOption);
    });
}

function addReview(rootEl, comment) {
    // НАХОДИМ ЭЛЕМЕНТ SELECT В КОТОРОМ ВЫБИРАЕМ ДЛЯ КАКОГО ПРОДУКТА БУДУТ КОММЕНТАРИИ
    const selectEl = rootEl.querySelector('select');

    // НАХОДИМ ВСЕ СПИСКИ С КОММЕНТАРИЯМИ ДЛЯ ПРОДУКТОВ
    const ulElements = rootEl.querySelectorAll('ul');

    // СПИСОК В КОТОРЫЙ НЕОБХОДИМО ВСТАВЛЯТЬ КОММЕНТАРИИ
    let ulForComment;
    for (const ulElement of ulElements) {
        if (ulElement.firstChild.textContent === selectEl.value) {
            ulForComment = ulElement;
            break;
        }
    }
    // ВСТАВЛЯЕМ КОММЕНТАРИЙ В НУЖНЫЙ СПИСОК
    if (ulForComment) {
        if (comment.length < 50 || comment.length > 500) 
            throw new Error('Недопустимая длина сообщения...');
        const newCommentEl = document.createElement('li');
        newCommentEl.textContent = comment;
        ulForComment.append(newCommentEl);
    }
}

const inpComment = document.querySelector('#comment');
const commentBtn = document.querySelector('.comment-btn');
const contentDiv = document.querySelector('.content');

window.addEventListener('load', function (e) {
    showReviews(contentDiv);
});

commentBtn.addEventListener('click', function (e) {
    try {
        addReview(contentDiv, inpComment.value);
    } catch (error) {
        console.log(error.message);
    }
});