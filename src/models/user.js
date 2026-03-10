import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true
    },
  },

  {
    timestamps: true
  },
);

userSchema.pre("save", function () {
  if(!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model("User", userSchema);