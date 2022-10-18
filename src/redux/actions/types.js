export const REDUX_ACTIONS_TYPES = {
    REGISTER : 'REGISTER',
    LOGIN : 'LOGIN',
    LOGOUT : 'LOGOUT',
    POST : {
        CREATE : 'CREATE_POST',
        DELETE : 'DELETE_POST',
        LIKE : 'LIKE_POST',
        DISLIKE : 'DISLIKE_POST'
    },
    OTP : {
        SET : 'SET_OTP',
        REGENERATE : 'REGENERATE_OTP',
        VERIFY : 'VERIFY'
    },
    PASSWORD : {
        RESET : 'RESET_PASSWORD',
        CHANGE : 'CHANGE_PASSWORD'
    },
    REMOVE_ERROR : 'REMOVE_ERROR',
    UPDATE_PROFILE : 'UPDATE_PROFILE'
}