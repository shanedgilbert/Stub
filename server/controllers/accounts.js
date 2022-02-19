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
    const lastLoggedIn = (new Date()).toString();
    
 
    const foundUser = await AccountContent.findOne({ id: id }); //find account where database entry's id == id that is being created
    if (foundUser) //if there is an account matching the id, update lastLoggedIn field
    {
        try 
        {
            await AccountContent.updateOne({ id: id }, //update where database entry's id == id that is being created
            {
                $set: 
                {
                    lastLoggedIn : lastLoggedIn
                }
            })
        } 
        catch (err) 
        {
                console.log(err)
        }
    }
    else //if no account is found, create a new entry in database with new account
    {
        try 
        {
            const newAccountContent = new AccountContent({id, name, lastLoggedIn})
            await newAccountContent.save();
            res.status(201).json(newAccountContent);
        } 
        catch (error) 
        {
            res.status(409).json({ message: error.message });
        }
    }
}



export default router;