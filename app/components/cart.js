import React from 'react';
import { connect } from 'react-redux';
import Styling from '../styling/cartPage.css';

import { Container, Divider, Grid, Segment, Header, Button, Icon, List, Image, Label, Dropdown, Table } from 'semantic-ui-react';
import { navigate, removeProduct } from '../actions/index';
import cartReducer from '../reducers/cartReducer';
import paths from '../paths_config';
import uuid from 'uuid/v4';

class Cart extends React.Component {

showCheckout() {
  if (this.props.cart !== null) {
    return <li onClick={() => this.props.navigate(paths.CHECKOUT)}>Checkout</li>
  }
}

cartCount() {
  return this.props.cart.length; 
}

total() {
  let total = 0;
  this.props.cart.map(product => {
    total += (product.price * product.quantity);
  })
  return total;
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
            <Container>
              <Table stackable textAlign='center'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.cart.map((product) => {
                  return(
                  <Table.Row textAlign='center' verticalAlign='middle' key={uuid()}>
                    <Table.Cell width='three'><Image src={product.image} size='small' /></Table.Cell>
                    <Table.Cell width='three'>
                      <h4>{product.name}</h4>
                      <p>{product.color + '/' + product.size}</p>
                    </Table.Cell>
                    <Table.Cell width='two'>${(product.price).toFixed(2)}</Table.Cell>
                    <Table.Cell width='two'>{product.quantity}</Table.Cell>
                    <Table.Cell width='two'><Button onClick={() => {this.props.removeProduct(product)}}>Remove</Button></Table.Cell>
                  </Table.Row>
                  )
                  })}

                  <Table.Row>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell className='total'>${this.total().toFixed(2)}</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Container>
          </Grid.Row>

          <Grid.Row stretched>
            <Grid.Column width='two' floated='right' className='cartCheckout'>
              <Button onClick={() => this.props.navigate(paths.CHECKOUT)}>CHECKOUT</Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered className='cartBottomRow'>
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
    removeProduct: (product) => (dispatch(removeProduct(product)))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart)
