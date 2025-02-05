import React, { useState } from "react";

const XmlManagerUI = ({
  selectedFile,
  report,
  handleFileChange,
  handleUpload,
  handleFetchReport,
}) => {
  // Local state to control which sections are visible
  const [showBasicDetails, setShowBasicDetails] = useState(true);
  const [showReportSummary, setShowReportSummary] = useState(true);
  const [showCreditAccounts, setShowCreditAccounts] = useState(true);

  // Utility function to merge address parts
  const mergeAddress = (address) => {
    if (!address) return "";
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

  return (
    <div className="p-5 text-center text-white bg-black min-h-screen font-sans">
      {/* Show the upload UI only if no report has been loaded */}
      {!report && (
        <>
          <h1 className="text-3xl font-bold mb-8">
            XML Report Uploader and Viewer
          </h1>
          <div className="my-2">
            <input
              type="file"
              accept=".xml"
              onChange={handleFileChange}
              className="my-2 p-2 rounded border border-gray-600 bg-gray-700 text-white"
            />
            <button
              onClick={handleUpload}
              className="py-2 px-4 mx-1 rounded bg-blue-500 text-white text-sm font-bold"
            >
              Upload XML File
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={handleFetchReport}
              className="py-2 px-4 mx-1 rounded bg-blue-500 text-white text-sm font-bold"
            >
              View Latest Report
            </button>
          </div>
        </>
      )}

      {/* Show the report details when available */}
      {report && (
        <div className="mt-5">
          <h2 className="text-2xl font-bold mb-4">Latest Report</h2>

          {/* Toggle Buttons */}
          <div className="mb-5 flex justify-center gap-2">
            <button
              onClick={() => setShowBasicDetails(!showBasicDetails)}
              className="py-2 px-4 rounded bg-gray-800 text-white text-sm font-bold"
            >
              {showBasicDetails ? "Hide" : "Show"} Basic Details
            </button>
            <button
              onClick={() => setShowReportSummary(!showReportSummary)}
              className="py-2 px-4 rounded bg-gray-800 text-white text-sm font-bold"
            >
              {showReportSummary ? "Hide" : "Show"} Report Summary
            </button>
            <button
              onClick={() => setShowCreditAccounts(!showCreditAccounts)}
              className="py-2 px-4 rounded bg-gray-800 text-white text-sm font-bold"
            >
              {showCreditAccounts ? "Hide" : "Show"} Credit Accounts Info
            </button>
          </div>

          {/* Basic Details Section */}
          {showBasicDetails && (
            <section className="p-5 rounded my-5 text-left bg-gray-800 border border-gray-600 max-w-3xl mx-auto">
              <h3 className="mb-2 text-xl font-semibold">Basic Details</h3>
              <ul className="list-none pl-0">
                <li>
                  <strong>Name:</strong> {report.basicDetails.name}
                </li>
                <li>
                  <strong>Mobile Phone:</strong> {report.basicDetails.mobile}
                </li>
                <li>
                  <strong>PAN:</strong>{" "}
                  {report.basicDetails.pan ? report.basicDetails.pan : "N/A"}
                </li>
                <li>
                  <strong>Credit Score:</strong>{" "}
                  {report.basicDetails.creditScore}
                </li>
              </ul>
            </section>
          )}

          {/* Report Summary Section */}
          {showReportSummary && (
            <section className="p-5 rounded my-5 text-left bg-gray-800 border border-gray-600 max-w-3xl mx-auto">
              <h3 className="mb-2 text-xl font-semibold">Report Summary</h3>
              <ul className="list-none pl-0">
                <li>
                  <strong>Total Number of Accounts:</strong>{" "}
                  {report.reportSummary.totalAccounts}
                </li>
                <li>
                  <strong>Active Accounts:</strong>{" "}
                  {report.reportSummary.activeAccounts}
                </li>
                <li>
                  <strong>Closed Accounts:</strong>{" "}
                  {report.reportSummary.closedAccounts}
                </li>
                <li>
                  <strong>Current Balance Amount:</strong>{" "}
                  {report.reportSummary.currentBalance}
                </li>
                <li>
                  <strong>Secured Accounts Amount:</strong>{" "}
                  {report.reportSummary.securedAmount}
                </li>
                <li>
                  <strong>Unsecured Accounts Amount:</strong>{" "}
                  {report.reportSummary.unsecuredAmount}
                </li>
                <li>
                  <strong>Last 7 Days Credit Enquiries:</strong>{" "}
                  {report.reportSummary.last7DaysEnquiries}
                </li>
              </ul>
            </section>
          )}

          {/* Credit Accounts Information Section */}
          {showCreditAccounts && (
            <section className="p-5 rounded my-5 text-left bg-gray-800 border border-gray-600 max-w-3xl mx-auto">
              <h3 className="mb-2 text-xl font-semibold">
                Credit Accounts Information
              </h3>
              {report.creditAccounts && report.creditAccounts.length > 0 ? (
                report.creditAccounts.map((account, index) => (
                  <div
                    key={account._id || index}
                    className="p-4 mb-2 rounded bg-gray-700 border border-gray-600"
                  >
                    <p>
                      <strong>Type:</strong>{" "}
                      {account.isCreditCard ? "Credit Card" : "Other"}
                    </p>
                    <p>
                      <strong>Bank:</strong> {account.bank}
                    </p>
                    <p>
                      <strong>Account Number:</strong> {account.accountNumber}
                    </p>
                    <p>
                      <strong>Amount Overdue:</strong> {account.amountOverdue}
                    </p>
                    <p>
                      <strong>Current Balance:</strong> {account.currentBalance}
                    </p>
                    <p>
                      <strong>Address:</strong> {mergeAddress(account.address)}
                    </p>
                  </div>
                ))
              ) : (
                <p>No credit account information available.</p>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default XmlManagerUI;
