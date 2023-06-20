const addBookFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-addBook').value.trim();
    const author = document.querySelector('#author-addBook').value.trim();
    const genre = document.querySelector('#genre-addBook').value.trim();
    const series = document.querySelector('#series-addBook').value.trim() === '' ? 'N/A' : document.querySelector('#series-addBook').value.trim();
    const synopsis = document.querySelector('#synopsis-addBook').value.trim();



    const response = await fetch('/api/books/addBook', {
        method: 'POST',
        body: JSON.stringify({ title: title, author: author, genre: genre, series: series, synopsis: synopsis }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert('Book Added');
        document.location.replace('/books');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('.addBook-form')
    .addEventListener('submit', addBookFormHandler);
