import { FETCH_ALL, CREATE } from '../constants/actionTypes';
import * as api from '../api/index.js';

// Calls the API account fetch
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

// Calls the API account creation
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