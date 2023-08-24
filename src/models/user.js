import mongoose, {Schema,model,models} from 'mongoose';

const adressSchema=new Schema({
  street:{
    type: String,
    required: true,
  },
  state:{
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  reference:{
    type: String,
    required: true,
  },
})

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
    type: [adressSchema],
  },
  chats:{
    default: [],
    type: Array,
  },
  role:{
    type: String,
    default: 'user',
  },
  notifications:{
    default: [],
    type: Array,
  },

  clientOrders:{
    default: [],
    type: Array,
  },
  avatar:{
    type: String,
    
  }
},{timestamps:true})

export default models.User || model('User', UserSchema)