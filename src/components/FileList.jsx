import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles, deleteFile, downloadFile } from "../features/files/fileThunks";

export default function FileList() {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.files);

    useEffect(() => {
        dispatch(fetchFiles());
    }, [dispatch]);

    if (loading) return <p className="text-center">Loading files...</p>;

    return (
        <div className="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Uploaded Files</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-4">File Name</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Size (KB)</th>
                        <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((file) => (
                        console.log("ddddd", file.id),
                        <tr key={file.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{file.fileName}</td>
                            <td className="py-3 px-4">{file.fileType}</td>
                            <td className="py-3 px-4">{(file.fileSize / 1024).toFixed(1)}</td>
                            <td className="py-3 px-4 text-center">
                                <button
                                    onClick={() => dispatch(downloadFile(file.id))}
                                    className="text-green-500 mr-3 hover:text-blue-700"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => dispatch(deleteFile(file.id))}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {list.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">
                                No files uploaded yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
