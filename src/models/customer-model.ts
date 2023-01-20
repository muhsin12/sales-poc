import mongoose, { Document, Schema } from 'mongoose';

export interface Icustomer {
    customer_id: number;
    customer_name: string;
    address: string;
    contact_person: string;
    mobile: string;
    credit_balance: number;
}

export interface IcustomerModel extends Icustomer, Document {}

const CustomerSchema: Schema = new Schema(
    {
        customer_id: { type: Number },
        customer_name: { type: String },
        address: { type: String },
        contact_person: { type: String },
        mobile: { type: String },
        credit_balance: { type: Number }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IcustomerModel>('customers', CustomerSchema);
