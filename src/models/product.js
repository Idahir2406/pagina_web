import { Schema, model, models } from 'mongoose'

export const ProductSchema = new Schema({
    name:{
        type: String,
        required: true  
    },
    category:{
        type: String,
        required: true,
        default: "otros"
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }

},{timestamps:true})

export default models.Product || model('Product', ProductSchema)