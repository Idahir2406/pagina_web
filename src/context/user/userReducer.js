import {GET_USER} from "context/types"

export default function(state,action){
  const {type,payload} = action;
  switch(type){
    case GET_USER:
      return{
        ...state,
        user:payload
      }
    default:
      return state;
  }
}