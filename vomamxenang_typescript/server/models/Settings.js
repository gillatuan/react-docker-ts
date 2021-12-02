import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Create Schema
const SettingsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  deleted: {
    type: Number,
    default: 2,
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

const Settings = mongoose.model("settings", SettingsSchema)
export default Settings
