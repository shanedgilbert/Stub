import e from 'express';
import express from 'express';
import mongoose from 'mongoose';

import ListContent from '../models/listContent.js';

const router = express.Router();

export const getLists = async (req, res) => { 
    try {
        const listContent = await ListContent.find();
                
        res.status(200).json(listContent);
    } catch (error) {
        res.status(404).json({ message: 'SERVER/CONTROLLERS/LISTS GETLISTS(): ' + error.message });
    }
}

export const getList = async (req, res) => { 
    const { id } = req.params;

    try {
        const show = await ListContent.findById(id);
        
        res.status(200).json(show);
    } catch (error) {
        res.status(404).json({ message: 'SERVER/CONTROLLERS/LIST GETLIST(): ' + error.message });
    }
}

export const createList = async (req, res) => {
    const { name, ownerID, shows } = req.body;

    const newListContent = new ListContent({ name, ownerID, shows,})

    try {
        console.log('List Content ID:' + newListContent.ownerID);
        await newListContent.save();

        res.status(201).json(newListContent );
    } catch (error) {
        res.status(409).json({ message: 'SERVER/CONTROLLERS/LISTS CREATELISTS(): ' + error.message });
    }
}

//updateList deals with changes inside list
export const updateList = async (req, res) => {
    try {
        const listContent = await ListContent.find();
                
        res.status(200).json(listContent);
    } catch (error) {
        res.status(404).json({ message: 'SERVER/CONTROLLERS/LISTS GETLISTS(): ' + error.message });
    }
}
//editListName here deals with changing the name of the list
//find where i can use this to update the 
//
export const editListName = async (req, res) => {
    const { id: _id } = req.params;
    const { name, shows, ownerID } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        console.log("Server controller List name: "+ name);
        const listObj = await ListContent.findByIdAndUpdate(id, {name : name});
        await listObj.save();
        res.status(200).json(listObj);  

    } catch (error) {
        res.status(404).json({message: 'SERVER/CONTROLLERS/LISTS EDITLISTNAME() '+ error.message});
    }
    console.log("just to see what req looks like"+ req);
}

//Not yet properly updated
export const deleteList = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    //mongoose.set('useFindAndModify', false);
    //await ListContent.findByIdAndRemove(id);
    await ListContent.findByIdAndDelete(id);

    res.json({ message: "Show deleted successfully." });
}

export const addListShow = async (req, res) => {
    const { id } = req.params;
    const newList = req.body;

    mongoose.set('useFindAndModify', false);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await ListContent.findByIdAndUpdate(id, newList);
    res.json({ message: "Show added successfully"});
}

export default router;