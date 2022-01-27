import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 10,
    margin: '15px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232424',
  },
  heading: {
    color: 'white',
  },
  image: {
    marginLeft: '15px',
  },
}));
