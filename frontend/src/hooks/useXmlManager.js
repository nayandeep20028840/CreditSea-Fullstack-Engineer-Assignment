import { useState } from "react";
import axios from "axios";

const useXmlManager = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [report, setReport] = useState(null);

    // Handle file selection and validation
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            if (file.type === "application/xml" || fileName.endsWith(".xml")) {
                setSelectedFile(file);
            } else {
                alert("Please select a valid XML file.");
                setSelectedFile(null);
            }
        }
    };

    // Upload the selected XML file to the backend
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("No file selected. Please choose an XML file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("/api/files/upload", formData,{
                    method: 'POST', // Ensure this is POST
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            alert("File uploaded successfully!");
            console.log("Upload response:", response.data);
            
            setSelectedFile(null); // Clear the file after a successful upload
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file. " + (error.response?.data?.message || error.message));
        }
    };

    // Fetch the latest report from the backend
    const handleFetchReport = async () => {
        try {
            const response = await axios.get("/api/files/data", {
                // method: 'GET', // Ensure this is GET
            });
            setReport(response.data);
            alert("Data Extracted successfully!");
        } catch (error) {
            console.error("Error fetching report:", error);
            alert("Error fetching report.");
        }
    };
    return {
        selectedFile,
        report,
        handleFileChange,
        handleUpload,
        handleFetchReport,
    };
};

export default useXmlManager;
