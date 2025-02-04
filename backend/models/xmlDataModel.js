const mongoose = require('mongoose');

const xmlDataSchema = new mongoose.Schema({
    basicDetails: {
        name: String,
        mobilePhone: String,
        pan: String,
        creditScore: String,
    },
    reportSummary: {
        totalAccounts: Number,
        activeAccounts: Number,
        closedAccounts: Number,
        currentBalanceAmount: Number,
        securedAccountsAmount: Number,
        unsecuredAccountsAmount: Number,
        last7DaysCreditEnquiries: Number,
    },
    creditAccounts: [
        {
            creditCard: String,
            bankOfCreditCard: String,
            address: String,
            accountNumber: String,
            amountOverdue: Number,
            currentBalance: Number,
        },
    ],
});

const XmlData = mongoose.model('XmlData', xmlDataSchema);

module.exports = XmlData;
