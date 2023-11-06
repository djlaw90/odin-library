"use strict";


const myLibrary = [];

function Book(title, author, numPages, language, published, read) {
  // the constructor...
  this.title = title
  this.author = author
  this.numPages = numPages
  this.language = language
  this.published = published
  this.read = read
}

function addBookToLibrary() {
  // do stuff here
}

//Modal
document.addEventListener("DOMContentLoaded", function () {
  
  const addButton = document.querySelector("#addBookToLibrarySubmit");

  addButton.addEventListener("click", function () {
    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const pages = document.querySelector("#book-pages").value;
    const language = document.querySelector("#book-language").value;
    const published = document.querySelector("#book-published").value;

    
    const haveReadRadio = document.querySelector('input[name="exampleRadios"]:checked');
    const haveRead = haveReadRadio === "yes" ? true : false;

    // Create an object to store the collected data
    const book = {
      title,
      author,
      pages,
      language,
      published,
      haveRead,
    };

    // You can now use the "book" object to process or store the data as needed, e.g., add it to your library, send it to a server, or display it.

    // For example, log the book data to the console
    console.log(book);

    // Close the modal (if needed)
    const modal = document.querySelector("#addBookModal");
    if (modal) {
      $(modal).modal("hide"); // Close Bootstrap modal using jQuery
    }
  });
});



//Handles switch toggles
const toggleSwitches = document.querySelectorAll('.form-check-input');

toggleSwitches.forEach(toggleSwitch => {
  toggleSwitch.addEventListener('change', function() {
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
  });
});

//Handles removing cards
const removeButtons = document.querySelectorAll('.remove-button');

removeButtons.forEach(removeButton => {
  removeButton.addEventListener('click', function() {
    const card = removeButton.closest('.card');
    if (card) {
      card.remove();
    }
  });
});