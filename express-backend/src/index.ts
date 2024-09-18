import express from 'express';
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import { router } from "./routes/index";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

const whitelist = ['http://localhost:3000'];
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1", router);




// app.get("./list", auth, (req: Request, res: Response) => {

// })

app.listen(port, () => {
    console.log(`listening at port ${port}`);
});
