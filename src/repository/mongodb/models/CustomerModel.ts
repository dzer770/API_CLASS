import mongoose from 'mongoose';


export const CustomerSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: { type: String, required: true, unique: true },
});

export const CustomerModel = mongoose.model('Customers', CustomerSchema);