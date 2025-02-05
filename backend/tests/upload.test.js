const { connect, disconnect } = require('../config/db');
const request = require('supertest');
const path = require('path');
const app = require('../index'); 

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await disconnect();
});

describe('POST /upload', () => {
    it('should upload an XML file and save the data to MongoDB', async () => {
        const filePath = path.join(__dirname, 'sample.xml');
        const response = await request(app)
            .post('/api/files/upload')
            .attach('file', filePath);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Data saved successfully');
    });

    it('should return an error when no file is uploaded', async () => {
        const response = await request(app).post('/api/files/upload');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('No file uploaded');
    });

    it('should return an error for invalid file type', async () => {
        const filePath = path.join(__dirname, 'sample.txt'); // Use a text file
        const response = await request(app)
            .post('/api/files/upload')
            .attach('file', filePath);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid file type. Only XML files are allowed.');
    });
});
