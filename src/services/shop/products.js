const API_HOST = "https://api.tatchcakery.com/api/products/";
const SEARCH_API = "https://api.tatchcakery.com/api/dash/search/top";

// export const fetch_shop_products = (options) => {
//   const {
//     categories,
//     brands,
//     minPrice,
//     maxPrice,
//     sort,
//     perPage,
//     currentPage,
//   } = options;

//   // Flatten the hierarchical categories into a single array
//   const flattenedCategories = Object.values(categories).flat();

//   // Construct the query parameters
//   const queryParams = new URLSearchParams();
//   queryParams.append("perPage", perPage);
//   queryParams.append("page", currentPage);
//   if (flattenedCategories.length > 0) {
//     queryParams.append(
//       "categories",
//       flattenedCategories.map((category) => category).join(",")
//     );
//   }
//   if (brands && brands.length > 0) {
//     queryParams.append("brands", brands.join(","));
//   }
//   if (minPrice !== undefined) {
//     queryParams.append("minPrice", minPrice);
//   }
//   if (maxPrice !== undefined) {
//     queryParams.append("maxPrice", maxPrice);
//   }
//   if (sort !== undefined) {
//     queryParams.append("sort", sort);
//   }

//   return fetch(`${API_HOST}?${queryParams}`, {
//     method: "GET",
//     credentials: "include",
//     secure: true,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((res) => res.json());
// };

export const fetch_shop_products = (options) => {
  const {
    categorySlug,
    perPage,
    currentPage,
  } = options;

  const queryParams = new URLSearchParams();
  queryParams.append("perPage", perPage);
  queryParams.append("page", currentPage);
  queryParams.append("categorySlug", categorySlug);

  return fetch(`${API_HOST}?${queryParams}`, {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const fetch_shop_product = (slug) => {
  return fetch(API_HOST + "slug/" + slug, {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const search_shop_products = (searchQuery) => {
  return fetch(`${SEARCH_API}?query=${searchQuery}&type=product`, {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
