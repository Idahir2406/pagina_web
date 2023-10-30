import { Schema } from 'mongoose';
export const orderSchema=new Schema({
  order:{
    type: Array,
    required: true,
  
  },
  address:{
    type: Object,
    required: true,
  },
  subtotal:{
    type: Number,
    required: true,
  },
  total:{
    type: Number,
    required: true,
  },
  shippingCost:{
    type: Number,
    required: true,
  },
  phoneNumber:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  paymentMethod:{
    type: String,
    required: true,
  },

})
