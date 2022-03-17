import { FETCH_ALL, CREATE, UPDATE, DELETE, RATE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export async function getAccounts() 
{
    try 
    {
        await fetch(api.fetchAccounts(), {method: FETCH_ALL});
    }
   catch (error) 
    {
        console.log(error.message);
    }
};

export async function createAccount(account)
{ 
  try 
  {
    await fetch(api.createAccount(account), {method: CREATE});

  } 
  catch (error) 
  {
    console.log(error.message);
  }
}