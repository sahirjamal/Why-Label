import React from 'react';
import { connect } from 'react-redux';
import Styling from '../styling/homePage.css';

import { Container, Divider, Grid, Segment, Header, Button, Icon, List, Image } from 'semantic-ui-react';
import { navigate } from '../actions/index';
import paths from '../paths_config';

class HomePage extends React.Component {

showCheckout() {
  if (this.props.cart !== null) {
    return <li onClick={() => this.props.navigate(paths.CHECKOUT)}>Checkout</li>
  }
}

cartCount() {
  return this.props.cart.length; 
}

render() {
    return (
      <div className='homePage'>
        <Grid>

          <Grid.Row className='topRow' columns='sixteen'>
            <Grid.Column floated='left'  className='whyLabel' width='eight'>
            <h4 onClick={() => this.props.navigate(paths.HOME)}>Why Label?</h4>
            </Grid.Column>

            <Grid.Column floated='right' className='cartColumn' width='eight'>
              <ul className='navOptions'>
                <li onClick={() => (this.props.navigate(paths.CART))}><Icon name='shop'/> Cart: {this.cartCount()}</li>
                {this.showCheckout()}
              </ul>
            </Grid.Column>
          </Grid.Row>


          <Grid.Row centered stretched className='middleRow'>
            <Grid.Column width='eight'>
                <Image onClick={() => this.props.navigate(paths.PRODUCT1)} centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_04_gold_pattern_bangle.jpg?1407742444019020188' size='large' className='product' />
                <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_03_silver_anchor_leather_bracelet.jpg?1407742444019020188' size='large' className='product' />
                <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_02_black_lava_rock_buddha_bracelet.jpg?1407742444019020188' size='large' className='product' />
            </Grid.Column>

              <Grid.Column width='eight'>
              <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_03_image_and_text.jpg?1407742444019020188' size='large' className='product' />
              <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_02_image_and_text.jpg?1407742444019020188' size='large' className='product' />
              <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_01_gallery.jpg?1407742444019020188' size='large' className='product' />
            </Grid.Column>

          </Grid.Row>

          <Grid.Row centered className='bottomRow'>
            <Grid.Column width='three'>
              <List horizontal size='large'>
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

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (route) => (dispatch(navigate(route)))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage)
