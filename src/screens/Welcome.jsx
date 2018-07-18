import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import User from './User';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  header: {
    justify: 'center',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Welcome extends Component {
  state = {
    logUsername: '',
    logPassword: '',
    regUsername: '',
    regPassword: '',
  };

  register = () => {
    const {regUsername, regPassword} = this.state;

    fetch('http://localhost:1337/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: regUsername,
        password: regPassword,
      })
    }).then(res => {
      if (res.status === 200) {
        console.log('Success: register');
      } else {
        console.log('Failed: register');
      }
    }).catch((err) => {
      console.log(err);
      return err.message;
    })
  }

  login = () => {
    const {logUsername, logPassword} = this.state;

    fetch('http://localhost:1337/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: logUsername,
        password: logPassword,
      })
    }).then(res => {
      if (res.status === 200) {
        console.log('Success: log in');
        this.props.navigate(User);
      } else {
        console.log('Failed: log in');
      }
    }).catch((err) => {
      console.log(err);
      return err.message;
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        {/*Navigation Bar */}
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Welcome
              </Typography>
              <FormControl className={classes.formControl}>
                {/*Username*/}
                <Input id="logUsername" placeholder='Username' onChange={e => this.setState({logUsername: e.target.value})} />
              </FormControl>
              <FormControl className={classes.formControl}>
                {/*Password*/}
                <Input id="logPassword" placeholder='Password' type='password' onChange={e => this.setState({logPassword: e.target.value})} />
              </FormControl>

              <Button color="inherit" onClick={this.login}>Login</Button>
            </Toolbar>
          </AppBar>
        </div>

        {/*Logo*/}
        <div className={classes.container}>
          <h1 className={classes.header}>COLLABORATIVE TEXT EDITOR</h1>
        </div>

        {/*Form Field*/}
        <div className={classes.container}>
          <h3>New User?</h3><br/>
          <FormControl className={classes.formControl}>
            {/*Username for Registration */}
            <InputLabel htmlFor="name-simple">Username</InputLabel>
            <Input id="name-simple" onChange={e => this.setState({regUsername: e.target.value})} />
          </FormControl>
          <FormControl className={classes.formControl}>
            {/* Password for Registration */}
            <InputLabel htmlFor="name-simple">Password</InputLabel>
            <Input id="regPassword" type='password' onChange={e => this.setState({regPassword: e.target.value})} />
          </FormControl>
          <Button variant="contained" color="primary" onClick={this.register}>Register</Button>
        </div>

      </div>
    )
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);
