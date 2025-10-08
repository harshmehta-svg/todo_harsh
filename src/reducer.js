// src/reducer.js
/**
 * Reducer for managing application state.
 *
 * @module reducer
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Constants
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const FETCH_DATA = 'FETCH_DATA';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Initial State
const initialState = {
  count: 0,
  fetchData: {
    loading: false,
    data: null,
    error: null,
  },
};

/**
 * @function reducer
 * @param {Object} state Initial state
 * @param {Object} action Action payload
 * @returns {Object} New state
 */
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

/**
 * @function fetchDataReducer
 * @param {Object} state Initial state
 * @param {Object} action Action payload
 * @returns {Object} New state
 */
const fetchDataReducer = (state = initialState.fetchData, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { loading: true, data: null, error: null };
    case FETCH_DATA_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case FETCH_DATA_FAILURE:
      return { loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

/**
 * @function reducer
 * @param {Object} state Initial state
 * @param {Object} action Action payload
 * @returns {Object} New state
 */
const reducer = combineReducers({
  count: countReducer,
  fetchData: fetchDataReducer,
  form: formReducer,
});

// Profile reducer
const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_PROFILE':
      return { ...state, ...action.payload };
    case 'EDIT_PROFILE':
      return { ...state, ...action.payload };
    case 'UPDATE_PROFILE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const combinedReducers = combineReducers({
  count: countReducer,
  fetchData: fetchDataReducer,
  form: formReducer,
  profile: profileReducer,
});

// Exports
export default combinedReducers;

// Profile actions
import axios from 'axios';

const loadProfile = () => {
  return (dispatch) => {
    dispatch({ type: 'LOAD_PROFILE', payload: {} });
    axios.get('/api/me')
      .then((response) => {
        dispatch({ type: 'LOAD_PROFILE', payload: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const editProfile = (data) => {
  return {
    type: 'EDIT_PROFILE',
    payload: data,
  };
};

const updateProfile = (data) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: data });
    axios.put('/api/me', data)
      .then((response) => {
        dispatch({ type: 'UPDATE_PROFILE', payload: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// Profile reducer actions
export {
  loadProfile,
  editProfile,
  updateProfile,
};