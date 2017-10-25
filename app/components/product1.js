import React from 'react';
import { connect } from 'react-redux';
import Styling from '../styling/productPage.css';

import { Container, Divider, Grid, Segment, Header, Button, Icon, List, Image, Label, Dropdown } from 'semantic-ui-react';
import { navigate, toggleProduct } from '../actions/index';
import paths from '../paths.config';

let color = 'Purple';
let size = 'Small';

class Product1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: 'https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_04_gold_pattern_bangle.jpg?1407742444019020188',
      name: 'Superpowered Bangel',
      price: '100',
      color: 'Purple',
      size: 'Small'
    }

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
  await this.props.toggleProduct(newState);
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
          <Grid.Row centered stretched className='header'>
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

        <Grid.Row centered stretched className='productRow'>
          <Grid.Column width='six'>
            <Image centered src='https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_04_gold_pattern_bangle.jpg?1407742444019020188' size='large' className='product' />
          </Grid.Column>

          <Grid.Column width='one'>
            <h4>hello</h4>
          </Grid.Column>

          <Grid.Column width='six'>
            <h2 className='productTitle'>SUPERPOWERED BANGEL</h2>
            <p className='productDescription'>This shit will make you fly. You gonna pick up trains and rip apart buildings with your bare fucking hands.</p>
            <Grid.Column width='two'>
              <Header sub>Color</Header>
              <Dropdown onChange={this.changeColor} options={ColorOptions} defaultValue={ColorOptions[0].value} />
              <Header sub>Size</Header>
              <Dropdown onChange={this.changeSize} options={SizeOptions} defaultValue={SizeOptions[0].value} /> 
            </Grid.Column>
            <Grid.Column width='two'> 
              <Button onClick={() => this.addToCart()} size='small' className='addToCart'>ADD TO CART</Button>
            </Grid.Column>
          </Grid.Column>
        </Grid.Row>


        <Grid.Row centered stretched className='footer'>
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

const mapStateToProps = (state) => {
  return {
    cart: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (route) => (dispatch(navigate(route))),
    toggleProduct: (product) => (dispatch(toggleProduct(product)))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product1)
