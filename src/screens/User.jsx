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

import Welcome from './Welcome';

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

class User extends Component {
  state = {
    documentName: '',
  }

  toWelcome = () => {
    this.props.navigate(Welcome);
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
                Document Portal
              </Typography>

              <Button color="inherit" onClick={this.toWelcome}>Home</Button>
            </Toolbar>
          </AppBar>
        </div>

        <div className={classes.container}>
          <FormControl>
            <Input id="newDoc"
              placeholder='Title'
              onChange={e => this.setState({documentName: e.target.value})} />
          </FormControl>
          <Button variant="contained" color="primary">Create Document</Button>
        </div>
      </div>
    )
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
