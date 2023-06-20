CREATE DATABASE neighborhoodLib_db;
USE neighborhoodLib_db;
CREATE TABLE participants (
	person_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
    phone_num VARCHAR(255),
    user_pass VARCHAR(255),
    user_status VARCHAR(255)
    );
    
CREATE TABLE Books (
	book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    Genre VARCHAR(255),
    book_synopsis VARCHAR(255),
    part_of_series VARCHAR(255),
    book_status VARCHAR(255),
    book_owner INT, 
    FOREIGN KEY (book_owner) REFERENCES participants (person_id)
        );

CREATE TABLE booksOut (
	ref_num INT AUTO_INCREMENT PRIMARY KEY,
    borrow_person_id INT,
    FOREIGN KEY (borrow_person_id) REFERENCES participants (person_id),
    book_lent INT,
    FOREIGN KEY (book_lent) REFERENCES Books (book_id),
    borrow_date VARCHAR(255),
    estimated_due VARCHAR(255),
    request_state VARCHAR(255)
    );