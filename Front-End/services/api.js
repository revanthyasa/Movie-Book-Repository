// // // import axios from 'axios';

// // // const API_URL = 'https://localhost:7015/api';

// // // // Movie APIs
// // // export const getMovies = () => axios.get(`${API_URL}/Movies`);
// // // export const addMovie = (movie) => axios.post(`${API_URL}/Movies`, movie);
// // // export const updateMovie = (id, movie) => axios.put(`${API_URL}/Movies/${id}`, movie);
// // // export const getMovie = (id) => axios.get(`${API_URL}/Movies/${id}`);
// // // export const deleteMovie = (id) => axios.delete(`${API_URL}/Movies/${id}`);

// // // // Book APIs
// // // export const getBooks = () => axios.get(`${API_URL}/Books`);
// // // export const addBook = (book) => axios.post(`${API_URL}/Books`, book);
// // // export const updateBook = (id, book) => axios.put(`${API_URL}/Books/${id}`, book);
// // // export const getBook = (id) => axios.get(`${API_URL}/Books/${id}`);
// // // export const deleteBook = (id) => axios.delete(`${API_URL}/Books/${id}`);
// // import axios from 'axios';

// // const API_URL = 'https://localhost:7015/api';

// // axios.interceptors.request.use(
// //     config => {
// //         const token = localStorage.getItem('token');
// //         if (token) {
// //             config.headers['Authorization'] = `Bearer ${token}`;
// //         }
// //         return config;
// //     },
// //     error => {
// //         return Promise.reject(error);
// //     }
// // );

// // // Auth APIs
// // export const loginUser = async (credentials) => {
// //     const response = await axios.post(`${API_URL}/Auth/login`, credentials);
// //     localStorage.setItem('token', response.data.token);
// // };

// // export const registerUser = async (user) => {
// //     const response = await axios.post(`${API_URL}/Auth/register`, user);
// //     localStorage.setItem('token', response.data.token);
// // };

// // // Movie APIs
// // export const getMovies = (searchTerm = '', sortBy = '', isAscending = true) => {
// //     let url = `${API_URL}/Movies?search=${searchTerm}`;
// //     if (sortBy) {
// //         url += `&sortBy=${sortBy}&isAscending=${isAscending}`;
// //     }
// //     return axios.get(url);
// // };

// // export const addMovie = (movie) => axios.post(`${API_URL}/Movies`, movie);
// // export const updateMovie = (id, movie) => axios.put(`${API_URL}/Movies/${id}`, movie);
// // export const getMovie = (id) => axios.get(`${API_URL}/Movies/${id}`);
// // export const deleteMovie = (id) => axios.delete(`${API_URL}/Movies/${id}`);

// // // Book APIs
// // export const getBooks = (searchTerm = '', sortBy = '', isAscending = true) => {
// //     let url = `${API_URL}/Books?search=${searchTerm}`;
// //     if (sortBy) {
// //         url += `&sortBy=${sortBy}&isAscending=${isAscending}`;
// //     }
// //     return axios.get(url);
// // };

// // export const addBook = (book) => axios.post(`${API_URL}/Books`, book);
// // export const updateBook = (id, book) => axios.put(`${API_URL}/Books/${id}`, book);
// // export const getBook = (id) => axios.get(`${API_URL}/Books/${id}`);
// // export const deleteBook = (id) => axios.delete(`${API_URL}/Books/${id}`);
// import axios from 'axios';

// const API_URL = 'https://localhost:7015/api';

// axios.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('token');

//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// // Auth APIs
// export const loginUser = async (credentials) => {
//     const response = await axios.post(`${API_URL}/Auth/login`, credentials);
//     localStorage.setItem('token', response.data.token);
//     // console.log({token});
// };

// export const registerUser = async (user) => {
//     const response = await axios.post(`${API_URL}/Auth/register`, user);
//     localStorage.setItem('token', response.data.token);
// };

// // Movie APIs
// export const getMovies = () => axios.get(`${API_URL}/Movies`);
// export const addMovie = (movie) => axios.post(`${API_URL}/Movies`, movie);
// export const updateMovie = (id, movie) => axios.put(`${API_URL}/Movies/${id}`, movie);
// export const getMovie = (id) => axios.get(`${API_URL}/Movies/${id}`);
// export const deleteMovie = (id) => axios.delete(`${API_URL}/Movies/${id}`);

// // Book APIs
// export const getBooks = () => axios.get(`${API_URL}/Books`);
// export const addBook = (book) => axios.post(`${API_URL}/Books`, book);
// export const updateBook = (id, book) => axios.put(`${API_URL}/Books/${id}`, book);
// export const getBook = (id) => axios.get(`${API_URL}/Books/${id}`);
// export const deleteBook = (id) => axios.delete(`${API_URL}/Books/${id}`);
import axios from "axios";

const API_URL = "https://localhost:7015/api";

// Axios interceptor to add JWT token to headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/login`, credentials);
    console.log(response);
    localStorage.setItem("token", response.data.jwtToken);
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const registerUser = async (user) => {
  try {
    console.log(user);
    const response = await axios.post(`${API_URL}/Auth/Register`, user);
    console.log(response);
    localStorage.setItem("token", response.data.jwtToken);
  } catch (error) {
    throw new Error("Registration failed");
  }
};

// Movie APIs
// export const getMovies = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/Movies`);
//         console.log(response);
//         return response.data;
//     } catch (error) {
//         throw new Error('Failed to fetch movies');
//     }
// };
export const getMovies = async (
  searchTerm = "",
  searchBy = "name",
  sortBy = "",
  isAscending = true
) => {
  try {
    // const order = isAscending ? 'asc' : 'desc';
    const response = await axios.get(
      `${API_URL}/Movies?filterOn=${searchBy}&filterQuery=${searchTerm}&sortBy=${sortBy}&isAsending=${isAscending}`,
      {
        params: {
          searchTerm,
          searchBy,
          sortBy,
          isAscending,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
};

export const addMovie = async (movie) => {
  try {
    await axios.post(`${API_URL}/Movies`, movie);
  } catch (error) {
    throw new Error("Failed to add movie");
  }
};

export const updateMovie = async (id, movie) => {
  try {
    await axios.put(`${API_URL}/Movies/${id}`, movie);
  } catch (error) {
    throw new Error("Failed to update movie");
  }
};

export const deleteMovie = async (id) => {
  try {
    await axios.delete(`${API_URL}/Movies/${id}`);
  } catch (error) {
    throw new Error("Failed to delete movie");
  }
};

// Book APIs
export const getBooks = async (
    searchTerm = "",
    searchBy = "name",
    sortBy = "",
    isAscending = true
  ) => {
    try {
      // const order = isAscending ? 'asc' : 'desc';
      const response = await axios.get(
        `${API_URL}/Books?filterOn=${searchBy}&filterQuery=${searchTerm}&sortBy=${sortBy}&isAsending=${isAscending}`,
        {
          params: {
            searchTerm,
            searchBy,
            sortBy,
            isAscending,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch Books");
    }
  };
// export const getBooks = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/Books`);
//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch books");
//   }
// };

export const addBook = async (book) => {
  try {
    await axios.post(`${API_URL}/Books`, book);
  } catch (error) {
    throw new Error("Failed to add book");
  }
};

export const updateBook = async (id, book) => {
  try {
    await axios.put(`${API_URL}/Books/${id}`, book);
  } catch (error) {
    throw new Error("Failed to update book");
  }
};

export const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/Books/${id}`);
  } catch (error) {
    throw new Error("Failed to delete book");
  }
};

export default {
  loginUser,
  registerUser,
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
