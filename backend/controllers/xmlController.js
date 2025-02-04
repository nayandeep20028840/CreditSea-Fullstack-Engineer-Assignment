const fs = require('fs');
const path = require('path');
const XmlData = require('../models/xmlDataModel');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

// Upload XML report and save the parsed data
const uploadReport = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const xml = fs.readFileSync(req.file.path, 'utf-8');

        // Parse the XML data using fast-xml-parser
        const parser = new XMLParser();
        const parsedData = parser.parse(xml);
        console.log('Parsed XML Data:', parsedData);

        // Safely access the root object and handle missing or undefined properties
        const root = parsedData.INProfileResponse || {};
        const currentApplication = root.Current_Application ? root.Current_Application[0] : null;
        const caisAccount = root.CAIS_Account ? root.CAIS_Account[0] : null;
        const scoreDetails = root.SCORE && root.SCORE[0] ? root.SCORE[0] : {};

        if (!currentApplication || !caisAccount) {
            console.log('Missing current application or CAIS account in parsed data:', parsedData);
            return res.status(400).json({ message: 'Invalid XML structure: Missing current application or CAIS account' });
        }

        // Extract basic details from Current_Application_Details
        const currentApplicantDetails = currentApplication.Current_Application_Details
            ? currentApplication.Current_Application_Details[0]?.Current_Applicant_Details[0]
            : {};

        const basicDetails = {
            name: (currentApplicantDetails.First_Name ? currentApplicantDetails.First_Name[0] : '') +
                    ' ' +
                    (currentApplicantDetails.Last_Name ? currentApplicantDetails.Last_Name[0] : ''),
            mobilePhone: currentApplicantDetails.MobilePhoneNumber ? currentApplicantDetails.MobilePhoneNumber[0] : 'Not Available',
            pan: currentApplicantDetails.PAN_Issue_Date ? currentApplicantDetails.PAN_Issue_Date[0] : 'Not Provided',
            creditScore: scoreDetails.BureauScore ? scoreDetails.BureauScore[0] : 'Not Available',
            scoreConfidence: scoreDetails.BureauScoreConfidLevel ? scoreDetails.BureauScoreConfidLevel[0] : 'Not Available',
        };

        // Extract report summary from CAIS_Account
        const reportSummary = {
            totalAccounts: caisAccount.CAIS_Summary && caisAccount.CAIS_Summary[0]?.Credit_Account
                ? parseInt(caisAccount.CAIS_Summary[0].Credit_Account[0]?.CreditAccountTotal[0], 10)
                : 0,
            activeAccounts: caisAccount.CAIS_Summary && caisAccount.CAIS_Summary[0]?.Credit_Account
                ? parseInt(caisAccount.CAIS_Summary[0].Credit_Account[0]?.CreditAccountActive[0], 10)
                : 0,
            closedAccounts: caisAccount.CAIS_Summary && caisAccount.CAIS_Summary[0]?.Credit_Account
                ? parseInt(caisAccount.CAIS_Summary[0].Credit_Account[0]?.CreditAccountClosed[0], 10)
                : 0,
            currentBalanceAmount: caisAccount.CAIS_Summary && caisAccount.CAIS_Summary[0]?.Credit_Account
                ? parseFloat(caisAccount.CAIS_Summary[0].Credit_Account[0]?.CADSuitFiledCurrentBalance[0])
                : 0.0,
        };

        // Extract credit accounts, if available
        const creditAccounts = caisAccount.CreditAccounts && caisAccount.CreditAccounts[0] ? caisAccount.CreditAccounts[0].map(account => ({
                creditCard: account.CreditCard ? account.CreditCard[0] : 'Not Available',
                bankOfCreditCard: account.BankOfCreditCard ? account.BankOfCreditCard[0] : 'Not Available',
                address: account.Address ? account.Address[0] : 'Not Available',
                accountNumber: account.AccountNumber ? account.AccountNumber[0] : 'Not Available',
                amountOverdue: account.AmountOverdue ? parseFloat(account.AmountOverdue[0]) : 0.0,
                currentBalance: account.CurrentBalance ? parseFloat(account.CurrentBalance[0]) : 0.0,
            })) : [];

        // Log the final details before saving
        console.log('Basic Details:', basicDetails);
        console.log('Report Summary:', reportSummary);
        console.log('Credit Accounts:', creditAccounts);

        // Create and save the new XmlData document
        const newReport = new XmlData({
            basicDetails,
            reportSummary,
            creditAccounts,
        });

        // Uncomment the line below to save the data in the database
        // await newReport.save();

        res.status(200).json({ message: 'Report uploaded and saved successfully', data: newReport });
    } catch (error) {
        console.error('Error parsing XML:', error);
        res.status(500).json({ message: 'Error parsing XML file', error: error.message });
    } finally {
        fs.unlinkSync(req.file.path);  // Delete the file after processing
    }
};

// Fetch the latest report from the database
const getReport = async (req, res) => {
    try {
        const report = await XmlData.findOne().sort({ createdAt: -1 });  // Get the latest report
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching report', error });
    }
};

module.exports = { uploadReport, getReport };
