import React from 'react';
import { connect } from 'react-redux';
import Styling from '../styling/paymentPage.css';

import { Container, Select, Segment, Table, Input, Grid, Form, Header, Button, Checkbox, List, Image, Dropdown, Divider, Breadcrumb, Icon } from 'semantic-ui-react';
import { navigate, shippingAddress, shippingAddress2, usCity, selectedState, zipCode } from '../actions/index';
import paymentReducer from '../reducers/paymentReducer';
import cartReducer from '../reducers/cartReducer';
import paths from '../paths_config';
import uuid from 'uuid/v4';

let state = '';
let total = null;
let changeAddress = false;

class Payment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changeAddress: false
    };
  }

changeState(event, data) {
  const results = (`${JSON.stringify(data, null, 2)}`);
  const resultsObject = JSON.parse(results);
  state = resultsObject.value;
}

total() {
  let total = 0;
  this.props.cart.map(product => {
    total += (product.price * product.quantity);
  })
  return total;
}

changeAddress() {
  this.setState({changeAddress: !this.state.changeAddress});
}

async placeOrder() {
  await this.props.selectedState(state);
  console.log('this.state.changeAddress', this.state.changeAddress);
}

newBillingAddress() {
  if (this.state.changeAddress === true) {
    return (
      <div>
        <Grid.Row centered>
          <Segment>
            <Form>
              <Form.Group>
                <Form.Field width='ten'>
                    <label>Address</label>
                    <input placeholder='Address' onChange={(e) => this.props.shippingAddress(e.target.value)} />
                </Form.Field>
                <Form.Field width='six'>
                    <label>Apt, suite, etc.</label>
                    <input placeholder='Apt, suite, etc. (optional)' onChange={(e) => this.props.shippingAddress2(e.target.value)}  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                  <label>City</label>
                  <input spellCheck autoCorrect='on' placeholder='City' onChange={(e) => this.props.usCity(e.target.value)} />
              </Form.Field>
              <Form.Group>
                <Form.Field width='ten' control={Select} options={this.props.states} label='State' placeholder='State' onChange={this.changeState} />
                <Form.Field width='six'>
                  <label>Zip Code</label>
                  <input placeholder='Zip Code' minLength='5' maxLength='10' onChange={(e) => this.props.zipCode(e.target.value)} />
              </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        </Grid.Row>
      </div>
    )
  }
}

render() {
    return (
      <div>
        <Grid centered>
          <Grid.Column width='six'>
            <Grid.Row centered columns='six' textAlign='center'>
              <h3 className='logo' onClick={() => {this.props.navigate(paths.HOME)}}>Why Label?</h3>
            </Grid.Row>

            <Grid.Row className='breadcrumb' centered columns='six' textAlign='center'>
              <Breadcrumb size='small'>
                <Breadcrumb.Section onClick={() => this.props.navigate(paths.CART)}>Cart</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section onClick={() => this.props.navigate(paths.CHECKOUT)}>Checkout</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Payment Method</Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Row>

            <Grid.Row centered className='shipping'>
              <Segment.Group>
                <Segment>Shipping Address: {this.props.info.shippingAddress} {this.props.info.usCity} {this.props.info.zipCode}</Segment>
                <Segment>Shipping: Standard (flat rate) - $10.00</Segment>
              </Segment.Group>
            </Grid.Row>

            <Grid.Row centered className='paymentInfo'>
              <h3>Payment Information</h3>
              <Segment.Group>
                <Segment>Credit Card</Segment>
                <Segment>
                  <Form>
                    <Form.Field required>
                      <input placeholder='Card Number' />
                    </Form.Field>
                    <Form.Group>
                      <Form.Field required width='eight'>
                        <input placeholder='Name on Card' />
                      </Form.Field>
                      <Form.Field required width='four'>
                        <input placeholder='MM/YY' />
                      </Form.Field>
                      <Form.Field required width='four'>
                        <input placeholder='CVV' />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Segment>
              </Segment.Group>
            </Grid.Row>

            <Grid.Row centered className='billingInfo'>
              <h3>Billing Address</h3>
              <Segment.Group>
                <Segment><Checkbox /> Same as shipping address</Segment>
                <Segment><Checkbox onChange={() => this.changeAddress()}/> Use a different billing address</Segment>
              </Segment.Group>
            </Grid.Row>

            {this.newBillingAddress()}

            <Grid.Row className='checkoutBottomRow' columns='sixteen'>
              <Grid.Column floated='left' width='eight'>
                <ul className='returnToCart'>
                  <li className='icon'><Icon name='chevron left' /></li>
                  <li><p>Return to checkout</p></li>
                </ul>
              </Grid.Column>
              <Grid.Column floated='right' width='eight'>
                <Button compact onClick={() => {this.placeOrder()}} size='large'>Place Order</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>

          <Grid.Column width='six' verticalAlign='top' className='rightSide'>
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
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.paymentReducer,
    states: state.paymentReducer.usStates,
    cart: state.cartReducer.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (route) => (dispatch(navigate(route))),
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
)(Payment)
