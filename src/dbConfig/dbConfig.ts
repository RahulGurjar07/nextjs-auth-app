import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to MongoDB')
        })

        connection.on('error', (err) => {
            console.log('Error connecting to MongoDB please make sure db is up and running: '+ err);
            process.exit()

        })
    }

    catch (err) {
        console.log('something went wrong in connectiong to DB');
        console.log(err);
        
    }
}