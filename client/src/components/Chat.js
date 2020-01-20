import React from 'react';
import { Header, Footer } from './Layouts';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  leftPane: {
    margin: theme.spacing(1),
    width: '20vw',
    height: '70vh',
  },
  rightPane: {
    margin: theme.spacing(1),
    width: '60vw',
    height: '70vh',
  },
}));

const Chat = () => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <div className={classes.root}>
        <Paper className={classes.leftPane} elevation={2} />
        <Paper className={classes.rightPane} elevation={2} />
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
