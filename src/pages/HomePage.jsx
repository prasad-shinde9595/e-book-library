import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Book from "../components/BookComponent/BookComponent";
import Search from "../components/SearchComponent/SearchComponent";
import Loader from "../components/Loader/Loader";

export default function HomePage() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchQuery = (e) => {
    setPageCount(1);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [pageCount]);

  const fetchData = () => {
    setLoading(true);
    var q = query ? query : "programming";
    fetch(
      "https://openlibrary.org/search.json?q=" +
        q +
        "&limit=10&page=" +
        pageCount
    )
      .then((res) => res.json())
      .then((data) => {
        data.numFound ? setData(data) : setData(null);
        setLoading(false);
      });
  };

  const prevClick = () => {
    setPageCount((prev) => prev - 1);
  };

  const nextClick = () => {
    setPageCount((prev) => prev + 1);
  };

  return (
    <div className="main">
      <Search
        placeholder="Search by name or author"
        value={query}
        setValue={setQuery}
        searchClick={searchQuery}
        focus={true}
      />
      <div>
        <h4 style={{ marginBottom: 15, textAlign: "center" }}>
          Top trending subjects
        </h4>
        <div className="trending-subjects">
          <Link to="/subject/design">Design</Link>
          <Link to="/subject/programming">Programming</Link>
          <Link to="/subject/finance">Finance</Link>
          <Link to="/subject/exercise">Exercise</Link>
          <Link to="/subject/management">Management</Link>
        </div>
      </div>
      <div className="books-container">
        {/* {!data && (
          <div style={{ textAlign: "center" }}>
            <p> No records found</p>
            <h4> Please search something </h4>
          </div>
        )} */}
        {data &&
          data.docs.map((d, i) => {
            return (
              <Book
                key={i}
                title={d.title}
                author={d.author_name && d.author_name.map((d) => `${d}, `)}
                coverId={d.cover_i}
              />
            );
          })}
      </div>
      {data && (
        <div className="btn-box">
          <button
            type="button"
            className="btn"
            onClick={prevClick}
            disabled={pageCount <= 1}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn"
            onClick={nextClick}
            disabled={pageCount >= data.numFound / 10}
          >
            Next
          </button>
        </div>
      )}
      <Loader state={loading} />
    </div>
  );
}
