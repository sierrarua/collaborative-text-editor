import React, {Component} from 'react';
import Welcome from './screens/Welcome';
import User from './screens/User';
import TextEditor from './screens/TextEditor';

class App extends Component {
  state = {
    screen: Welcome
  }

  navigate = (screen) => {
    this.setState({screen});
  }

  render() {
    return (
      <div>
        {this.state.screen === Welcome ? <Welcome navigate={this.navigate} /> : null}
        {this.state.screen === User ? <User navigate={this.navigate}/> : null}
        {this.state.screen === TextEditor ? <TextEditor navigate={this.navigate}/> : null}
      </div>
    )
  }
}

export default App;
