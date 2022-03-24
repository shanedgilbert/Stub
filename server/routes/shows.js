import express from 'express';

import { getShows, getShow, createShow, updateShow, rateShow, deleteShow } from '../controllers/shows.js';

const router = express.Router();

router.get('/', getShows);
router.post('/', createShow);
router.get('/:type/:service/:sort/:page', getShow);
router.patch('/:id', updateShow);
router.delete('/:id', deleteShow);
router.patch('/:id/rateShow', rateShow);

export default router;