import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubjectPage from "./pages/SubjectPage";

import "./styles.css";

export default function App() {
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
    fetch(
      "https://openlibrary.org/search.json?q=" +
        query +
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/subject/design"
          element={<SubjectPage subject="design" />}
        />
        <Route
          path="/subject/programming"
          element={<SubjectPage subject="programming" />}
        />
        <Route
          path="/subject/finance"
          element={<SubjectPage subject="finance" />}
        />
        <Route
          path="/subject/exercise"
          element={<SubjectPage subject="exercise" />}
        />
        <Route
          path="/subject/management"
          element={<SubjectPage subject="management" />}
        />
      </Routes>
    </div>
  );
}
