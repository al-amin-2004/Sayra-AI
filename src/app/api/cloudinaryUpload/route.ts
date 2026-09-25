import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const oldAvatarPubId = formData.get("oldAvatarPublicId") as string | null;

    if (!file) {
      return Response.json(
        { success: false, message: "No file uploaded" },
        { status: 400 },
      );
    }

    if (oldAvatarPubId) await cloudinary.uploader.destroy(oldAvatarPubId);

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "Sayra-AI" }, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve({ secure_url: res?.secure_url, public_id: res?.public_id });
          }
        })
        .end(buffer);
    });

    return Response.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Image Upload failed, Server error" },
      { status: 500 },
    );
  }
}
