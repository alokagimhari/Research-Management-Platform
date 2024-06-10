import * as productServices from '../services/Product';
import { handleError } from '../utils/error';
import * as productConstants from '../constants/userConstants';

export const productList = (filters, initialLoading) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: productConstants.PRODUCTLIST_FETCH_START });
    }

    productServices.filterParams(filters);

    const { results, count } = productServices.fetchProducts(filters);

    dispatch({
      type: productConstants.PRODUCTLIST_FETCH_SUCCESS,
      payload: { results, count },
    });
  } catch (err) {
    dispatch({
      type: productConstants.PRODUCTLIST_FETCH_ERROR,
      payload: handleError(err),
    });
  }
};

export const product = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_FETCH_START });

    const data = await productServices.fetchProduct(id);

    dispatch({
      type: productConstants.PRODUCT_FETCH_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: productConstants.PRODUCT_FETCH_FAIL,
      payload: handleError(err),
    });
  }
};

export const productReviews = (id, initialLoading) => async (dispatch) => {
    try {
      if (initialLoading) {
        dispatch({ type: productConstants.PRODUCTREVIEW_FETCH_START });
      }
  
      const { data, count } = await productServices.fetchProductReviews(id);
  
      dispatch({
        type: productConstants.PRODUCTREVIEW_FETCH_SUCCESS,
        payload: {
          data,
          count,
        },
      });
    } catch (err) {
      dispatch({
        type: productConstants.PRODUCTREVIEW_FETCH_FAIL,
        payload: handleError(err),
      });
    }
  };
  
  export const createReview = (id, title, text, rating) => async (dispatch) => {
    try {
      dispatch({ type: productConstants.CREATE_REVIEW_START });
  
      const body = {
        title,
        text,
        rating,
      };
  
      await productServices.createReview(id, body);
  
      dispatch({
        type: productConstants.CREATE_REVIEW_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: productConstants.CREATE_REVIEW_FAIL,
        payload: handleError(err),
      });
    }
  };
  