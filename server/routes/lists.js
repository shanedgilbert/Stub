import express from 'express';
//import { editListName } from '../../client/src/api/index.js';
import { getLists, getList, createList, updateList, deleteList, editListName, addListShow } from '../controllers/lists.js';

const router = express.Router();

router.get('/', getLists);
router.post('/', createList);
router.delete('/:id', deleteList)
//Require updating once list identity is decided
//Possibilities:
//  /:userID/name
//  /:listID
//router.get('/:id', getList);
router.patch('/:id', addListShow);
router.patch('/:id', editListName);
//router.delete('/:id', deleteList);

export default router;