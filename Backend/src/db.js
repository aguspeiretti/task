import mongoose from "mongoose";

export const conectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://peirettidev:Agu5Jul1Joaqu1@agusdb.9dnt6gh.mongodb.net"
    );
    console.log(">>>>>DB is conected");
  } catch (error) {
    console.log(error);
  }
};
