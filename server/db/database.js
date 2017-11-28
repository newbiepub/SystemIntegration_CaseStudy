import mongoose from "mongoose";
const
    mongoURI = `mongodb://localhost:27017/SystemIntegration`,
    options = {
        useMongoClient: true
    };

mongoose.connect(mongoURI, options);

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function () {
    console.log("Database Connect Successfully");
});
export {conn};
export default mongoose;