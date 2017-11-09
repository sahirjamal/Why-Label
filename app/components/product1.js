import React from 'react';
import { connect } from 'react-redux';
import Styling from '../styling/productPage.css';

import { Container, Divider, Grid, Segment, Header, Button, Icon, List, Image, Label, Dropdown } from 'semantic-ui-react';
import { navigate, addProduct } from '../actions/index';
import paths from '../paths_config';

let color = 'Purple';
let size = 'Small';

class Product1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: 'https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_04_gold_pattern_bangle.jpg?1407742444019020188',
      name: 'Superpowered Bangel',
      price: 100.00,
      color: 'Purple',
      size: 'Small',
      quantity: 1
    }

  }

showCheckout() {
  if (this.props.cart !== null) {
    return <li onClick={() => this.props.navigate(paths.CHECKOUT)}>Checkout</li>
  }
}

cartCount() {
  return this.props.cart.length; 
}

changeColor(event, data) {
  const results = (`${JSON.stringify(data, null, 2)}`);
  const resultsObject = JSON.parse(results);
  color = resultsObject.value;
}

changeSize(event, data) {
  const results = (`${JSON.stringify(data, null, 2)}`);
  const resultsObject = JSON.parse(results);
  size = resultsObject.value;
}

async addToCart() {
  await this.setState({color: color, size: size})
  const newState = this.state;
  await this.props.addProduct(newState);
  await this.props.navigate(paths.CART);
}

render() {
  const ColorOptions = [
    {text: 'Purple', value: 'Purple'},
    {text: 'Yellow', value: 'Yellow'},
    {text: 'Green', value: 'Green'}
  ];

  const SizeOptions = [
    {text: 'Small', value: 'Small'},
    {text: 'Medium', value: 'Medium'},
    {text: 'Large', value: 'Large'}
  ];

    return (
      <div className='homePage'>
        <Grid>
          <Grid.Row className='topRow' columns='sixteen'>
            <Grid.Column floated='left' className='whyLabel' width='eight'>
            <h4 onClick={() => this.props.navigate(paths.HOME)}>Why Label?</h4>
            </Grid.Column>

            <Grid.Column floated='right' className='cartColumn' width='eight'>
              <ul className='navOptions'>
                <li onClick={() => (this.props.navigate(paths.CART))}><Icon name='shop'/> Cart: {this.cartCount()}</li>
                {this.showCheckout()}
              </ul>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered stretched className='productRow'>
            <Grid.Column width='six'>
              <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_04_gold_pattern_bangle.jpg?1407742444019020188' size='large' className='product' />
            </Grid.Column>

            <Grid.Column width='one'>
              <h4>hello</h4>
            </Grid.Column>

            <Grid.Column width='six'>
              <h2>SUPERPOWERED BANGEL</h2>
              <p>This shit will make you fly. You gonna pick up trains and rip apart buildings with your bare fucking hands.</p>
              <h3>${this.state.price.toFixed(2)}</h3>
              <Divider />
              <Grid.Column width='two'>
                <Header sub>Color</Header>
                <Dropdown onChange={this.changeColor} options={ColorOptions} defaultValue={ColorOptions[0].value} />
                <Header sub>Size</Header>
                <Dropdown onChange={this.changeSize} options={SizeOptions} defaultValue={SizeOptions[0].value} /> 
              </Grid.Column>
              <Divider />
              <Grid.Column width='two'> 
                <Button onClick={() => this.addToCart()} size='small' className='addToCart'>ADD TO CART</Button>
              </Grid.Column>
            </Grid.Column>
          </Grid.Row>


          <Grid.Row centered className='productBottomRow'>
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
    navigate: (route) => (dispatch(navigate(route))),
    addProduct: (product) => (dispatch(addProduct(product)))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product1)
