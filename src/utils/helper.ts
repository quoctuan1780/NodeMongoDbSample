import fs from 'fs';

export const extractImgSrc = (html: string) => {
    var m,
        urls = [],
        rex = /<img[^>]+src="?([^"\s]+)"?\s*>/g;

    while (m = rex.exec(html)) {
        urls.push(m[1]);
    }

    return urls;
}

export const deleteImage = (host: String, protocol: String, data: any) => {
        const srcs = Array.isArray(data) ? data : [data];

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
}