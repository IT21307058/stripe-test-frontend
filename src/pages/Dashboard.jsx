import React from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center text-3xl font-bold text-gray-700 mb-8">
        Course Content Manager
      </h1>
      <FileUpload />
      <FileList />
    </div>
  );
}
