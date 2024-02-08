import { React, useState, useEffect } from "react";
//import { searchApi } from "../../services/search";
import iconSearch from "../../resources/themes/dashboard-v1/icons/search.svg";
import iconLink from "../../resources/themes/dashboard-v1/icons/link.svg";

const SearchBar = ({ type, resultType, setSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [searchInputFocused, setSearchInputFocused] = useState(false);

  const types = ["pet", "shop", "user", "product", "service"];

  const handleInputChange = (value) => {
    setSearchValue(value);

    if (value.trim() !== "") {
      // searchApi(value, resultType)
      //   .then((response) => {
      //     if (response.status === "ok") {
      //       setSearchResults(response.data);
      //       setSearchResultsOpen(true);
      //     } else {
      //       setSearchResults([]);
      //       setSearchResultsOpen(true);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching search results:", error);
      //     setSearchResults([]);
      //     setSearchResultsOpen(true);
      //   });
    } else {
      setSearchResults([]);
      setSearchResultsOpen(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (type === "list") {
      setSearch({ search: searchValue });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const card = document.querySelector(".search-results-card");
      const input = document.querySelector(".form-control.ps-5.py-3.rounded-2");
      if (
        card &&
        !card.contains(event.target) &&
        input &&
        !input.contains(event.target)
      ) {
        setSearchResultsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={
        type === "list"
          ? "position-relative"
          : "position-relative flex-grow-1 flex-shrink-1 w-100"
      }
    >
      {type === "list" ? (
        <form onSubmit={handleSearch}>
          <button
            className="position-absolute top-50 start-0 translate-middle-y ps-3 clickable list-search-button"
            type="submit"
          >
            <img src={iconSearch} alt="search" />
          </button>
          <input
            type="text"
            className="no-print form-control list-search ps-5 py-3 rounded-2"
            name="search"
            placeholder="search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoComplete="off"
            onFocus={() => {
              setSearchResultsOpen(true);
              setSearchInputFocused(true);
            }}
          />
        </form>
      ) : (
        <>
          <img
            className="position-absolute top-50 start-0 translate-middle-y ps-3"
            src={iconSearch}
            alt="search"
          />
          <input
            type="text"
            className="no-print form-control ps-5 py-3 rounded-2"
            name="search"
            placeholder="search..."
            value={searchValue}
            onChange={
              (e) => handleInputChange(e.target.value)
            }
            autoComplete="off"
            onFocus={() => {
              setSearchResultsOpen(true);
              setSearchInputFocused(true);
            }}
          />
        </>
      )}

      {searchResultsOpen && searchResults.length > 0 && (
        <div className="search-results-card p-0">
          {searchResults.map((result) => (
            <a
              key={result.id}
              href={result.link}
              className="search-result-entry py-3 px-2"
            >
              <img
                src={types.includes(result.type) ? result.image : iconLink}
                alt={result.title}
                className={
                  types.includes(result.type)
                    ? "search-result-image me-3"
                    : "me-3"
                }
              />
              <div className="search-result-details">
                <div className="search-result-title mb-1">{result.title}</div>
                {types.includes(result.type) ? (
                  <div className="search-result-id">ID: {result.id}</div>
                ) : (
                  <div className="search-result-link">
                    {result.link.replace("/admin/", "")}
                  </div>
                )}
              </div>
              {type === "list" ? (
                ""
              ) : (
                <div
                  className={`badge me-3 ${
                    types.includes(result.type) ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  {types.includes(result.type) ? result.type : "Quick Link"}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
