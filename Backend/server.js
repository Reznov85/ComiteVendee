import express from "express"
import connectDB from "./db/db.js"
import userRoute from "./routes/user.route.js";
import clubRoute from "./routes/club.route.js";
import equipeRoute from "./routes/equipe.route.js";
import dotenv from 'dotenv'
import commentaireRoute from "./routes/commentaire.route.js";
import actualiteRoute from "./routes/actualite.route.js";
import cors from "cors"
import imageRoute from "./routes/image.route.js";
import concoursRoute from "./routes/concours.route.js";
import championnatRoute from "./routes/championnat.route.js";
import journeeRoute from "./routes/journee.route.js";
import rencontreRoute from "./routes/rencontre.route.js";


dotenv.config();
connectDB();
const app = express();

// Configuration CORS permissive
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json());

app.use("/uploads", express.static("uploads")); // 📂 Sert les fichiers images

app.use('/utilisateur', userRoute)
app.use('/club', clubRoute)
app.use('/equipe', equipeRoute)
app.use("/commentaire", commentaireRoute)
app.use("/actualite", actualiteRoute)
app.use("/image", imageRoute)
app.use("/concours", concoursRoute)
app.use("/championnat", championnatRoute);
app.use("/journee", journeeRoute);
app.use("/rencontre", rencontreRoute);











const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`))