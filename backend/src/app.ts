import { json, urlencoded } from "body-parser";
import express from "express";
import { join } from "path";
import homeCenter from "./routes/homeCenter";

import profile from "./routes/profile";
import users from "./routes/user";
import friend from "./routes/friend";
import notification from "./routes/notification";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
// allow to access to file , and tha path is for
// rediraction to right path from "images" to "backend/images"
app.use("/images", express.static(join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE,PUT, OPTIONS"
  );
  next();
});


app.use("/api/center", homeCenter);
app.use("/api/user", users);
app.use("/api/profile", profile);
app.use("/api/friend", friend);
app.use("/api/notification", notification);

export default app;
