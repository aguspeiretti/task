import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      //limpia los espacios
      trim: true,
    },
    email: {
      type: String,
      require: true,
      //limpia los espacios
      trim: true,
      // verifico que sea unico
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
