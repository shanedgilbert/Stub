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

//Not yet properly updated edit: updated following fill stack mern tutorial
export const updateList = async (req, res) => {
    const { id: _id } = req.params;
    const { name, shows } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    if (shows == null)
    {
        shows = {};
    }
    const updatedShow = { name, shows };
    const newNameList = await ListContent.findByIdAndUpdate(_id, updatedShow, { new: true });

    res.json(newNameList);
}

export const deleteList = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    //mongoose.set('useFindAndModify', false);
    //await ListContent.findByIdAndRemove(id);
    await ListContent.findByIdAndDelete(id);

    res.json({ message: "Show deleted successfully." });
}

export const addListShow = async (req, res) => {
    console.log("CONTROLLERS LISTS.JS: " + req.params);
    const { id } = req.params;
    const { name, newShows } = req.body;

    mongoose.set('useFindAndModify', false);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await ListContent.findByIdAndUpdate(id, {shows: newShows})

    res.json({ message: "Show added successfully"});
}
//export const removeListShow
//export const editListName

export default router;