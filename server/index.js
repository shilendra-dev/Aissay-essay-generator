import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import essayRoutes from "./routes/essayRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://aissay-essay-generator.vercel.app", // your main domain (optional if using custom domain)
];

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// // Preflight requests
// app.options("*", cors(corsOptions));

app.use(express.json());
app.use("/api/essay", essayRoutes);

//test api
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 5001}`);
});
