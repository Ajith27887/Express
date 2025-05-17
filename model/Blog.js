import mongoose from "mongoose";
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  text: String,
  slug: String,
  published: Boolean
},{
	timeseries : true
}); 

const Blog = model('Blog', blogSchema);
export default Blog;