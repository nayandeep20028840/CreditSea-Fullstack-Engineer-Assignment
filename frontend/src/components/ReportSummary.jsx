import { useLocation } from "react-router-dom";

const ReportSummary = () => {
    const { state } = useLocation();
    const report = state?.report || {};

    return (
        <div className="flex justify-center items-center min-h-screen bg-black text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
                <h1 className="text-3xl font-bold mb-5">Report Summary</h1>
                {report.reportSummary ? (
                    <ul className="space-y-3">
                        <li><strong>Total Accounts:</strong> {report.reportSummary.totalAccounts || "N/A"}</li>
                        <li><strong>Active Accounts:</strong> {report.reportSummary.activeAccounts || "N/A"}</li>
                        <li><strong>Closed Accounts:</strong> {report.reportSummary.closedAccounts || "N/A"}</li>
                        <li><strong>Current Balance:</strong> ${report.reportSummary.currentBalance || "0.00"}</li>
                        <li><strong>Secured Accounts Amount:</strong> ${report.reportSummary.securedAccountsAmount || "0.00"}</li>
                        <li><strong>Unsecured Accounts Amount:</strong> ${report.reportSummary.unsecuredAccountsAmount || "0.00"}</li>
                        <li><strong>Last 7 Days Credit Enquiries:</strong> {report.reportSummary.last7DaysCreditEnquiries || "0"}</li>
                    </ul>
                ) : (
                    <p className="text-red-500">No data available.</p>
                )}
            </div>
        </div>
    );
};

export default ReportSummary;
