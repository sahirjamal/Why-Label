import React from 'react';
import { connect } from 'react-redux';
import Styling from '../styling/homePage.css';

import { Container, Divider, Grid, Segment, Header, Button, Icon, List, Image } from 'semantic-ui-react';
import { navigate } from '../actions/index';
import paths from '../paths.config';

import BottomBanner from './bottomBanner';

class HomePage extends React.Component {

render() {
    return (
      <div className='homePage'>
        <Grid>

          <Grid.Row centered stretched className='topRow'>
            <Grid.Column stretched className='whyLabel' width='three'>
              <h4>Why Label?</h4>
            </Grid.Column>

            <Grid.Column floated='right' className='cart' width='three'>
              <List horizontal>
                <List.Item>
                  <List.Icon fitted name='shop'/>
                  <List.Content>Cart</List.Content>
                </List.Item>
                <List.Item>Checkout</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>


          <Grid.Row centered stretched className='middleRow'>
            <Grid.Column className='column1' width='eight'>
                <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_04_gold_pattern_bangle.jpg?1407742444019020188' size='large' className='product' />
                <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_03_silver_anchor_leather_bracelet.jpg?1407742444019020188' size='large' className='product' />
                <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_02_black_lava_rock_buddha_bracelet.jpg?1407742444019020188' size='large' className='product' />
            </Grid.Column>

              <Grid.Column className='column2' width='eight'>
              <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_03_image_and_text.jpg?1407742444019020188' size='large' className='product' />
              <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_02_image_and_text.jpg?1407742444019020188' size='large' className='product' />
              <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_01_gallery.jpg?1407742444019020188' size='large' className='product' />
            </Grid.Column>

          </Grid.Row>

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

        </Grid>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     location: state.locationReducer.location
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (route) => (dispatch(navigate(route)))
  }
}


export default connect(
  null,
  mapDispatchToProps,
)(HomePage)
