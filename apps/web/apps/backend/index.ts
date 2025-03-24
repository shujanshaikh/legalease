import express, { Router } from "express";
import { S3Client } from "bun";
import cors from "cors";
import { authRouter } from "./routes/v1/auth";
import { chatRouter } from "./routes/v1/chat";
import { pdfRouter } from "./routes/v1/pdf";



const app = express();
app.use(express.json());
app.use(cors());

app.use("/" , authRouter)
app.use("/" , chatRouter)
app.use("/" , pdfRouter)

const client = new S3Client({
    region: "auto",
    //endpoint: `https://r2.cloudflarestorage.com`,
    endpoint: `https://${Bun.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    accessKeyId: Bun.env.S3_ACCESS_KEY,
    secretAccessKey: Bun.env.S3_SECRET_KEY,
    bucket: Bun.env.BUCKET_NAME,
});


app.options("/pre-signedUrl", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    res.sendStatus(200);
});

app.get("/pre-signedUrl", async (req, res) => {
    const key = `models/${Date.now()}_${Math.random()}.pdf`;

    try {
        console.log("Generating presigned URL for:", {
            bucket: Bun.env.BUCKET_NAME,
            key,
            endpoint: `https://${Bun.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
        });

        const url = client.presign(key, {
            method: "PUT",
            bucket: "test",
            expiresIn: 60 * 5,
            type: "application/pdf",
        });

        console.log("Generated URL:", url);
        res.json({ url, key, message: "File Uploaded" });
    } catch (error: any) {
        console.error("Full error:", error);
        res.status(500).json(
            { error: error?.message || "Internal Server Error" });
    }
});

app.listen(8000, (() => { console.log("Running on port 8000") }))