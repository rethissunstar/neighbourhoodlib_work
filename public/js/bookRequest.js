const borrowButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const info = event.target.getAttribute('data-id').split("-");;
      const due_date = document.querySelector('#due-date').value.trim();
  
      const response = await fetch(`/api/books/createRquest`, {
        method: 'POST',
        body: JSON.stringify({ book_id: info[0], user_id: info[1], due_date:due_date }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert('You have reserved this book');
        document.location.replace('/books');
      } else {
        alert('Failed to create project');
      }
  
    }
  };
  

  document
    .querySelector('.book-content')
    .addEventListener('click', borrowButtonHandler);
  
  