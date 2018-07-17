import React, {Component} from 'react';
import Welcome from './screens/Welcome';
import User from './screens/User';
import TextEditor from './screens/TextEditor';

class App extends Component {
  state = {
    screen: TextEditor
  }

  navigate = (screen) => {
    this.setState({screen});
  }

  render() {
    return (
      <div>
        {this.state.screen === Welcome ? <Welcome /> : null}
        {this.state.screen === User ? <User /> : null}
        {this.state.screen === TextEditor ? <TextEditor/> : null}
      </div>
    )
  }
}

export default App;
