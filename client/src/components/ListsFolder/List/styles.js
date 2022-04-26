import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  textField: {
    backgroundColor: 'lightgray !important',
    height: '100%',
    margin: '100px',
    alignSelf: 'center'
  },
  nameSubmit: {
    height: '100%',
    borderRadius: '10px !important',
    left: '25%',
    marginBottom: '0.5rem !important',
    backgroundColor: 'lightgray !important'
  },
  editListName: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    cursor: 'pointer',
  },
    
}))