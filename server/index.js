import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import essayRoutes from './routes/essayRoutes.js';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Allow preflight requests
app.options('*', cors());

app.use(express.json());
app.use('/api/essay', essayRoutes);

//test api
app.get('/', (req, res) => { res.send('Hello World!'); });

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 5001}`);
});