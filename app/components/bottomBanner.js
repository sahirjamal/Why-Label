import React from 'react';
import { connect } from 'react-redux';
import Styling from '../styling/homePage.css';

import { Container, Divider, Grid, Segment, Header, Button, Icon, List, Image } from 'semantic-ui-react';
import { navigate } from '../actions/index';
import paths from '../paths.config';

class BottomBanner extends React.Component {
  
  render() {
      return (
        <div>
            <Grid.Row centered stretched className='bottomRow'>
              <Grid.Column width='three'>
                <List horizontal>
                  <List.Item>Contact</List.Item>
                  <List.Item>Terms</List.Item>
                  <List.Item>Hello</List.Item>
                  <List.Item>SMD</List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
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
    null,
  )(BottomBanner)
  