// models/xmlDataModel.js
const mongoose = require('mongoose');

const xmlDataSchema = new mongoose.Schema({
    basicDetails: {
        name: { type: String, default: '' },
        mobile: { type: String, default: '' },
        pan: { type: String, default: '' },
        creditScore: { type: String, default: '' },
    },
    reportSummary: {
        totalAccounts: { type: String, default: '' },
        activeAccounts: { type: String, default: '' },
        closedAccounts: { type: String, default: '' },
        currentBalance: { type: String, default: '' },
        securedAmount: { type: String, default: '' },
        unsecuredAmount: { type: String, default: '' },
        last7DaysEnquiries: { type: String, default: '' },
    },
    creditAccounts: [
        {
            isCreditCard: { type: Boolean, default: false },
            bank: { type: String, default: '' },
            address: { type: mongoose.Schema.Types.Mixed, default: {} },
            accountNumber: { type: String, default: '' },
            amountOverdue: { type: String, default: '' },
            currentBalance: { type: String, default: '' },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('XmlData', xmlDataSchema);
