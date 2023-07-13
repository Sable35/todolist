import axios from "axios";
import {setCategories} from "../slices/CategorySlice";
import AuthHeader from "./AuthHeader";

const API_URL_CATEGORY = "/categories";

const getCategories = (dispatch) => {
    return axios.get(API_URL_CATEGORY , {headers: AuthHeader()}).then(
        (response) => {
            dispatch(setCategories(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setCategories([]));
        });

};
const createCategory = (category, dispatch) => {
    return axios.post(API_URL_CATEGORY, category,  {headers: AuthHeader()}).then(
        (response) => {
            getCategories(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};
const updateCategory = (category, dispatch) => {
    return axios.put(API_URL_CATEGORY , category,  {headers: AuthHeader()}) .then(
        (response) => {
            getCategories(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteCategory = (id, dispatch) => {
    return axios.delete(API_URL_CATEGORY  + `/${id}`,  {headers: AuthHeader()}).then(
        (response) => {
            getCategories(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const CategoryService = {
    getCategories: getCategories,
    createCategory: createCategory,
    deleteCategory: deleteCategory,
    updateCategory: updateCategory,
};

export default CategoryService