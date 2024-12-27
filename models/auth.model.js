import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  email: {
    type: String,
    requied: true,
  },
  password: {
    type: String,
    requied: true,
  },
});

const Admin = mongoose.model("Admin", AuthSchema);

export default Admin;
