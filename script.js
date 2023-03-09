
function booksToPrint () {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => {
        printBooks(data);
    });
};

booksToPrint();


/*---------------------------------------------------------------------------------------------------------------------------------------
------------------------------------ Main Site ------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------- */
// VARFÖR SYNS INTE H2ORNA!!!!!!!

function printBooks(books) {

    //root.innerText = ""

    const booksection = document.createElement("section");
        booksection.className = "books";
        booksection.id = "books";
        root.appendChild(booksection);

    const book_h2 = document.createElement("h2");
        book_h2.innerText = "Våra böcker";
        book_h2.className = "book_h2";
        book_h2.id = "book_h2";
        booksection.appendChild(book_h2);

    const book_container = document.createElement("article");
        book_container.class = "book_container";
        book_container.id = "book_container";
        booksection.appendChild(book_container);

    books.map(book => {
        const bookOwnContainer = document.createElement("div");
        book_container.appendChild(bookOwnContainer);

        const bookTitle = document.createElement("span"); 
        bookTitle.id = book.id;
        bookTitle.innerText ="Titel: " + book.title +"     ,       ";
        bookOwnContainer.appendChild(bookTitle);

        const bookAuthor = document.createElement("span"); 
        bookAuthor.id = book.id;
        bookAuthor.innerText ="Författare: "+ book.author +"     ,       ";
        bookOwnContainer.appendChild(bookAuthor);

        const booknumberofPages = document.createElement("span"); 
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

        const infoOneBookBtn = document.createElement("button");
        infoOneBookBtn.id = book.id
        infoOneBookBtn.innerHTML = "Mer info"

        bookOwnContainer.appendChild(infoOneBookBtn);

        infoOneBookBtn.addEventListener("click", (event) => {
            root.innerHTML="";
            showBook(event);

        });


        const loanBookBtn = document.createElement("button");
        loanBookBtn.id = book.id
        loanBookBtn.innerHTML = "Låna bok"

        bookOwnContainer.appendChild(loanBookBtn);

        loanBookBtn.addEventListener("click", loanBooks);

        
    });
    const libraryLoan = document.createElement("section");
    libraryLoan.className = "libraryLoan";
    libraryLoan.id = "libraryLoan";
    root.appendChild(libraryLoan);    
    
    const userLoan = document.createElement("h2");
    userLoan.innerHTML = "Mina lån";
    userLoan.className = "userLoan";
    userLoan.id = "userLoan";
    libraryLoan.appendChild(userLoan);

    const loanBookss = document.createElement("div");
    loanBookss.className = "loanBooks";
    loanBookss.id = "loanBooks";
    libraryLoan.appendChild(loanBookss);

    const addNewBookButtonSection = document.createElement("button");
    addNewBookButtonSection.innerHTML="Lägg till en bok"
    addNewBookButtonSection.id = "addNewBookButtonSection";
    addNewBookButtonSection.className = "addNewBookButtonSection";
    root.appendChild(addNewBookButtonSection);

    addNewBookButtonSection.addEventListener("click", () => {
        root.innerHTML="";
        buildNewBookPart();
    });
};




/*--------------------------------- Visa lånade böcker ------------------------------------------------------------------------ */

function loanBooks (event) {
    const bookId = event.target.id;
    const libraryLoan = document.getElementById("libraryLoan");
    console.log(bookId);

    fetch("http://localhost:3000/books/" + bookId, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body:JSON.stringify({lendingStatus: true})
    })
    .then(res => res.json())
    .then(book => {
        //printBooks(data);
        console.log(book);
 
    const bookOwnContainer = document.createElement("div");
        libraryLoan.appendChild(bookOwnContainer);

    const bookTitle = document.createElement("span"); 
        //bookTitle.id = book.id;
        bookTitle.innerText ="Titel: " + book.title;
        libraryLoan.appendChild(bookTitle);
    });
}; 


/*---------------------------------------------------------------------------------------------------------------------
----------------------------------- Visa info om en bok ---------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------*/

