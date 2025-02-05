import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const ExtractedData = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const report = location.state?.report || null;

    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="p-5 text-center text-white bg-black min-h-screen">
            <h1 className="text-3xl font-bold mb-5">Extracted Data</h1>

            {/* Show "View Data Categories" button */}
            {!showOptions ? (
                <button
                    onClick={() => setShowOptions(true)}
                    className="py-2 px-4 rounded bg-yellow-500 text-white text-lg font-bold"
                >
                    View Data Categories
                </button>
            ) : (
                // Show the 3 buttons when clicked
                <div className="flex flex-col gap-4 items-center mt-5">
                    <button
                        onClick={() => navigate("/basic-details", { state: { report } })}
                        className="py-2 px-4 rounded bg-blue-500 text-white text-lg font-bold"
                    >
                        View Basic Details
                    </button>

                    <button
                        onClick={() => navigate("/report-summary", { state: { report } })}
                        className="py-2 px-4 rounded bg-green-500 text-white text-lg font-bold"
                    >
                        View Report Summary
                    </button>

                    <button
                        onClick={() => navigate("/credit-accounts", { state: { report } })}
                        className="py-2 px-4 rounded bg-red-500 text-white text-lg font-bold"
                    >
                        View Credit Accounts
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExtractedData;
