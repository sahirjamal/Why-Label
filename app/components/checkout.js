import React from 'react';
import { connect } from 'react-redux';
import Styling from '../styling/checkoutPage.css';

import { Container, Select, Input, Grid, Form, Header, Button, Checkbox, List, Image, Label, Divider, Breadcrumb, Icon, Table } from 'semantic-ui-react';
import { navigate, firstName, lastName, phoneNumber, emailAddress, shippingAddress, shippingAddress2, usCity, selectedState, zipCode } from '../actions/index';
import checkoutReducer from '../reducers/checkoutReducer';
import cartReducer from '../reducers/cartReducer';
import paths from '../paths_config';
import uuid from 'uuid/v4';

let state = '';

class Checkout extends React.Component {

total() {
  let total = 0;
  this.props.cart.map(product => {
    total += (product.price * product.quantity);
  })
  return total;
}

changeState(event, data) {
  const results = (`${JSON.stringify(data, null, 2)}`);
  const resultsObject = JSON.parse(results);
  state = resultsObject.value;
}

async paymentButton() {
  await this.props.selectedState(state);
  await this.props.navigate(paths.PAYMENT);
}

render() {
    return (
      <div className='checkout'>
        <Grid centered>
          <Grid.Column width='six'>
            <Grid.Row centered columns='six' textAlign='center'>
              <h3 className='logo' onClick={() => {this.props.navigate(paths.HOME)}}>Why Label?</h3>
            </Grid.Row>

            <Grid.Row className='breadcrumb' centered columns='six' textAlign='center'>
              <Breadcrumb size='small'>
                <Breadcrumb.Section link={() => this.props.navigate(paths.CART)} onClick={() => this.props.navigate(paths.CART)}>Cart</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Checkout</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section>Payment Method</Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Row>

            <Grid.Row centered className='customerInformation'>
              <h3>Customer Information</h3>
              <Form>
                <Form.Group>
                  <Form.Field required width='eight'>
                    <label>First Name</label>
                    <input placeholder='First Name' onChange={(e) => this.props.firstName(e.target.value)}/>
                  </Form.Field>
                  <Form.Field required width='eight'>
                    <label>Last Name</label>
                    <input placeholder='Last Name' onChange={(e) => this.props.lastName(e.target.value)}/>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field required width='eight'>
                    <label>Phone Number</label>
                    <input placeholder='Phone Number' onChange={(e) => this.props.phoneNumber(e.target.value)}/>
                  </Form.Field>
                  <Form.Field required width='eight'>
                    <label>Email Address</label>
                    <input placeholder='Email Address' onChange={(e) => this.props.emailAddress(e.target.value)}/>
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <Checkbox checked label='I would like to subscribe to emails' />
                </Form.Field>
              </Form>
            </Grid.Row>

            <Grid.Row centered className='shippingInformation'>
              <h3>Shipping Information</h3>
              <Form>
                <Form.Group>
                  <Form.Field required width='ten'>
                      <label>Address</label>
                      <input placeholder='Address' onChange={(e) => this.props.shippingAddress(e.target.value)}/>
                  </Form.Field>
                  <Form.Field required width='six'>
                      <label>Apt, suite, etc.</label>
                      <input placeholder='Apt, suite, etc. (optional)' onChange={(e) => this.props.shippingAddress2(e.target.value)}/>
                  </Form.Field>
                </Form.Group>
                <Form.Field required>
                    <label>City</label>
                    <input spellCheck autoCorrect='on' placeholder='City' onChange={(e) => this.props.usCity(e.target.value)}/>
                </Form.Field>
                <Form.Group>
                  <Form.Field required width='ten' control={Select} options={this.props.states} label='State' placeholder='State' onChange={this.changeState} />
                  <Form.Field required width='six'>
                    <label>Zip Code</label>
                    <input placeholder='Zip Code' minLength='5' maxLength='10' onChange={(e) => this.props.zipCode(e.target.value)}/>
                </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Row>

            <Grid.Row className='checkoutBottomRow' columns='sixteen'>
              <Grid.Column floated='left' width='eight'>
                <ul className='returnToCart'>
                  <li className='icon'><Icon name='chevron left' /></li>
                  <li><p>Return to cart</p></li>
                </ul>
              </Grid.Column>
              <Grid.Column floated='right' width='eight'>
                <Button compact onClick={() => {this.paymentButton()}} size='large'>Continue to payment</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>




          <Grid.Column width='six' verticalAlign='middle'>
            <Grid.Row centered stretched className='middleRow'>
              <Container>
                <Table stackable textAlign='center'>
                  <Table.Body>
                    {this.props.cart.map((product) => {
                    return(
                    <Table.Row textAlign='center' verticalAlign='middle' key={uuid()}>
                      <Table.Cell width='three'><Image src={product.image} size='small' /></Table.Cell>
                      <Table.Cell width='one'>({product.quantity})</Table.Cell>
                      <Table.Cell width='six'>
                        <h4>{product.name}</h4>
                        <p>{product.color + '/' + product.size}</p>
                      </Table.Cell>
                      <Table.Cell width='two'>${(product.price).toFixed(2)}</Table.Cell>
                    </Table.Row>
                    )
                    })}
                  </Table.Body>
                </Table>
                
                <Table stackable celled={false} className='subtotalTable'>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width='two'>Subtotal</Table.Cell>
                      <Table.Cell width='six'></Table.Cell>
                      <Table.Cell width='six'></Table.Cell>
                      <Table.Cell width='two' className='subtotal'>${this.total().toFixed(2)}</Table.Cell>
                    </Table.Row>

                    <Table.Row className='shippingRow'>
                      <Table.Cell width='two'>Shipping</Table.Cell>
                      <Table.Cell width='six'></Table.Cell>
                      <Table.Cell width='six'></Table.Cell>
                      <Table.Cell width='two' className='shipping'>$10.00</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>

                <Table className='totalTable'>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width='two'>Total</Table.Cell>
                      <Table.Cell width='six'></Table.Cell>
                      <Table.Cell width='six'></Table.Cell>
                      <Table.Cell width='two'>${(this.total()+ 10).toFixed(2)}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Container>
            </Grid.Row>

          </Grid.Column>












          {/* <Grid.Column width='six' verticalAlign='middle' className='rightColumn'>
            {this.props.cart.map(product => {
              return (
                <div key={uuid()}>
                  <Grid.Row centered columns='three' className='cartProducts'>
                    <Grid.Column stretched className='cartImage' width='five'>
                      <Image src={product.image} size='small' />
                    </Grid.Column>
                    <Grid.Column className='cartQuantity' width='one'>
                      <h4>({product.quantity})</h4>
                    </Grid.Column>
                    <Grid.Column className='cartDescription' width='five'>
                      <h4 className='productName'>{product.name}</h4>
                      <p className='productDescription'>{product.color + '/' + product.size}</p>
                    </Grid.Column>
                    <Grid.Column className='cartTotal' width='five'>
                      <h4>${(product.price * product.quantity).toFixed(2)}</h4>
                    </Grid.Column>
                  </Grid.Row>
                </div>
              )
            })}
            <Divider />

            <Grid.Row className='subTotalRow'>
              <Grid.Column floated='left'>
                <h4 className='subTotal'>Subtotal</h4>
              </Grid.Column>
              <Grid.Column floated='right'>
                <h4 className='subTotalNumber'>${this.total().toFixed(2)}</h4>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='shippingRow'>
              <Grid.Column floated='left'>
                <h4>Shipping</h4>
              </Grid.Column>
              <Grid.Column floated='right'>
                <h4>$10.00</h4>
              </Grid.Column>
            </Grid.Row>

            <Divider />

            <Grid.Row className='totalRow'>
              <Grid.Column floated='left'>
                <h2>Total</h2>
              </Grid.Column>
              <Grid.Column floated='right'>
                <h2>${(this.total() + 10).toFixed(2)}</h2>
              </Grid.Column>
            </Grid.Row>

          </Grid.Column> */}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    all: state.checkoutReducer,
    states: state.checkoutReducer.usStates,
    cart: state.cartReducer.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (route) => (dispatch(navigate(route))),
    firstName: (name) => (dispatch(firstName(name))),
    lastName: (name) => (dispatch(lastName(name))),
    phoneNumber: (number) => (dispatch(phoneNumber(number))),
    emailAddress: (email) => (dispatch(emailAddress(email))),
    shippingAddress: (address) => (dispatch(shippingAddress(address))),
    shippingAddress2: (address2) => (dispatch(shippingAddress2(address2))),
    usCity: (city) => (dispatch(usCity(city))),
    selectedState: (state) => (dispatch(selectedState(state))),
    zipCode: (zip) => (dispatch(zipCode(zip))),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout)
