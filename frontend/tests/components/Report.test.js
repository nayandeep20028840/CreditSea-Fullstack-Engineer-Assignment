import { render, screen } from '@testing-library/react';
import Report from './Report';

const mockData = {
    basicDetails: {
        name: 'John Doe',
        mobile: '1234567890',
        pan: 'ABCDE1234F',
        creditScore: '750',
    },
    reportSummary: {
        totalAccounts: '5',
        activeAccounts: '3',
        closedAccounts: '2',
        currentBalance: '10000',
        securedAmount: '5000',
        unsecuredAmount: '5000',
        last7DaysEnquiries: '1',
    },
};

test('renders the report with basic details', () => {
    render(<Report data={mockData} />);

    // Check if the name is displayed
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    // Check if the mobile is displayed
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
    // Check if the credit score is displayed
    expect(screen.getByText(/750/i)).toBeInTheDocument();
});

test('shows loading when no data is provided', () => {
    render(<Report data={null} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
