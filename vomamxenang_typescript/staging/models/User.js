import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  is_online: {
    type: Boolean,
    default: false,
  },
  validation_code: {
    type: String,
  },
  validation_type: {
    type: String,
  },
  validation_expired: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Number,
    default: 2,
  },
})

const User = mongoose.model('users', UserSchema)
export default User
