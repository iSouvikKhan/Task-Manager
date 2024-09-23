import express from 'express';
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import { router } from "./routes/index";
import mongoose from "mongoose";
import { resolve } from 'path';

// dotenv.config();
dotenv.config({ path: resolve(__dirname, '../.env') });
const port = process.env.PORT || 4000;
const app = express();

// const whitelist = ['http://localhost:3000', 'https://task-manager-neon-six.vercel.app'];
// const corsOptions: CorsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);




// app.get("./list", auth, (req: Request, res: Response) => {

// })

async function main() {
    await mongoose.connect(process.env.ConnectionString as string)
    app.listen(port, () => {
        console.log(`listening at port ${port}`);
    });
}

main();

export default app;