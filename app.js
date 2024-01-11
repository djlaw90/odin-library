"use strict";

document.addEventListener("DOMContentLoaded", function() {
  return new Book();
});


const myLibrary = [];

class Book {
  constructor(title, author, numPages, language, published, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.language = language;
    this.published = published;
    this.haveRead = haveRead;

    //DOM elements
    this.cards = document.querySelector("#cards");
    this.form = document.querySelector("#modal-form");
    this.addButton = document.querySelector("#addBookToLibrarySubmit");

    //Event Listeners
    this.addButton.addEventListener("click", this.addBook.bind(this));
    this.setupSwitchToggleEventListeners();
    this.setupRemoveButtonEventListeners();
  }


  displayBooks() {
    this.cards.innerHTML = '';
  
    for(let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        const bookHTML = this.createBookHTML(book, i);
        this.cards.insertAdjacentHTML('beforeend', bookHTML);
    }
    this.setupSwitchToggleEventListeners();
    this.setupRemoveButtonEventListeners();
  }


  createBookHTML(book, position) {
    return `<div class="col">
              <div class="card" style="width: 18rem;" data-position=${position}>
                  <div class="card-body ${book.haveRead ? 'have-read-card-body' : ''}">
                    <h5 class="card-title book-title ${book.haveRead ? 'have-read-author' : ''}">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary book-author mb-3">${book.author}</h6>
                    <ul class="list-group">
                      <li class="list-group-item book-pages"><b>Number of pages:</b> ${book.numPages}</li>
                      <li class="list-group-item book-language"><b>Language:</b> ${book.language}</li>
                      <li class="list-group-item book-published"><b>Published:</b> ${book.published}</li>
                    </ul>
                    <div class="form-check form-switch mt-3">
                      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" ${book.haveRead ? 'checked' : ''}>
                      <label class="form-check-label" for="flexSwitchCheckChecked">${book.haveRead ? 'Read' : 'Not Read'}</label>
                      <a href="#" class="btn btn-danger remove-button">Remove book</a>
                    </div>
                  </div>
              </div>
          </div>`;
  }


  addBook() {
    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const numPages = document.querySelector("#book-pages").value;
    const language = document.querySelector("#book-language").value;
    const published = document.querySelector("#book-published").value;
    
    const haveReadRadio = document.querySelector('input[name="have-read"]:checked');
    const haveRead = haveReadRadio.value === "yes" ? true : false;

    // Create an object to store the collected data
    const newBookData = {
      title: title,
      author: author,
      numPages: numPages,
      language: language,
      published: published,
      haveRead: haveRead
    };
  

    myLibrary.push(newBookData);
    this.displayBooks()

    // Close the modal (if needed)
    const modal = document.querySelector("#addBookModal");
    if (modal) {
      $(modal).modal("hide"); // Close Bootstrap modal using jQuery
    }
    this.form.reset();
  }

  setupSwitchToggleEventListeners() {
    const toggleSwitches = document.querySelectorAll('.form-check-input');

    toggleSwitches.forEach(toggleSwitch => {
      toggleSwitch.addEventListener('change', () => {
        console.log("switch toggled")
        this.handleSwitchToggleChange(toggleSwitch);
      });
    });
  }

  handleSwitchToggleChange(toggleSwitch) {
    const card = toggleSwitch.closest('.card');
    const cardBody = card.querySelector('.card-body');
    const authorName = card.querySelector('.book-title');
    const readText = card.querySelector('.form-check-label');

    if (toggleSwitch.checked) {
      authorName.style.textDecoration = 'line-through';
      authorName.style.textDecorationColor = 'red';
      cardBody.style.opacity = '0.5';
      readText.textContent = 'Read';
    } else {
      authorName.style.textDecoration = 'none';
      cardBody.style.opacity = '1';
      readText.textContent = 'Not read';
    }
  }

  setupRemoveButtonEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-button');

    removeButtons.forEach(removeButton => {
      removeButton.addEventListener('click', () => {
        this.handleRemoveButtonClick(removeButton);
      });
    });
  }

  handleRemoveButtonClick(removeButton) {
    const card = removeButton.closest('.card');
    const cardCol = removeButton.parentNode.parentNode.parentNode.parentNode;
    if (cardCol) {
      const position = parseInt(card.getAttribute('data-position'), 10);
      cardCol.remove();
      myLibrary.splice(position, 1);

      // Update data-position attributes for remaining cards
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        card.setAttribute('data-position', index);
      });
    }
  }
}