import React from 'react';

const Report = ({ data }) => {
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h2>Basic Details</h2>
            <p>Name: {data.basicDetails.name}</p>
            <p>Mobile: {data.basicDetails.mobile}</p>
            <p>PAN: {data.basicDetails.pan}</p>
            <p>Credit Score: {data.basicDetails.creditScore}</p>

            <h2>Report Summary</h2>
            <p>Total Accounts: {data.reportSummary.totalAccounts}</p>
            {/* Add more fields here as per your data structure */}
        </div>
    );
};

export default Report;
