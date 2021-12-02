import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Create Schema
const PostsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  // SEO
  seo_keywords: {
    type: String,
  },
  seo_title: {
    type: String,
  },
  seo_description: {
    type: String,
  },

  status: {
    type: Number,
    default: 1,
  },
  deleted: {
    type: Number,
    default: 2,
  },
  fileSrc: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
})

const Posts = mongoose.model("posts", PostsSchema)
export default Posts
