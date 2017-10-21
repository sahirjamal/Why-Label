import React from 'react';
import { connect } from 'react-redux';

import { Container, Divider, Grid, Segment, Header, Button, Icon } from 'semantic-ui-react';

class HomePage extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     user: firebase.auth().currentUser
  //   }
  // }

render() {
    return (
      <div>
        <h4>hello</h4>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     location: state.locationReducer.location
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     navigate: (route) => (dispatch(navigate(route)))
//   }
// }


export default connect(
  null,
  null
)(HomePage)
