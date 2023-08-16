import fs from 'fs';
import { v4 } from 'uuid';
import path, { dirname } from 'path';
import { Response } from 'express';
import { CreateImage, DeleteImage } from '../services/image.service';
import { CreateImageInput } from '../schema/image.schema'

const createImage = async (req: any, res: Response) => {
    try {
        const file = req.file;
        const host = req.get('host');
        const protocol = req.protocol;
        const fileName = v4();
        const extension = path.extname(file.originalname);

        let pathImages = __dirname;

        if(pathImages.includes("build")){
            pathImages += '/../../../public/images';
        }else{
            pathImages += '/../../public/images';
        }

        fs.writeFileSync(`${pathImages}/${fileName}${extension}`, file.buffer);

        const input: CreateImageInput = {
            body:{
                url: `${protocol}://${host}/images/${fileName}${extension}`,
                originalName: file.originalname
            }
        }

        return await CreateImage( { ...input.body } , res);
    } catch (e: any) {
        return res.status(500).send(e.message);
    }
}

const deleteImage = async (req: any, res: Response) => {
    try {
        
        const host = req.get('host');
        const protocol = req.protocol;
        const srcs = Array.isArray(req.query.id) ? req.query.id : [req.query.id];

        let filesName = [] as any[];

        for (let item of srcs) {
            filesName.push(item.replace(`${protocol}://${host}/images/`, ''));
        }

        let path = __dirname;

        if(path.includes("build")){
            path += '/../../../public/images';
        }else{
            path += '/../../public/images';
        }

        if (filesName.length > 0) {
            for (let item of filesName) {
                const fileDir = `${path}/${item}`;

                if (fs.existsSync(fileDir)) {
                    fs.unlinkSync(fileDir);
                }
            }
        }

        return await DeleteImage(res, srcs);
    } catch (e: any) {
        return res.status(500).json({message: e.message});
    }
}

export { createImage as CreateImage, deleteImage as DeleteImage }