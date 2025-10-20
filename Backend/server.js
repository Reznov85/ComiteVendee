import express from "express"
import connectDB from "./db/db.js"
import userRoute from "./routes/user.route.js";
import clubRoute from "./routes/club.route.js";
import equipeRoute from "./routes/equipe.route.js";
import competitionRoute from "./routes/competition.route.js";
import dotenv from 'dotenv'
import commentaireRoute from "./routes/commentaire.route.js";
import actualiteRoute from "./routes/actualite.route.js";
import cors from "cors"
import imageRoute from "./routes/image.route.js";
import concoursRoute from "./routes/concours.route.js";


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // 📂 Sert les fichiers images

app.use('/utilisateur', userRoute)
app.use('/club', clubRoute)
app.use('/equipe', equipeRoute)
app.use('/competition', competitionRoute)
app.use("/commentaire", commentaireRoute)
app.use("/actualite", actualiteRoute)
app.use("/image", imageRoute)
app.use("/concours", concoursRoute)











const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`))