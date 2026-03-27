import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const formSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  userpassword: {
    type: String,
  },
  useremail: {
    type: String,
  },
  userpassword: {
    type: String,
  },
  userage: {
    type: String,
  }
});

formSchema.plugin(mongoosePaginate); 
const Form = mongoose.model("Form", formSchema);

export default Form;
