class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  // Function displayBooks.
  displayBooks = (title = this.title, author = this.author, id = this.id) => {
    // Create A New Book.
    const newBook = document.createElement('div');
    newBook.id = id;
    newBook.className = 'book-wrapper';
    newBook.innerHTML = `
        <div class="book-info">
          <p>"${title}" </p>
          <p>by ${author}</p>
        </div>
        <button class="remove-btn ${id}">Remove</button>
      `;
    const booksList = document.querySelector('#book-list');
    booksList.appendChild(newBook);

    // Call removeBook Function To Remove Deleted Books From Display.
    this.removeBook();
  };

  // Delete Selected Book.
  removeBook = () => {
    const removeBtn = document.querySelectorAll('.remove-btn');
    removeBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        const booksList = document.querySelectorAll('#book-list div');
        booksList.forEach((theBook) => {
          // Remove Selected Book From Display.
          if (theBook.id === btn.classList[1]) {
            theBook.remove();
          }

          // Remove Books From Local Storage And Store Remaining Using Filter.
          const books = JSON.parse(localStorage.getItem('books'));
          localStorage.removeItem('books');
          const remainingBooks = books.filter((theBook) => {
            if (theBook.id !== JSON.parse(btn.classList[1])) {
              return true;
            }
            return false;
          });
          if (remainingBooks.length > 0) {
            localStorage.setItem('books', JSON.stringify(remainingBooks));
          }
        });
      });
    });
  };
}

export default Book;
