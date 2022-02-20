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
        res.status(404).json({ message: 'SERVER/CONTROLLERS/LISTS GETLIST(): ' + error.message });
    }
}

export const createList = async (req, res) => {
    const { name, shows } = req.body;

    const newListContent = new ListContent({ name, shows })

    try {
        await newListContent.save();

        res.status(201).json(newListContent );
    } catch (error) {
        res.status(409).json({ message: 'SERVER/CONTROLLERS/LISTS CREATELISTS(): ' + error.message });
    }
}

//Not yet properly updated
export const updateList = async (req, res) => {
    const { id } = req.params;
    const { name, shows } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedShow = { name, shows };

    await ListContent.findByIdAndUpdate(id, updatedShow, { new: true });

    res.json(updatedShow);
}

//Not yet properly updated
export const deleteList = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await ListContent.findByIdAndRemove(id);

    res.json({ message: "Show deleted successfully." });
}

//export const addListShow
//export const removeListShow
//export const editListName

export default router;