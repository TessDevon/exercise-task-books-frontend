let new_bookBtn = document.getElementById("new_bookBtn");

let new_title = document.getElementById("new_title");
let new_author = document.getElementById("new_author");
let new_numberOfPages = document.getElementById("new_numberOfPages");
let new_lendingStatus = document.getElementById("new_lendingStatus");

let bookList = document.getElementById("bookList");
let loanBookscontainer = document.getElementById("loanBooks");
let book_container = document.getElementById("book_container");
let oneBook = document.getElementById("oneBook");

fetch("http://localhost:3000/books")
.then(res => res.json())
.then(data => {
    printBooks(data);
});

function printBooks(books) {
    books.map(book => {
        let bookOwnContainer = document.createElement("div");
        book_container.appendChild(bookOwnContainer);

        let bookTitle = document.createElement("span"); 
        bookTitle.id = book.id;
        bookTitle.innerText ="Titel: " + book.title +"     ,       ";
        bookOwnContainer.appendChild(bookTitle);

        let bookAuthor = document.createElement("span"); 
        bookAuthor.id = book.id;
        bookAuthor.innerText ="Författare: "+ book.author +"     ,       ";
        bookOwnContainer.appendChild(bookAuthor);

        let booknumberofPages = document.createElement("span"); 
        booknumberofPages.id = book.id;
        booknumberofPages.innerText ="Sidantal: " + book.numberOfPages +"     ,       ";
        bookOwnContainer.appendChild(booknumberofPages);  

        let loanStatus = document.createElement("span"); 
        loanStatus.id = book.id;
        if (book.lendingStatus == false) {
            loanStatus.innerText = "Ej utlånad      "
        } else {
            loanStatus.innerText = "Utlånad        "
        }

        bookOwnContainer.appendChild(loanStatus);

        let infoOneBookBtn = document.createElement("button");
        infoOneBookBtn.id = book.id
        infoOneBookBtn.innerHTML = "Mer info"

        bookOwnContainer.appendChild(infoOneBookBtn);

        infoOneBookBtn.addEventListener("click", showBook);


        let loanBookBtn = document.createElement("button");
        loanBookBtn.id = book.id
        loanBookBtn.innerHTML = "Låna bok"

        bookOwnContainer.appendChild(loanBookBtn);

        loanBookBtn.addEventListener("click", loanBooks);
    });
};

new_bookBtn.addEventListener( "click", (event) => {
    event.preventDefault();
    //logIn.reset();
    let book = {title:new_title.value, author:new_author.value, numberOfPages:new_numberOfPages.value, lendingStatus:new_lendingStatus.checked}
console.log(book);

    fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body:JSON.stringify(book)
    })
    .then(res => res.json())
    .then(data => {
        printBooks(data);
        console.log(data);
    });
});
    
function loanBooks (event) {
    let bookId = event.target.id;
    console.log(bookId);

    fetch("http://localhost:3000/books/" + bookId, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    }
    //body:JSON.stringify(book)
    })
    .then(res => res.json())
    .then(book => {
        //printBooks(data);
        console.log(book);
    
    let bookOwnContainer = document.createElement("div");
        loanBookscontainer.appendChild(bookOwnContainer);

    let bookTitle = document.createElement("span"); 
        //bookTitle.id = book.id;
        bookTitle.innerText ="Titel: " + book.title;
        bookOwnContainer.appendChild(bookTitle);
    });
}; 

function showBook (event) {
    let bookId = event.target.id;
    console.log(bookId);

    window.location="infoBook.html?bookid="+bookId;
}