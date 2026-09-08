// Base URL for the Tatch API, without a trailing slash.
//
// Defaults to staging. Override per environment by setting REACT_APP_API_BASE
// at build time — e.g. in the Vercel *production* project set
//   REACT_APP_API_BASE=https://api.tatchcakery.com/api
const API_BASE = (process.env.REACT_APP_API_BASE || "https://staging-api.tatchcakery.com/api")
  .replace(/\/+$/, "");

export default API_BASE;
