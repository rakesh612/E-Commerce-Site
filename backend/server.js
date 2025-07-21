import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); //root directory of the project

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser()); // allows you to parse cookies in the request
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist"))); //from the root folder ,go to frontend and and use dist folder
// Serve the static files from the React app. whenever user visits otherthan the above routes, serve the index.html file
	app.get("/{*any}", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
// Let’s say you deploy this to Render:
// Someone goes to https://your-app.onrender.com/products
// Express checks the route:
// It doesn’t match any backend API route.
// It serves frontend/dist/index.html
// React then loads and takes over /products route using its own routing logic.


 
app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});
