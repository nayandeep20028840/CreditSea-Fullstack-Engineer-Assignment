import { useLocation } from "react-router-dom";

// Utility function to merge address parts
const mergeAddress = (address) => {
    if (!address) return "N/A";
    const parts = [
        address.First_Line_Of_Address_non_normalized,
        address.Second_Line_Of_Address_non_normalized,
        address.Third_Line_Of_Address_non_normalized,
    ]
        .filter((line) => line && line.trim() !== "")
        .join(", ");
    const postal = address.ZIP_Postal_Code_non_normalized;
    return parts + (postal ? `, ${postal}` : "");
};

const CreditAccounts = () => {
    const { state } = useLocation();
    const report = state?.report || {};

    return (
        <div className="flex justify-center items-center min-h-screen bg-black text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full text-center">
                <h1 className="text-3xl font-bold mb-5">Credit Accounts</h1>
                {report.creditAccounts && report.creditAccounts.length > 0 ? (
                    <div className="space-y-4">
                        {report.creditAccounts.map((account, index) => (
                            <div key={index} className="p-4 bg-gray-700 rounded-lg shadow-md">
                                <p><strong>Credit Card:</strong> {account.creditCard || "N/A"}</p>
                                <p><strong>Bank:</strong> {account.bank || "N/A"}</p>
                                <p><strong>Account Number:</strong> {account.accountNumber || "N/A"}</p>
                                <p><strong>Amount Overdue:</strong> {account.amountOverdue || "N/A"}</p>
                                <p><strong>Current Balance:</strong> {account.currentBalance || "N/A"}</p>
                                <p><strong>Address:</strong> {mergeAddress(account.address)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-red-500">No credit accounts available.</p>
                )}
            </div>
        </div>
    );
};

export default CreditAccounts;
