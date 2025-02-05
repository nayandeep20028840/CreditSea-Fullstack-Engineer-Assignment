import { useLocation } from "react-router-dom";

const BasicDetails = () => {
    const { state } = useLocation();
    const report = state?.report || {};

    return (
        <div className="flex justify-center items-center min-h-screen bg-black text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
                <h1 className="text-3xl font-bold mb-5">Basic Details</h1>
                {report.basicDetails ? (
                    <ul className="space-y-3">
                        <li><strong>Name:</strong> {report.basicDetails.name || "N/A"}</li>
                        <li><strong>Mobile:</strong> {report.basicDetails.mobile || "N/A"}</li>
                        <li><strong>PAN:</strong> {report.basicDetails.pan || "N/A"}</li>
                        <li><strong>Credit Score:</strong> {report.basicDetails.creditScore || "N/A"}</li>
                    </ul>
                ) : (
                    <p className="text-red-500">No data available.</p>
                )}
            </div>
        </div>
    );
};

export default BasicDetails;
