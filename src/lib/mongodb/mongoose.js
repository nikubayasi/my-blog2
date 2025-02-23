import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = "next-blog";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  mongoose.set("strictQuery", true);

  if (cached.conn) {
    console.log("Already connected to MongoDB");
    return cached.conn; // ✅ `db` を正しく返す
  }

  if (!cached.promise) {
    const opts = {
      dbName: MONGODB_DB, // ✅ 明示的にデータベースを指定
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection.db; // ✅ `db` を返すように修正
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Connected to MongoDB");
    return cached.conn; // ✅ `db` を正しく返す
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};


// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;
// if (!MONGODB_URI) {
//   throw new Error('MONGODB_URIが設定されていません。');
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export const connect = async () => {
//   mongoose.set('strictQuery', true);

//   if (cached.conn) {
//     console.log('Already connected to MongoDB');
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       dbName: 'next-blog',
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//     console.log('Connected to MongoDB');
//     return cached.conn;
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// };

// // import mongoose from 'mongoose';

// // let initialized = false;

// // export const connect = async () => {
// //   mongoose.set('strictQuery', true);
// //   if (initialized) {
// //     console.log('Already connected to MongoDB');
// //     return;
// //   }
// //   try {
// //     await mongoose.connect(process.env.MONGODB_URI, {
// //       dbName: 'next-blog',
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     console.log('Connected to MongoDB');
// //     initialized = true;
// //   } catch (error) {
// //     console.log('Error connecting to MongoDB:', error);
// //   }
// // };
