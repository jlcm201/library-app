import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NotFound } from "./views/NotFound";
import { Home } from "./views/Home";
import TopNav from "./components/TopNav";
import { AddBook } from "./views/AddBook";
import { DeleteBook } from "./views/DeleteBook";
import { LibraryLoan } from "./views/LibraryLoan";
import { ReturnBook } from "./views/ReturnBook";
import { Divider } from "@mui/material";

const LibraryApp = () => {
  return (
    <>
      <Router>
        <div>
          <TopNav />
          <Divider sx={{ mb: 4 }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddBook" element={<AddBook />} />
            <Route path="/DeleteBook" element={<DeleteBook />} />
            <Route path="/LibraryLoan" element={<LibraryLoan />} />
            <Route path="/ReturnBook" element={<ReturnBook />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>

  );
}

export default LibraryApp;
