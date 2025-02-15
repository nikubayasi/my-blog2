import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      // unique制約を外すか、必要に応じて設定
    },
    lastName: {
      type: String,
      required: true,
      // unique制約を外すか、必要に応じて設定
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: '', // falseではなく空文字列など、文字列型に合わせる
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;

// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema(
//   {
//     clerkId:{
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email:{
//       type: String,
//       required: true,
//       unique: true,
//     },
//     firstName:{
//       type: String,
//       required: true,
//       unique: true,
//     },
//     lastName:{
//       type:String,
//       required: true,
//       unique: true,
//     },
//     username:{
//       type:String,
//       required: true,
//       unique: true,
//     },
//     profilePicture:{
//       type:String,
//       default: false,
//     },
//     isAdmin:{
//       type:Boolean,
//       default: false,
//     }
//   },{timestamps: true}
// );

// const User = mongoose.models.User || mongoose.model('User',userSchema);
// export default User;