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
    padding: '3rem 5rem 0 0',
    cursor: 'pointer'
  },
  buttonImg: {
    height: '50px',
    width: '50px'
  },
  addListButtonDropDown: {
    height: '100%',
    width: '400%',
    background: '#343a40',
    float: 'right',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '10px !important',
    cursor: 'default'
  },
  addListSubmit: {
    height: '100%',
    borderRadius: '10px !important',
    left: '25%',
    marginBottom: '0.5rem !important',
    backgroundColor: 'lightgray !important'
  },
  addListTextField: {
    backgroundColor: 'lightgray !important',
    height: '100%',
    margin: '100px',
    alignSelf: 'center'
  },
  loadingRoller: {
    textAlign: 'center',
    margin: 'auto',
    width: '100%',
    boxSizing: 'border-box',
    padding: '50px',
  },
}));
