import config from '../config';
import { interpolate } from '../utils/string';
import axios from 'axios';
import http from '../utils/http';



/**
 *
 * @param {Object} filters
 * @returns {Array} data
 */
export const fetchProducts = async (filters) => {
  const { data } = await http.get(config.apiEndPoint.product.fetchProducts, {
    params: {
      ...filters,
    },
  });
  return data;
};

export const fetchProduct = async (id) => {
  const url = interpolate(config.apiEndPoint.product.fetchProduct, { id: id });

  const { data } = await http.get(url);

  return data.data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */

export const fetchProductReviews = async (id) => {
    const url = interpolate(config.apiEndPoint.product.fetchProductReviews, {
      id: id,
    });
    const { data } = await http.get(url);
  
    return data;
  };
  
  /**
   *
   * @param {Integer} id
   * @returns {Object} data
   */
  export const createReview = async (id, body) => {
    const url = interpolate(config.apiEndPoint.product.createReview, {
      id: id,
    });
    const { data } = await http.post(url, {
      body,
    });
  
    return data;
  };
  
  export const addReview = async (fileId, reviewData) => {
    const getToken = () => localStorage.getItem("auth-token");
    const token = getToken();
    try {
      const { data } = await axios.post(`http://localhost:5000/api/review/add/${fileId}`, reviewData, {
        headers: {
          authorization: `Bearer` + token,
        },
      });
      return data;
    } catch (error) {
      console.log("Error in Add Review Method" + error.message);
    }
  };
  /**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const deleteProduct = async (id) => {
  const url = interpolate(config.apiEndPoint.product.deleteProduct, {
    id: id,
  });
  const { data } = await http.remove(url, {
    accessToken: true,
  });

  return data;
};
/**
 *
 * @param {Object} filters
 */
export const filterParams = (filters) => {
  Object.keys(filters).forEach((key) => {
    if (filters.hasOwnProperty(key)) {
      if (filters[key] === '') {
        delete filters[key];
      }
    }
  });
};