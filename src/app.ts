import express, { Request, Response } from 'express';
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import responseTime from "response-time";
import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics";
import connect from "./utils/connect";
import logger from "./utils/logger";
import loggerMorgan from 'morgan';
import postRoute from './routes/post.route';
import imageRoute from './routes/image.route';
import cors from 'cors';

import bodyParser from 'body-parser';

const port = config.get<number>("port");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
const options = {
    type: 'application/octet-stream',
};
app.use(bodyParser.raw(options));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(loggerMorgan('dev'));
app.use(cors());

let pathImages = __dirname;

if(pathImages.includes("build")){
    pathImages += '/../../public/images';
}else{
    pathImages += '/../public/images';
}

app.use('/images', express.static(pathImages));

app.use(
    responseTime((req: Request, res: Response, time: number) => {
        if (req?.route?.path) {
            restResponseTimeHistogram.observe(
                {
                    method: req.method,
                    route: req.route.path,
                    status_code: res.statusCode,
                },
                time * 1000
            );
        }
    })
);

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);

    await connect();

    postRoute(app);
    imageRoute(app);

    // error handler
    app.use(function (err: any, req: Request, res: Response, next: any) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500).json({ message: "Error in system" });
    });

    startMetricsServer();
});