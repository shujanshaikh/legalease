"use client";

import axios from "axios";
import { BACKEND_URL, CLOUDFLARE } from "../../../config";
import { useState } from "react";

export function Upload({ onUpload }: { onUpload: (URL: string) => void }) {
  const [uploadStatus, setUploadStatus] = useState("Upload File");
  const [isUploading, setIsUploading] = useState(false); // State to track upload progress

  const handleFileUpload = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in first.");
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";

    input.onchange = async () => {
      const file = input.files?.[0]; 
      if (!file) {
        alert("Please select a file.");
        return;
      }

      try {
        setIsUploading(true); 
        setUploadStatus("Uploading...");

        const preSignedUrlResponse = await axios.get(`${BACKEND_URL}/pre-signedUrl`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { url, key } = preSignedUrlResponse.data;
        await axios.put(url, file, {
          headers: {
            "Content-Type": "application/pdf",
          },
        });

        const fileUrl = `${CLOUDFLARE}/${key}`;
        console.log("Uploaded file URL:", fileUrl);
        onUpload(fileUrl);
      } catch (error) {
        setUploadStatus("File upload failed. Try again.");
      } finally {
        setIsUploading(false); 
      }
    };

    input.click();
  };

  return (
    <>
      <button
        className="px-6 py-4 rounded-lg text-lg sm:text-xl bg-accent text-dark hover:scale-110 transition-transform duration-200"
        onClick={handleFileUpload}
        disabled={isUploading} // Disable button while uploading
      >
        {isUploading ? (
          <div className="flex items-center space-x-2">
            <span>Uploading...</span>
            <svg
              className="animate-spin h-5 w-5 text-dark"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : (
          uploadStatus
        )}
      </button>
    </>
  );
}