const express = require("express");
const session = require("express-session");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://wolfiee0024-arch.github.io"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

const isProduction = process.env.NODE_ENV === "production";

app.use(session({
  secret: process.env.SESSION_SECRET || "superSecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax"
  }
}));

app.use("/auth", authRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
