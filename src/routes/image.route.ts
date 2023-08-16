import { Express } from "express";
import { CreateImage, DeleteImage } from "../controllers/image.controller";
import multer from 'multer'

const upload = multer();

function imageRoute(app: Express) {
    app.post('/image/upload', upload.single('image'), CreateImage);
    app.delete('/image', DeleteImage);
}

export default imageRoute;