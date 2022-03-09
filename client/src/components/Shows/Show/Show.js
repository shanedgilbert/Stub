import React, { useState, setState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';

import useStyles from './styles';

const Show = ({ show }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const imdbRatingNormalized = show.imdbRating/10;

  const [visibility, setVisibility] = useState(false);

  const handleCloseModal = () => {
    setVisibility(false);
  }
  const handleShowModal = () =>  {
    setVisibility(true);
  }

  return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} onClick={handleShowModal} image={show.posterURLs.original || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={show.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{show.originalTitle}</Typography>
          <Typography variant="body2">{show.year}</Typography>
        </div>
        <div className={classes.overlay3}>
          <Typography variant="body2">IMDB: {imdbRatingNormalized}/10</Typography>
        </div>
        <div className={classes.overlay2}>
          {/* <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(show._id)}><MoreHorizIcon fontSize="default" /></Button> */}
        </div>
        <Modal className={classes.modal, classes.lengthofthing} show={visibility} onHide={handleCloseModal} backdrop={true}>
          <Modal.Header className={classes.modal} closeButton>

            <Modal.Title className={classes.modal}>
              <Typography variant="h6">{show.originalTitle}</Typography>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={classes.modal}>
            <img src={show.backdropURLs.original || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt="poster" width="2048" className="img-fluid"/>
            <Typography variant="body2" component="h2">{show.cast.map((cast) => `${cast}, `)}</Typography>
          </Modal.Body>
          {/* <Modal.Body>
            <Typography variant="body2" color="textSecondary" component="p">{show.overview}</Typography> */}
            {/* <Typography className={classes.title} variant="h5" component="h2">{show.tagline}</Typography> */}
          {/* </Modal.Body> */}
        </Modal>
      </Card>
  );
};

export default Show;
