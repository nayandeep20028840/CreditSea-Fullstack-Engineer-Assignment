// /tests/integration/upload.test.js
const request = require('supertest');
const app = require('../../src/index');  // Path to your Express app
const fs = require('fs');
const path = require('path');

// Test to simulate uploading a valid XML file
describe('POST /api/files/upload', () => {

    it('should upload an XML file and save the data to MongoDB', async () => {
        const filePath = path.join(__dirname, 'sample.xml'); // Add a sample XML file for testing

        const response = await request(app)
            .post('/api/files/upload')  // Endpoint to handle the file upload
            .attach('file', filePath);  // 'file' is the form field name

        expect(response.status).toBe(201);  // Expect a successful upload (201 Created)
        expect(response.body.message).toBe('File uploaded successfully');
        // You can add additional checks to verify that the data was saved in MongoDB
    });

    it('should return an error when no file is uploaded', async () => {
        const response = await request(app)
            .post('/api/files/upload')
            .send(); // Send no data

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('No file uploaded');
    });

    it('should return an error for invalid file type', async () => {
        const invalidFilePath = path.join(__dirname, 'sample.txt'); // Add an invalid file (not XML)

        const response = await request(app)
            .post('/api/files/upload')
            .attach('file', invalidFilePath);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid file type. Only XML files are allowed.');
    });

    afterAll(() => {
        // Clean up any resources after tests (if needed)
        // For example, you might want to delete the uploaded file if you save it somewhere
        // fs.unlinkSync(path.join(__dirname, 'sample.xml')); // Delete the file after tests
    });
});
