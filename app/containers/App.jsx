import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Lanes from '../components/Lanes.jsx';
import CurrentUser from '../components/CurrentUser.jsx';
import {createLane} from '../actions/lanes';

class App extends React.Component {
  render() {
    const {lanes, user, createLane} = this.props;

    return (
      <div>
        <CurrentUser user={user} />
        <Lanes lanes={lanes} />
        <button className="add-group"
          onClick={createLane.bind(null, {
            name: 'Group Name'
          })}>Add Group +</button>
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    lanes: state.lanes,
    user: state.user
  }), {
    createLane
  }),
  DragDropContext(HTML5Backend)
)(App);
