import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import customers from '../models/customer-model';

const createCustomer = (req: Request, res: Response, next: NextFunction) => {
    const { customer_id, customer_name, address, contact_person, mobile, credit_balance } = req.body;

    const customer = new customers({
        _id: new mongoose.Types.ObjectId(),
        customer_id,
        customer_name,
        address,
        contact_person,
        mobile,
        credit_balance
    });

    return customer
        .save()
        .then((customer) => res.status(201).json({ customer }))
        .catch((error) => res.status(500).json({ error }));
};

const readCustomer = (req: Request, res: Response, next: NextFunction) => {
    const customer_id = req.params.customerId;
    return customers
        .findById(customer_id)
        .then((customer) =>
            customer ? res.status(200).json({ customer }) : res.status(400).json({ message: 'customer not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const readAllCustomer = (req: Request, res: Response, next: NextFunction) => {
    return customers
        .find()
        .then((customers) => res.status(200).json({ customers }))
        .catch((error) => res.status(500).json({ error }));
};

const updateCustomer = (req: Request, res: Response, next: NextFunction) => {
    const customer_id = req.params.customerId;
    return customers
        .findById(customer_id)
        .then((customer) => {
            if (customer) {
                customer.set(req.body);
                return customer
                    .save()
                    .then((customer) => res.status(201).json({ customer }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(400).json({ message: 'customer not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteCustomer = (req: Request, res: Response, next: NextFunction) => {
    const customer_id = req.params.customerId;
    return customers
        .findByIdAndDelete(customer_id)
        .then((customer) =>
            customer
                ? res.status(201).json({ message: 'customer deleted' })
                : res.status(400).json({ message: 'customer not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { createCustomer, readCustomer, readAllCustomer, updateCustomer, deleteCustomer };
