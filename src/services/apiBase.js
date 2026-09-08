// Base URL for the Tatch API, without a trailing slash.
//
// This is the production branch, so the default points at prod. Override with
// REACT_APP_API_BASE at build time if needed. (The staging branch defaults to
// the staging API.)
const API_BASE = (process.env.REACT_APP_API_BASE || "https://api.tatchcakery.com/api")
  .replace(/\/+$/, "");

export default API_BASE;
