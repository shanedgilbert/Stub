import express from 'express';
import mongoose from 'mongoose';

import AccountContent from '../models/accountContent.js';

const router = express.Router();

export const getAccounts = async (req, res) => 
{ 
    try 
    {
        const accountContent = await AccountContent.find(); 
        console.log(accountContent);
        res.status(200).json(accountContent);
    } 
    catch (error) 
    {
        res.status(404).json({ message: error.message });
    }
}


export const createAccount = async (req, res) => {
    const id  = req.body.id;
    const name = req.body.name;

    const newAccountContent = new AccountContent({ id, name })

    try 
    {
        await newAccountContent.save();
        res.status(201).json(newAccountContent);
    } 
    catch (error) 
    {
        res.status(409).json({ message: error.message });
    }
}



export default router;