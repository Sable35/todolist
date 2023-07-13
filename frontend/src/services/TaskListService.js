import axios from "axios";
import {setTaskLists, setPriorities, setRegularities, setStatuses} from "../slices/TaskListSlice";
import AuthHeader from "./AuthHeader";

const API_URL_TASKLIST = "/taskLists";
const API_URL_TASK = "/tasks";

const getTaskLists = (dispatch) => {
    return axios.get(API_URL_TASKLIST, {headers: AuthHeader()}).then(
        (response) => {
            dispatch(setTaskLists(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setTaskLists([]));
        });

};

const getStatuses = (dispatch) => {
    return axios.get(API_URL_TASKLIST + "/statuses", {headers: AuthHeader()}).then(
        (response) => {
            dispatch(setStatuses(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setStatuses([]));
        });

};

const getPriorities = (dispatch) => {
    return axios.get(API_URL_TASKLIST + "/priorities", {headers: AuthHeader()}).then(
        (response) => {
            dispatch(setPriorities(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setPriorities([]));
        });

};

const getRegularities = (dispatch) => {
    return axios.get(API_URL_TASKLIST + "/regularities", {headers: AuthHeader()}).then(
        (response) => {
            dispatch(setRegularities(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setRegularities([]));
        });

};

const getTaskListsByCategory = (dispatch, IdCategory) => {
    return axios.get(API_URL_TASKLIST + "/categories" + `?IdCategory=${IdCategory}`, {headers: AuthHeader()}).then(
        (response) => {
            dispatch(setTaskLists(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setTaskLists([]));
        });

};

const createTaskList = (taskList, dispatch) => {
    return axios.post(API_URL_TASKLIST, taskList,  {headers: AuthHeader()}).then(
        (response) => {
            getTaskLists(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const createTask = (task, dispatch) => {
    return axios.post(API_URL_TASK, task,  {headers: AuthHeader()}).then(
        (response) => {
            getTaskLists(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};
const updateTaskList = (taskList, dispatch) => {
    return axios.put(API_URL_TASKLIST, taskList,  {headers: AuthHeader()}) .then(
        (response) => {
            getTaskLists(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const updateTask = (task, dispatch) => {
    return axios.put(API_URL_TASK, task,  {headers: AuthHeader()}) .then(
        (response) => {
            getTaskLists(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteTaskList = (id, dispatch) => {
    return axios.delete(API_URL_TASKLIST + `/${id}`,  {headers: AuthHeader()}).then(
        (response) => {
            getTaskLists(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteTask = (id, dispatch) => {
    return axios.delete(API_URL_TASK + `/${id}`,  {headers: AuthHeader()}).then(
        (response) => {
            getTaskLists(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const TaskListService = {
    getTaskLists: getTaskLists,
    getTaskListsByCategory: getTaskListsByCategory,
    getStatuses: getStatuses,
    getPriorities: getPriorities,
    getRegularities: getRegularities,
    createTaskList: createTaskList,
    createTask: createTask,
    deleteTaskList: deleteTaskList,
    deleteTask: deleteTask,
    updateTaskList: updateTaskList,
    updateTask: updateTask,
};

export default TaskListService