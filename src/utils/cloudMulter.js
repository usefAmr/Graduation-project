import multer from "multer";

export const fileValidation = {
    image: ['image/png', 'image/jpg', 'image/jpeg', 'image/jfif'],
    file:['application/pdf']
};

export function fileUpload(customValidation = []) {
    const storage = multer.diskStorage({});
    
    function fileFilter(req, file, cb) {
            cb(null, true);
        
        // if (fileValidation.image.includes(file.mimetype) || customValidation.includes(file.mimetype)) {
        
        // } else {
        //     cb(new Error('Invalid format'), false);
        // }
    }

    const upload = multer({ fileFilter, storage });
    return upload;
}
