import express from 'express';
import mongoose from 'mongoose';

import ShowContent from '../models/showContent.js';

const router = express.Router();

export const getShows = async (req, res) => { 
    try {
        const showContent = await ShowContent.find();
                
        res.status(200).json(showContent);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getShow = async (req, res) => { 
    const { id } = req.params;

    try {
        const show = await ShowContent.findById(id);
        
        res.status(200).json(show);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createShow = async (req, res) => 
{
    console.log(3);
    const imdbID = req.body.imdbID;
    try
    {
        const foundShow = await ShowContent.findOne({ imdbID: imdbID });
        res.status(200).json(foundShow);

        if(!foundShow) //if show is not found in database
        {
            const { imdbID, title, overview, year, imdbRating, tags, posterURL, userRating } = req.body;
            const newShowContent = new ShowContent({ imdbID, title, overview, year, imdbRating, tags, posterURL, userRating })
            try 
            {
                await newShowContent.save();
                res.status(201).json(newShowContent);
            } 
            catch (error) 
            {
                res.status(409).json({ message: error.message });
            }
        }
    }
    catch
    {
        res.status(404).json({ message: error.message });
    }
}

export const updateShow = async (req, res) => {
    const { id } = req.params;
    const { title, overview, year, imdbRating, tags, posterURL, userRating } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedShow = { title, overview, year, imdbRating, tags, posterURL, userRating };

    await ShowContent.findByIdAndUpdate(id, updatedShow, { new: true });

    res.json(updatedShow);
}

export const deleteShow = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await ShowContent.findByIdAndRemove(id);

    res.json({ message: "Show deleted successfully." });
}

export const rateShow = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const show = await ShowContent.findById(id);

    //Implement rating method
    const updatedShow = await ShowContent.findByIdAndUpdate(id, { userRating: show.userRating}, { new: true });
    
    res.json(updatedShow);
}


export default router;