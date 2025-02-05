import { useNavigate } from "react-router-dom";
import useXmlManager from "../hooks/useXmlManager";

const Home = () => {
    const navigate = useNavigate();
    const { selectedFile, report, handleFileChange, handleUpload, handleFetchReport } = useXmlManager();
    console.log("Report:", report);
    return (
        <div className="p-5 text-center text-white bg-black min-h-screen">
            <h1 className="text-3xl font-bold mb-8">XML File Upload</h1>

            {/* File Upload Section */}
            <div className="my-4">
                <input
                    type="file"
                    accept=".xml"
                    onChange={handleFileChange}
                    className="my-2 p-2 rounded border border-gray-600 bg-gray-700 text-white"
                />
                <button
                    onClick={handleUpload}
                    className="py-2 px-4 mx-2 rounded bg-blue-500 text-white text-sm font-bold"
                >
                    Upload XML File
                </button>
            </div>

            {/* Fetch Extracted Data */}
            <div className="mt-5">
                <button
                    onClick={() => {
                        handleFetchReport(); // Fetch latest report
                    }}
                    className="py-2 px-4 mx-1 rounded bg-blue-500 text-white text-sm font-bold"
                >
                    Extract Data
                </button>
            </div>
            <div className="mt-5">
                <button
                    onClick={() => {
                        navigate("/data-extraction", { state: { report } }); // Navigate to extracted data
                    }}
                    className="py-2 px-4 mx-1 rounded bg-green-500 text-white text-sm font-bold"
                >
                    View Extracted Data
                </button>
            </div>
        </div>
    );
};

export default Home;
