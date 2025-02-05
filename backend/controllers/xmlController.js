const fs = require('fs');
const path = require('path');
const parseXML = require('../utils/xmlParser');
const XmlData = require('../models/xmlDataModel');
const dbconnect = require('../config/db');

const uploadReport = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        dbconnect();
        const xmlData = fs.readFileSync(req.file.path, 'utf-8');
        const jsonData = await parseXML(xmlData);
        const inProfile = jsonData.INProfileResponse;

        // Basic Details
        // Applicant details are inside Current_Application → Current_Application_Details → Current_Applicant_Details
        const applicant = inProfile.Current_Application?.Current_Application_Details?.Current_Applicant_Details || {};
        // Construct a full name (adjust as needed)
        const name = [applicant.First_Name, applicant.Middle_Name1, applicant.Last_Name].filter(Boolean).join(" ");
        const mobile = applicant.MobilePhoneNumber || "";
        const pan = applicant.IncomeTaxPan || "";
        const creditScore = inProfile.SCORE?.BureauScore || "";

        // Report Summary
        // Summary info is available in CAIS_Account → CAIS_Summary and Total_Outstanding_Balance
        const caisSummary = inProfile.CAIS_Account?.CAIS_Summary || {};
        const creditAccounts = caisSummary.Credit_Account || {};
        const totalAccounts = creditAccounts.CreditAccountTotal || "";
        const activeAccounts = creditAccounts.CreditAccountActive || "";
        const closedAccounts = creditAccounts.CreditAccountClosed || "";

        const outstanding = caisSummary.Total_Outstanding_Balance || {};
        const currentBalance = outstanding.Outstanding_Balance_All || "";
        const securedAmount = outstanding.Outstanding_Balance_Secured || "";
        const unsecuredAmount = outstanding.Outstanding_Balance_UnSecured || "";

        // Last 7 days credit enquiries are in TotalCAPS_Summary
        const last7DaysEnquiries = inProfile.TotalCAPS_Summary?.TotalCAPSLast7Days || "";

        // Credit Accounts Information
        // Here we assume that each account in CAIS_Account_DETAILS represents a credit account.
        const accounts = inProfile.CAIS_Account?.CAIS_Account_DETAILS || [];
        const creditAccountsInfo = accounts.map(account => {
            // Assumed Account_Type "10" represents a credit card .
            const isCreditCard = account.Account_Type === "10";
            return {
                isCreditCard,
                bank: account.Subscriber_Name || "",
                address: account.CAIS_Holder_Address_Details || {},
                accountNumber: account.Account_Number || "",
                amountOverdue: account.Amount_Past_Due || "",
                currentBalance: account.Current_Balance || ""
            };
        });


        // Prepare the data object matching your schema
        const dataToStore = {
            basicDetails: {
                name,
                mobile,
                pan,
                creditScore,
            },
            reportSummary: {
                totalAccounts,
                activeAccounts,
                closedAccounts,
                currentBalance,
                securedAmount,
                unsecuredAmount,
                last7DaysEnquiries,
            },
            creditAccounts: creditAccountsInfo,
        };

        // Save to the database
        const newReport = new XmlData(dataToStore);
        await newReport.save();

        // Delete the uploaded file
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error("Error deleting the file:", err);
            } else {
                console.log("File deleted successfully");
            }
        });

        res.status(200).json({
            message: 'Report processed and saved successfully',
            data: dataToStore,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReport = async (req, res) => {
    try {
        // Find and delete the latest report in one atomic operation
        const report = await XmlData.findOneAndDelete({}, { sort: { createdAt: -1 } });
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching report', error });
    }
};

module.exports = { uploadReport, getReport };
