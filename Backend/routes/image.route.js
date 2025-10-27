import { Router } from "express";
import upload from "../middlewares/upload.js";
import { uploadImages, getAllImages } from "../controllers/image.controller.js";

const imageRoute = Router();

// Upload d'une ou plusieurs images
imageRoute.post("/upload", upload.array("images", 10), uploadImages);
imageRoute.get("/", getAllImages);

export default imageRoute;
