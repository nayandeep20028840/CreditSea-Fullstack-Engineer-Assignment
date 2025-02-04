import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch the stored report data from the backend
    const fetchReportData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/get-report');
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching report data', error);
      }
    };

    fetchReportData();
  }, []);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  const { basicDetails, reportSummary, creditAccounts } = reportData;

  return (
    <div className="App">
      <h1>Credit Report</h1>

      <section className="basic-details">
        <h2>Basic Details</h2>
        <ul>
          <li><strong>Name:</strong> {basicDetails.name}</li>
          <li><strong>Mobile Phone:</strong> {basicDetails.mobilePhone}</li>
          <li><strong>PAN:</strong> {basicDetails.pan}</li>
          <li><strong>Credit Score:</strong> {basicDetails.creditScore}</li>
        </ul>
      </section>

      <section className="report-summary">
        <h2>Report Summary</h2>
        <ul>
          <li><strong>Total Accounts:</strong> {reportSummary.totalAccounts}</li>
          <li><strong>Active Accounts:</strong> {reportSummary.activeAccounts}</li>
          <li><strong>Closed Accounts:</strong> {reportSummary.closedAccounts}</li>
          <li><strong>Current Balance Amount:</strong> {reportSummary.currentBalanceAmount}</li>
          <li><strong>Secured Accounts Amount:</strong> {reportSummary.securedAccountsAmount}</li>
          <li><strong>Unsecured Accounts Amount:</strong> {reportSummary.unsecuredAccountsAmount}</li>
          <li><strong>Last 7 Days Credit Enquiries:</strong> {reportSummary.last7DaysCreditEnquiries}</li>
        </ul>
      </section>

      <section className="credit-accounts">
        <h2>Credit Accounts Information</h2>
        <ul>
          {creditAccounts.map((account, index) => (
            <li key={index}>
              <strong>Credit Card:</strong> {account.creditCard}<br />
              <strong>Bank of Credit Card:</strong> {account.bankOfCreditCard}<br />
              <strong>Address:</strong> {account.address}<br />
              <strong>Account Number:</strong> {account.accountNumber}<br />
              <strong>Amount Overdue:</strong> {account.amountOverdue}<br />
              <strong>Current Balance:</strong> {account.currentBalance}<br />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
