import {CREATEAPI_ACTION_TYPE} from '../../actions'
import merge from 'lodash/merge'
import cookie from '../utils/cookie'

// export default function loginReducer(state = {'authenticated': false}, action) {
//     const { type, data } = action;
//     switch(type) {
//         case CREATEAPI_ACTION_TYPE.CREATEAPI_SUCCESS:
//             if (action.response) {
//                 console.log('successed')
//                 return merge({}, state, {authenticated: true})
//             }
//             break;
//         case CREATEAPI_ACTION_TYPE.CREATEAPI_FAILURE:
//             break;
//         default:
//             console.log('action type trigger: ', type)
//     }
//
//     return state
// }
