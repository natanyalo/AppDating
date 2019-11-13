import mongoose, { connect } from "mongoose";
import { url } from "./config";
console.log("process.env.MONGOOSE_URL", process.env.MONGOOSE_URL);
connect(url);

export default mongoose;
