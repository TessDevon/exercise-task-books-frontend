
console.log(window.location.href);
showBook();
function showBook() {

    const queryString = window.location.search; // Hämtar parametersträngen för webbsidan. 

    const urlParams = new URLSearchParams(queryString); // Parsar så det blir objekt i JS istället fär sträng.

    const bookId = urlParams.get('bookid') // Uppslagning

    console.log(queryString);
    console.log(bookId);

    fetch("http://localhost:3000/books/" + bookId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    
    })

    .then(res => res.json())
    .then(book => {
        console.log(book);
    
        let bookOwnContainer = document.createElement("div");
        oneBook.appendChild(bookOwnContainer);

        let headerInfo = document.createElement("h2");
        headerInfo.innerText = "Bok information"
        bookOwnContainer.appendChild(headerInfo);

        let bookTitle = document.createElement("p"); 
        bookTitle.innerText ="Titel: " + book.title +" ";
        bookOwnContainer.appendChild(bookTitle);

        let bookAuthor = document.createElement("p"); 
        bookAuthor.innerText ="Författare: "+ book.author +" ";
        bookOwnContainer.appendChild(bookAuthor);

        let booknumberofPages = document.createElement("p"); 
        booknumberofPages.innerText ="Sidantal: " + book.numberOfPages +" ";
        bookOwnContainer.appendChild(booknumberofPages);  

        let loanStatus = document.createElement("p"); 
        if (book.lendingStatus == false) {
            loanStatus.innerText = "Ej utlånad      "
        } else {
            loanStatus.innerText = "Utlånad        "
        }

        bookOwnContainer.appendChild(loanStatus);
    });
}; 