import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

export const ERROR_MESSAGE = 'Something went wrong, please try again later!';

export const UUID = uuidv4();

export const PASSWORD = {
    MIN : 5,
    MAX : 12
}

export const MUI_ALERTS = {
    SUCCESS : 'success',
    ERROR   : 'error',
    INFO    : 'info',
    WARNING : 'warning',
}

export const ROUTER = {
    HOME : '/',
    LOGIN : '/login',
    DASHBOARD : '/dashboard',
    REGISTRATION : '/register',
    PASSWORD : {
        VERIFY : '/verification/:id',
        FORGOT : '/forgot-password',
        RESET : '/reset-password/:id',
        CHANGE : '/change-password'
    },
    POST : {
        CREATE : '/create-post',
        LIST : '/post-list'
    },
    PROFILE : 'profile'
}

export const DATETIME = {
    DATE  : String(new Date().getDate()).padStart(2, '0'),
    MONTH : String(new Date().getMonth() + 1).padStart(2, '0'),
    YEAR  : new Date().getFullYear(),

    HOUR   : new Date().getHours(),
    MINUTE : new Date().getMinutes(),
    SECOND : new Date().getSeconds()
}

export const RANDOM_STRING = (length) => {
    const characters = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
}

export const RANDOM_NUMBER = (length) => {
    const characters = '0123456789';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
}

export const GET_USERS = (email = null) => {
    const ALL_USERS = useSelector(state => state.users);
    if(email) {
        //find user's index form all users list
        const usrIndex = ALL_USERS.findIndex( (u => u.email === email) )
        return ALL_USERS[usrIndex];
    } else {
        return ALL_USERS;
    }
}

export const GET_POSTS = (email = '') => {
    const ALL_POSTS = useSelector(state => state.posts);
    if(email) {
        const USER_POST = ALL_POSTS.filter( (posts) => posts.user_email === email )
        return USER_POST;
    } else {
        return ALL_POSTS;
    }
}

export const TO_BASE_64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});