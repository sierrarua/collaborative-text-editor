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
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Welcome extends Component {
  state = {
    logUsername: '',
    logPassword: '',
    regUsername: '',
    regPassword: ''
  };

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
                <InputLabel htmlFor="name-simple">Username</InputLabel>
                <Input id="name-simple" value={this.state.username} onChange={e => this.setState({logUsername: e.target.value})} />
              </FormControl>
              <FormControl className={classes.formControl}>
                {/*Password*/}
                <InputLabel htmlFor="name-simple">Password</InputLabel>
                <Input id="name-simple" value={this.state.password} onChange={e => this.setState({logPassword: e.target.value})} />
              </FormControl>

              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>

        {/*Logo*/}
        <div className={classes.container}>
          <h1 className={classes.header}>COLLABORATIVE TEXT EDITOR</h1>
        </div>

        {/*Form Field*/}
        <div className={classes.container}>
          <h3>Register</h3><br/>
          <FormControl className={classes.formControl}>
            {/*Username for Registration */}
            <InputLabel htmlFor="name-simple">Username</InputLabel>
            <Input id="name-simple" onChange={e => this.setState({regUsername: e.target.value})} />
          </FormControl>
          <FormControl className={classes.formControl}>
            {/* Password for Registration */}
            <InputLabel htmlFor="name-simple">Password</InputLabel>
            <Input id="name-simple" onChange={e => this.setState({regPassword: e.target.value})} />
          </FormControl>
        </div>

      </div>
    )
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);
