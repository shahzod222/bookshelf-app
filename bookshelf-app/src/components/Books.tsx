import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {
  useGetAllBooksMutation,
  useSearchBookMutation,
} from "../redux/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IBook, ISavedBook } from "../types";
import BookCard from "./BookCard";
import SavedBookCard from "./SavedBookCard";
import { logoutUser } from "../redux/userSlice";
import SavedBookInSearch from "./SavedBookInSearch";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchedBooks, setSearchedBooks] = useState<IBook[]>([]);
  const [savedBooks, setSavedBooks] = useState<ISavedBook[]>([]);
  const [noBooks, setNoBooks] = useState("");
  const [searchBook, { isLoading: searchLoading }] = useSearchBookMutation();
  const [getAllBooks, { isLoading: allBooksLoading }] =
    useGetAllBooksMutation();

  const key = useSelector((state: RootState) => state.user.key);
  const secret = useSelector((state: RootState) => state.user.secret);

  const clearData = () => {
    setNoBooks("");
    setSavedBooks([]);
    setSearchedBooks([]);
  };

  const searchData = async () => {
    const searchData = await searchBook({
      search: search,
      headers: { key: key, secret: secret },
    }).unwrap();

    const allBooksData = await getAllBooks({
      headers: { key: key, secret: secret },
    }).unwrap();

    setSavedBooks(allBooksData.data);
    setSearchedBooks(searchData.data);
    if (searchData.data.length === 0) setNoBooks("There are no books");
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    clearData();
    searchData();
  };

  const handleAllBooks = async () => {
    clearData();
    const allBooksData = await getAllBooks({
      headers: { key: key, secret: secret },
    }).unwrap();
    setSavedBooks(allBooksData.data);
    if (allBooksData.data.length === 0) setNoBooks("There are no books");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isLoading = searchLoading || allBooksLoading;

  return (
    <div className="cards-container">
      <div className="bar">
        <form className="search" onSubmit={handleSearch}>
          <TextField
            id="standard-basic"
            label="Search Book"
            variant="standard"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "70%" }}
          />
          <Button variant="outlined" type="submit" disabled={isLoading}>
            Search
          </Button>
          <Button
            variant="contained"
            onClick={handleAllBooks}
            disabled={isLoading}
          >
            My Books
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </form>
      </div>
      {isLoading && <CircularProgress className="loader" />}
      <div className="cards-container">
        <div className="cards">
          {!isLoading &&
            searchedBooks &&
            searchedBooks.map((book: IBook) => {
              if (savedBooks) {
                const isBookSaved = savedBooks.some(
                  (el) => el.book.isbn === book.isbn
                );
                if (isBookSaved) {
                  return (
                    <SavedBookInSearch
                      key={book.isbn}
                      data={
                        savedBooks.find((el) => el.book.isbn === book.isbn)!
                      }
                      searchData={searchData}
                    />
                  );
                } else {
                  return (
                    <BookCard
                      book={book}
                      key={book.isbn}
                      searchData={searchData}
                    />
                  );
                }
              } else {
                return (
                  <BookCard
                    book={book}
                    key={book.isbn}
                    searchData={searchData}
                  />
                );
              }
            })}
          {!isLoading &&
            savedBooks &&
            savedBooks.map((book: ISavedBook) => (
              <SavedBookCard
                key={book.book.isbn}
                data={book}
                handleAllBooks={handleAllBooks}
              />
            ))}
          {noBooks && (
            <Typography
              sx={{ width: "100%", margin: "0.5em" }}
              variant="h5"
              textAlign="center"
            >
              {noBooks}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
