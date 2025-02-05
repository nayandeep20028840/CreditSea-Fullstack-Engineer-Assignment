// /tests/hooks/useReportData.test.js

import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import useReportData from '../../src/hooks/useReportData';

const mock = new MockAdapter(axios);

test('fetches and displays the report data', async () => {
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

    mock.onGet('http://localhost:3000/api/files/data').reply(200, mockData);

    render(<YourComponentUsingTheHook />);

    await waitFor(() => screen.getByText('John Doe'));

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
    expect(screen.getByText(/750/i)).toBeInTheDocument();
});
