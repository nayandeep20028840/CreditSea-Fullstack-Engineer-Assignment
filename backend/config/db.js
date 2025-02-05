require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increase this value if necessary
        });
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;






// During Testing

/*


const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connect = async () => {
    if (process.env.NODE_ENV === 'test') {
        // Create an in-memory MongoDB instance for testing
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("In-memory MongoDB Connected Successfully for testing!");
        } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
        }
    } else {
        // Normal database connection for production or development
        await mongoose.connect('mongodb+srv://nayandoesdev02:I5SaIjCifrACzOOd@creditsea-test.c6w6j.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("MongoDB Connected Successfully!");
    }
    };

    const disconnect = async () => {
    if (process.env.NODE_ENV === 'test') {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
        console.log('In-memory MongoDB disconnected and cleaned up.');
    } else {
        await mongoose.connection.close();
        console.log('MongoDB disconnected.');
    }
};

module.exports = { connect, disconnect };


*/
