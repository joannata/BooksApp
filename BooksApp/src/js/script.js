{
    'use strict';
  
    const select = {
      templateOf: {
        bookTemplate: '#template-book',
      },
      containerOf: {
        bookList: '.books-list',
        images: '.book__image',
        filters: '.filters',
      },
    };

    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
    };

    function render(){
        for(let book of dataSource.books){
          /* generate HTML based on template */
          const generatedHTML = templates.bookTemplate(book);

          /* create element using utils.createElementFromHTML */
          const generatedDOM = utils.createDOMFromHTML(generatedHTML);

          /* find book container */
          const bookContainer = document.querySelector(select.containerOf.bookList);

          /* add book to menu[?] */
          bookContainer.appendChild(generatedDOM);
        }
    }

    const favoriteBooks = [];

    const filters = [];

    function initActions(){

        const booksList = document.querySelector(select.containerOf.bookList);
        console.log('booksList', booksList);

        booksList.addEventListener('dblclick', function(event){
            event.preventDefault();

            const image = event.target.offsetParent;
            const bookId = image.getAttribute('data-id');
            console.log('bookId', bookId);

            if(!favoriteBooks.includes(bookId)){
                image.classList.add('favorite');
                favoriteBooks.push(bookId);

            } else {
                const indexOfBook = favoriteBooks.indexOf(bookId);
                favoriteBooks.splice(indexOfBook, 1);
                image.classList.remove('favorite');
            }

            console.log('favoriteBooks', favoriteBooks);

        });

        const booksFilter = document.querySelector(select.containerOf.filters);
        console.log('booksFilter', booksFilter);

        booksFilter.addEventListener('click', function(callback){
            const clickedElement = callback.target;

            if(clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter'){
                console.log('clickedElement', clickedElement);

                if(clickedElement.checked){
                    filters.push(clickedElement.value);
                } else {
                    const indexOfValue = filters.indexOf(clickedElement.value);
                    filters.splice(indexOfValue);
                }
            }

            filterBooks();
        });

    }

    function filterBooks(){
        for(let book of dataSource.books){
            let shouldBeHidden;
            const filterOfHiddenBooks = document.querySelector('.book__image[data-id="book.id"]');

            for(const filter of filters){
                if(!book.details[filter]){
                    shouldBeHidden = true;
                    break;
                }
            }

            if(shouldBeHidden){
                filterOfHiddenBooks.classList.add('hidden');
            } else {
                filterOfHiddenBooks.classList.remove('hidden');
            }
            
        }
    }


    render();
    initActions();
}