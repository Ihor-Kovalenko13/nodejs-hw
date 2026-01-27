import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import 'dotenv/config';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger);

const PORT = process.env.PORT ?? 3000;

app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});