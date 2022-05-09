export const componentClicked = () => 
{
  console.log("clicked");
}

// Gets the user's information
export const getLocalUser = () => 
{
  if(localStorage.getItem('userLoginData'))
  {
    return JSON.parse(localStorage.getItem('userLoginData'));
  }
  else
  {
    return null;
  }
}

// Sets the current user
export const setLocalUser = (userData) => 
{
  localStorage.setItem('userLoginData', JSON.stringify(userData));
  window.location.reload(true);
}

// Checks if a user is logged in
export const isLoggedIn = () =>
{
  if(localStorage.getItem('userLoginData'))
  {
    return true;
  }
  else
  {
    return false;
  }
}





