import * as dotenv from 'dotenv'
dotenv.config()
import cloudinary from 'cloudinary'
cloudinary.v2.config({
    cloud_name: "dkaflobgm",
    api_key: "669226557791556",
    api_secret: "s6Sgtn0o1h0vq8oESBypEiaVpAw",
    secure: true
});

export default cloudinary.v2