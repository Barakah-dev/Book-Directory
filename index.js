const express = require("express");
const path = require("path");
const app  = express();
const PORT = process.env.PORT || 2000;

// View Engine Setup
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'view'));

// App configuration
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

const books = [{
  bookName: "The Henna Artist",
  bookAuthor: "Alka Joshi",
  bookPages: 368,
  bookPrice: 10,
  bookState: "Available"
},
{
  bookName: "The Da Vinci Code",
  bookAuthor: "Dan Brown",
  bookPages: 597,
  bookPrice: 16,
  bookState: "Available"
}];
// Create book
app.post("/create", (req, res) => {
  const bookName = req.body.bookName;
  const bookAuthor = req.body.bookAuthor;
  const bookPages = req.body.bookPages;
  const bookPrice = req.body.bookPrice;
  const bookState = req.body.bookState;

  books.push({
    bookName: bookName,
    bookAuthor: bookAuthor,
    bookPages: bookPages,
    bookPrice: bookPrice,
    bookState: "Available"
  })
  res.render("index", {data: books});
})

app.post("/issue", (req, res) => {
  const bookRequested = req.body.bookName;
  books.forEach(book => {
    if (book.bookName == bookRequested) {
      book.bookState = "Issued";
    }
  });
  res.render("index", {data: books});
})

app.post("/return", (req, res) => {
  const bookRequested = req.body.bookName;
  books.forEach(book => {
    if (book.bookName == bookRequested) {
      book.bookState = "Available";
    }
  });
  res.render("index", {data: books});
});

// Edit book
// app.put("/edit", (req, res) => {
//   const bookToEdit = req.body.bookName;
//   const editBookName = req.body.editBookName;
//   const editBookAuthor = req.body.editBookAuthor;
//   const editBookPages = req.body.editBookPages;
//   const editBookPrice = req.body.editBookPrice;

//   const index = books.findIndex(book => book.bookName === bookToEdit)
//   if (index !== -1) {
//     if (editBookName) books[index].bookName = editBookName;
//     if (editBookAuthor) books[index].bookAuthor = editBookAuthor;
//     if (editBookPages) books[index].bookPages = editBookPages;
//     if (editBookPrice) books[index].bookPrice = editBookPrice;
//     res.render("index", {data: books})
//   } else {
//     res.status(404).send("Book not found");
//   }
  
// })

// Delete book
app.post("/delete", (req, res) => {
  const bookToDelete = req.body.bookName;
  const index = books.findIndex(book => book.bookName === bookToDelete);
  
  if (index !== -1) {
    books.splice(index, 1)
  } else {
    return;
  }
  res.render("index", {data: books});
})

// List all books
const server = app.get("/", (req, res) => {
  res.render("index", {data: books})
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});