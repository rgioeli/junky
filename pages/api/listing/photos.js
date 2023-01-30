import multiparty from "multiparty";
import { cloudinaryApi } from "@/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(req, res) {
  cloudinaryApi();

  const form = new multiparty.Form();
  const data = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) {
        reject({ err });
      } else {
        resolve({ fields, files });
      }
    });
  });
  console.log("HELLO");

  const upload = await cloudinary.uploader.upload(data.files.file[0].path);
  console.log(upload);

  res.json({ success: "ok" });
}

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};
