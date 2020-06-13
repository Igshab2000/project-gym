import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },

  main: {
    padding: theme.spacing(0, 2, 1),
  },

  header: {
    display: 'flex',
    flexDirection: 'row-reverse',
  }
}));


export default function SpringModal(props) {
  const classes = useStyles();
  const { isCheck, children, close } = props; 

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={isCheck}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <div className={classes.paper}>
          <header
              className={classes.header}
            >
              <CloseIcon 
                style={{
                  color: '#70cf7e',
                  marginTop: '8px',
                  marginRight: '8px',
                  cursor: 'pointer',
                  fontSize: '27px'
                }}
                onClick={() => close(false)}
              />
          </header>
          <main className={classes.main}>
            {children}
          </main>
        </div>
      </Modal>
    </div>
  );
}