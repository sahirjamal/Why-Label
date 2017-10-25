import React from 'react';
import { connect } from 'react-redux';
import Styling from '../styling/cartPage.css';

import { Container, Divider, Grid, Segment, Header, Button, Icon, List, Image, Label, Dropdown, Table } from 'semantic-ui-react';
import { navigate, toggleProduct, removeProduct } from '../actions/index';
import paths from '../paths.config';
import uuid from 'uuid/v4';

class Cart extends React.Component {

render() {
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

        <Grid.Row centered stretched className='checkoutList'>
          <Container>
          <Table stackable textAlign='center' className='cartList'>
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
                <Table.Cell width='two'>${product.price * product.quantity}</Table.Cell>
                <Table.Cell width='two'>{product.quantity}</Table.Cell>
                <Table.Cell width='two'><Button onClick={() => {this.props.removeProduct(product)}}>Remove</Button></Table.Cell>
              </Table.Row>
               )
              })}
              
            </Table.Body>
            
         
          </Table>
          </Container>
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
    cart: state.Cart.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (route) => (dispatch(navigate(route))),
    toggleProduct: (product) => (dispatch(toggleProduct(product))),
    removeProduct: (product) => (dispatch(removeProduct(product)))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart)
