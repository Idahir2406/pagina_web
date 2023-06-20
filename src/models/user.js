import {Schema,model,models, Types} from 'mongoose';

const UserSchema=new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image:{
    type: String,
  },
  phoneNumber:{
    type: String,
  },
  wishList:{
    default: [],
    type: Array,
  },
  cart:{
    default: [],
    type: Array,
  },
  paymentMethods:{
    default: [],
    type: Array,
  },
  orders:{
    default: [],
    type: Array,
  },
  adresses:{
    default: [],
    type: Array,
  }
},{timestamps:true})

export default models.User || model('User', UserSchema)