function showBook (event) {
    const bookId = event.target.id;
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
    
        const bookOwnContainer = document.createElement("div");
        bookOwnContainer.className = "book_container";
        root.appendChild(bookOwnContainer);

        const headerInfo = document.createElement("h2");
        headerInfo.innerText = "Bok information"
        bookOwnContainer.appendChild(headerInfo);

        const bookTitle = document.createElement("p"); 
        bookTitle.innerText ="Titel: " + book.title +" ";
        bookOwnContainer.appendChild(bookTitle);

        const bookAuthor = document.createElement("p"); 
        bookAuthor.innerText ="Författare: "+ book.author +" ";
        bookOwnContainer.appendChild(bookAuthor);

        const booknumberofPages = document.createElement("p"); 
        booknumberofPages.innerText ="Sidantal: " + book.numberOfPages +" ";
        bookOwnContainer.appendChild(booknumberofPages);  

        const loanStatus = document.createElement("p"); 
        if (book.lendingStatus == false) {
            loanStatus.innerText = "Ej utlånad      "
        } else {
            loanStatus.innerText = "Utlånad        "
        }

        const returnToHeadPageBtn = document.createElement("button");
        returnToHeadPageBtn.innerHTML = "Tillbaka till huvudsidan";
        bookOwnContainer.appendChild(returnToHeadPageBtn);

        returnToHeadPageBtn.addEventListener("click", () => {
            root.innerHTML="";
            booksToPrint();
              
        });

    });
}; 


/*------------------------------------------------------------------------------------------------------------------------------------
------------------- New Book Part ----------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------ */

//const addNewBookButtonSectionEvent = document.getElementById("addNewBookButtonSection");

function buildNewBookPart () {
    
    const addBookSection = document.createElement("section");
    addBookSection.classNane ="addBook";
    addBookSection.id = "addBook";
    root.appendChild(addBookSection); 

    const newBookForm = document.createElement("div");
    newBookForm.className = "newBook";
    newBookForm.id = "newBook";
    addBookSection.appendChild(newBookForm); 

    const libraryLoanH2 = document.createElement("h2");
    libraryLoanH2.innerText = "Lägg till en bok"
    libraryLoanH2.className = "libraryLoanH2";
    libraryLoanH2.id = "libraryLoanH2";
    newBookForm.appendChild(libraryLoanH2); 

    const inputNewTitle = document.createElement("INPUT");
    inputNewTitle.setAttribute("type", "text");
    inputNewTitle.placeholder = "Boktitel"
    inputNewTitle.className = "new_bookInput";
    inputNewTitle.id = "new_title";
    newBookForm.appendChild(inputNewTitle); 

    const inputNewAuthor = document.createElement("INPUT");
    inputNewAuthor.setAttribute("type", "text");
    inputNewAuthor.placeholder = "Författarens namn";
    inputNewAuthor.className = "new_bookInput";
    inputNewAuthor.id = "new_author";
    newBookForm.appendChild(inputNewAuthor); 

    const inputNumberOfPages = document.createElement("INPUT");
    inputNumberOfPages.setAttribute("type", "text");
    inputNumberOfPages.placeholder = "sidantal";
    inputNumberOfPages.className = "new_bookInput";
    inputNumberOfPages.id = "new_numberOfPages";
    newBookForm.appendChild(inputNumberOfPages); 

    /*const newBookStatusText = document.createElement("p");
    newBookForm.innerText = "Utlånad";
    newBookForm.appendChild(newBookStatusText);
    
    const inputLendingStatus = document.createElement("INPUT");
    inputLendingStatus.setAttribute("type","checkbox");
    inputLendingStatus.className = "new_lendingStatus";
    inputLendingStatus.id = "new_lendingStatus";
    newBookForm.appendChild(inputLendingStatus); */
    
    const addNewBookBtn = document.createElement("button");
    addNewBookBtn.innerText = "Lägg till";
    addNewBookBtn.className = "new_bookInput";
    addNewBookBtn.id = "new_bookBtn";
    newBookForm.appendChild(addNewBookBtn); 

    addNewBookBtn.addEventListener( "click", (event) => {
    whriteUpForm();
    root.innerHTML="";
    });

};

function whriteUpForm () {

    const new_title = document.getElementById("new_title");
    const new_author = document.getElementById("new_author");
    const new_numberOfPages = document.getElementById("new_numberOfPages");

    //logIn.reset();
    const book = {title:new_title.value, author:new_author.value, numberOfPages:new_numberOfPages.value, lendingStatus:false}
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
};


/**Saker som jag hade velat utveckla vidare i denna uppgift:
 * Lämna tillbaka boken och ändra statusen i backenden.
 * Gråa knappen om boken redan är utlånad. Tas bort när den lämnas tillbaka.
 * Krav på inputfälten.
 * Ta bort bok. 
*/