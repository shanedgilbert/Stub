import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  listPageHeading: {
    alignItems: 'center'
  },
  addListButton: {
    height: '100%',
    float: 'right',
    padding: '20px 20px'
  },
  addListButtonDropDown: {
    height: '100%',
    width: '400%',
    background: 'white',
    float: 'right'
  },
  addListSubmit: {
    height: '100%',
    margin: '10%',
    background: 'blue',
    borderRadius: '2px'
  },
  addListTextField: {
    height: '100%',
    margin: '100px',
    alignSelf: 'center'
  }
}));
