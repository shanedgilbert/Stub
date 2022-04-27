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


export const getShow = async (req, res) => 
{ 
    console.log('test')
    const { type } = req.params.type;
    const  { service }  = req.params;
    const { sortType } = req.params;
    const {genre} = req.params;
    const{year} = req.params;
    const page = req.params.page
    try 
    {
        if(genre == 'noGenre') //no genre
        {
            if(year == 'noYear')//no year
            {
                console.log('!!')
                if(sortType == 'ratings')
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service}).sort({imdbRating: -1, _id: 1}).limit(9);
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service}).sort({imdbRating: -1, _id: 1}).limit(9).skip((page-1)*9);
                    }
                }
                else if(sortType == 'name')
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service}).collation({locale:'simple',strength: 1}).sort({originalTitle: 1, _id: 1}).limit(9);
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service}).collation({locale:'simple',strength: 1}).sort({originalTitle: 1, _id: 1}).limit(9).skip((page-1)*9);
                    }
                
                }
                else
                {
                    
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service}).limit(9);
                    
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service}).limit(9).skip((page-1)*9);
                    }
                }   
            }
            else//year
            {
                console.log('!!')
                if(sortType == 'ratings')
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, year: req.params.year}).sort({imdbRating: -1, _id: 1}).limit(9);
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, year: req.params.year}).sort({imdbRating: -1, _id: 1}).limit(9).skip((page-1)*9);
                    }
                }
                else if(sortType == 'name')
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, year: req.params.year}).collation({locale:'simple',strength: 1}).sort({originalTitle: 1, _id: 1}).limit(9);
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, year: req.params.year}).collation({locale:'simple',strength: 1}).sort({originalTitle: 1, _id: 1}).limit(9).skip((page-1)*9);
                    }
                
                }
                else
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, year: req.params.year}).limit(9);
                    
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, year: req.params.year}).limit(9).skip((page-1)*9);
                    }
                } 
            }
        }
        else //genre
        {
            console.log('!!!!')
            if(year == 'noYear') //no year
            {
                if(sortType == 'ratings')
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre}).sort({imdbRating: -1, _id: 1}).limit(9);
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre}).sort({imdbRating: -1, _id: 1}).limit(9).skip((page-1)*9);
                    }
                }
                else if(sortType == 'name')
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre}).collation({locale:'simple',strength: 1}).sort({originalTitle: 1, _id: 1}).limit(9);
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre}).collation({locale:'simple',strength: 1}).sort({originalTitle: 1, _id: 1}).limit(9).skip((page-1)*9);
                    }
                
                }
                else
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre}).limit(9);
                    
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre}).limit(9).skip((page-1)*9);
                    }
                } 
            }
            else //year
            {
                if(sortType == 'ratings')
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre, year: req.params.year}).sort({imdbRating: -1, _id: 1}).limit(9);
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre, year: req.params.year}).sort({imdbRating: -1, _id: 1}).limit(9).skip((page-1)*9);
                    }
                }
                else if(sortType == 'name')
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre, year: req.params.year}).collation({locale:'simple',strength: 1}).sort({originalTitle: 1, _id: 1}).limit(9);
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre, year: req.params.year}).collation({locale:'simple',strength: 1}).sort({originalTitle: 1, _id: 1}).limit(9).skip((page-1)*9);
                    }
                
                }
                else
                {
                    if(page == 1)
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre, year: req.params.year}).limit(9);
                    
                    }
                    else
                    {
                        var show = await ShowContent.find({type : req.params.type, service: req.params.service, genres: req.params.genre, year: req.params.year}).limit(9).skip((page-1)*9);
                    }
                } 
            }
        }
        res.status(200).json(show);
    } 
    catch (error) 
    {
        res.status(404).json({ message: error.message });
    }
}

export const createShow = async (req, res) => 
{
    
    try
    {
        //console.log('add', req.body.title)
        const imdbID = req.body.imdbID;
        const foundShow = await ShowContent.findOne({ imdbID: imdbID });
       

        if(!foundShow) //if show is not found in database
        {
            const { imdbID, title, overview, year, imdbRating, tags, posterURLs, userRating, streamingInfo, runtime, originalTitle, genres, backdropURLs, cast, significants, tagline,  } = req.body;
           
            const service = [];
            Object.keys(req.body.streamingInfo).forEach(function pushAndCreate(element) {
              service.push(element)
            },this);

            const newShowContent = new ShowContent({ imdbID, title, overview, year, imdbRating, tags, posterURLs, userRating, streamingInfo, runtime, originalTitle, genres, backdropURLs, cast, significants, tagline, service  })
            await newShowContent.save();
            console.log('if', newShowContent.title);
            //console.log('if', Object.keys(newShowContent.streamingInfo)[0]);
            //console.log('if', newShowContent.streamingInfo.netflix.us.link);
            res.status(201).json(newShowContent);
        }
        else
        {
            console.log('else', foundShow.title);
            //console.log('else', Object.keys(foundShow.streamingInfo)[0]);
            //console.log('else', foundShow.streamingInfo.netflix.us.link);
            res.status(201).json(foundShow);
        }
    }


    catch(error)
    {
        console.log(error)
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




//GET STREAMING SERVICE BY {show}.Object.keys(foundShow.streamingInfo)[0]);