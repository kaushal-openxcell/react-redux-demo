import * as yup from 'yup';
import { PASSWORD } from './constants.js';

export const YUP_VALIDATION = {
    EMAIL :  yup.string()
        .email('Invalid email!')
        .required('Email is required!'),

    PASSWORD : yup.string()
        .min(PASSWORD.MIN, `Password should be minimum ${PASSWORD.MIN} characters!`)
        .max(PASSWORD.MAX, `Password should be maximum ${PASSWORD.MAX} characters!`)
        .required('Password is required!'),

    CONFIRM_PASSWORD : yup.string()
        .oneOf([yup.ref('password'), null], 'Password must match!')
        .required('Confirm Password is required!'),

    FIRST_NAME : yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only aphabetic values are allowed!")
        .required('First name is required!'),

    LAST_NAME : yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only aphabetic values are allowed!")
        .required('Last name is required!'),

    PHONE : yup.number('Invalid phone number!')
        .required('Phone is required!'),

    DATE : {
        DOB : yup.date()
        .required('Date of birth is required!'),
    },

    DESCRIPTION :  yup.string()
        .required('Description is required!'),
    
    TNC :  yup.bool().oneOf([true], "You must accept the terms and conditions")
}