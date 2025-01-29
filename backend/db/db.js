import mongoose from "mongoose";

function connect() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("conected to mongodb");
        })
        .catch((err) => {
            console.log(err);
        })
}

export default connect;