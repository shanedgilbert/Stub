import express from 'express';

import { getLists, getList, createList, updateList, deleteList } from '../controllers/lists.js';

const router = express.Router();

router.get('/', getLists);
router.post('/', createList);
router.delete('/:id', deleteList)
//Require updating once list identity is decided
//Possibilities:
//  /:userID/name
//  /:listID
//router.get('/:id', getList);
//router.patch('/:id', updateList);
//router.delete('/:id', deleteList);

export default router;