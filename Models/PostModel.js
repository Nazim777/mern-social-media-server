import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName:{type:String},
    desc: String,
    likes: [],
    comments:[],
    image:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;