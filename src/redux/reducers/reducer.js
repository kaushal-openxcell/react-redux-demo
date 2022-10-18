import { v4 as uuidv4 } from 'uuid';
import { RANDOM_NUMBER } from "../../constants";
import { REDUX_ACTIONS_TYPES } from "../actions/types";

const initialState = {
  users: [
    {
      id: '35b2c57f-31f5-47eb-80c6-13d4b043b534',
      first_name: 'Kaushal',
      last_name: 'Adhiya',
      email: 'kaushal@mailinator.com',
      phone: '8794546544',
      password: '123456',
      dob: '1997-01-01',
      gender: 'male',
      otp: '',
    },
    {
      id: '35b2c57f-31f5-47eb-80c6-13d4b043b535',
      first_name: 'Kaushal',
      last_name: 'Adhiya',
      email: 'kaushal1@mailinator.com',
      phone: '8794546544',
      password: '123456',
      dob: '1997-01-01',
      gender: 'male',
      otp: '',
    }
  ],
  isUserLogIn : false,
  loggedInUser: '',
  error: false,
  posts:[]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUX_ACTIONS_TYPES.REGISTER:
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case REDUX_ACTIONS_TYPES.LOGIN:
      const user = state.users.filter((user, index) => {
        return (user.email === action.payload.email && user.password === action.payload.password) ? user : false
      })
      if(user.length > 0 && user[0] !== false){
        return {
          ...state,
          isUserLogIn:true,
          loggedInUser:user[0]
        }
      }else{
        return {
          ...state,
          error: true
        }
      }
    case REDUX_ACTIONS_TYPES.LOGOUT:
      return {
        ...state,
        isUserLogIn:false,
        loggedInUser:''
      }
    case REDUX_ACTIONS_TYPES.REMOVE_ERROR:
      return {
        ...state,
        isUserLogIn:false,
        loggedInUser:'',
        error: false
      }
    case REDUX_ACTIONS_TYPES.OTP.SET:
      return {
        ...state,
        users:  state.users.map((user) => (user.email === action.payload.email) ? {...user, otp: RANDOM_NUMBER(4)} : user)
      }
    case REDUX_ACTIONS_TYPES.OTP.REGENERATE:
      return {
        ...state,
        users:  state.users.map((user) => (user.id === action.payload.id) ? {...user, otp: RANDOM_NUMBER(4)} : user)
      }
    case REDUX_ACTIONS_TYPES.OTP.VERIFY:
      return {
        ...state,
        users:  state.users.map((user) => (user.id === action.payload.id) ? {...user, otp: '', verify:true} : user)
      }
    case REDUX_ACTIONS_TYPES.PASSWORD.RESET:
        return {
          ...state,
          users:  state.users.map((user) => (user.id === action.payload.id) 
          ? {...user, password: action.payload.password, verify:false} : user)
        }
    case REDUX_ACTIONS_TYPES.PASSWORD.CHANGE:
        return {
          ...state,
          users:  state.users.map((user) => (user.id === action.payload.id) 
          ? {...user, password: action.payload.password} : user)
        }
    case REDUX_ACTIONS_TYPES.UPDATE_PROFILE:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          first_name:action.payload.first_name,
          last_name:action.payload.last_name,
          email:action.payload.email,
          phone:action.payload.phone,
          dob:action.payload.dob,
          gender:action.payload.gender,
          profilePic:action.payload.profilePic
        },
        users:  state.users.map((user) => 
          (user.id === action.payload.id)
          ? {
              ...user,
              first_name:action.payload.first_name,
              last_name:action.payload.last_name,
              email:action.payload.email,
              phone:action.payload.phone,
              dob:action.payload.dob,
              gender:action.payload.gender,
              profilePic:action.payload.profilePic
            } 
          : user
        )
      }
    case REDUX_ACTIONS_TYPES.POST.CREATE:
      const newPost = {
        id: uuidv4(),
        createdBy: state.loggedInUser.id,
        createdDate: action.payload.createdDate,
        createdTime: action.payload.createdTime,
        post: action.payload.post,
        media: action.payload.media,
        likes: []
      }
      return {
        ...state,
        posts:[ newPost, ...state.posts]
      }
    case REDUX_ACTIONS_TYPES.POST.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload.id)
      }
    case REDUX_ACTIONS_TYPES.POST.LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => 
          (post.id === action.payload.id)
          ?
            {
              ...post,
              likes:[
                action.payload.user_id,
                ...post.likes
              ]
            }
          :
            post
        )
      }
      case REDUX_ACTIONS_TYPES.POST.DISLIKE:
        return {
          ...state,
          posts: state.posts.map((post) => 
            (post.id === action.payload.id)
            ?
              {
                ...post,
                likes: post.likes.filter((user) => user !== action.payload.user_id)
              }
            :
              post
          )
        }
    default:
      return state;
  }
}

export default reducer