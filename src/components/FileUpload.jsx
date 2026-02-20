import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../features/files/fileThunks";
import ProgressBar from "./ProgressBar";

export default function FileUpload() {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const { loading, error } = useSelector((state) => state.files);

    const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

    const handleUpload = () => {
        if (!selectedFile) {
            alert("Select a file first!");
            return;
        }
        const validTypes = [
            "application/pdf",
            "image/png",
            "image/jpeg",
            "video/mp4",
        ];
        if (!validTypes.includes(selectedFile.type)) {
            alert("Only PDF, JPG, PNG, or MP4 allowed!");
            return;
        }
        dispatch(uploadFile(selectedFile));
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Upload File</h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4 w-full text-gray-600"
            />
            <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
            >
                {loading ? "Uploading..." : "Upload"}
            </button>
            {loading && <ProgressBar progress={70} />} {/* Example progress */}
            {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>
    );
}
