import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

class User extends Component {
  render() {
    return (
      <div>
        <h1>Hi! Name </h1>
        <h3>Document List</h3>
        <Button variant="contained" color="primary">New Document</Button>
      </div>
    )
  }
}

export default User;
