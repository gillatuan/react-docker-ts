import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Create Schema
const MediaSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: false,
  },
  encoding: {
    type: String,
    required: true,
  },
  isPortrait: {
    type: Number,
    default: 2,
  },
  deleted: {
    type: Number,
    default: 2,
  },
  originalname: {
    type: String,
    required: true,
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

  size: {
    type: Number,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
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

const Media = mongoose.model("media", MediaSchema)
export default Media
