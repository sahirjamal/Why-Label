import React from 'react';
import { connect } from 'react-redux';
import Styling from '../styling/checkoutPage.css';

import { Container, Select, Input, Grid, Form, Header, Button, Checkbox, List, Image, Label, Dropdown, Breadcrumb } from 'semantic-ui-react';
import { firstName, lastName, phoneNumber, emailAddress, shippingAddress, shippingAddress2, usCity, selectedState, zipCode } from '../actions/index';
import checkoutReducer from '../reducers/checkoutReducer';
import paths from '../paths.config';
import uuid from 'uuid/v4';

let state = '';

class Checkout extends React.Component {

changeState(event, data) {
  const results = (`${JSON.stringify(data, null, 2)}`);
  const resultsObject = JSON.parse(results);
  state = resultsObject.value;
}

async paymentButton() {
  await this.props.selectedState(state);
  await console.log('redux state', this.props.all);
}

render() {
    return (
      <div className='homePage'>
        <Grid centered>
          <Grid.Column width='eight'>
            <Grid.Row centered columns='six' textAlign='center'>
              <h3>Why Label?</h3>
              <Breadcrumb size='small'>
                <Breadcrumb.Section link>Cart</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Checkout</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section>Shipping Method</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section>Payment Method</Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Row>

            <Grid.Row centered>
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
                <Form.Field required width='sixteen'>
                    <label>Phone Number</label>
                    <input placeholder='Phone Number' onChange={(e) => this.props.phoneNumber(e.target.value)}/>
                </Form.Field>
                <Form.Field required width='sixteen'>
                    <label>Email Address</label>
                    <input placeholder='Email Address' onChange={(e) => this.props.emailAddress(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                  <Checkbox checked label='I would like to subscribe to emails' />
                </Form.Field>
              </Form>
            </Grid.Row>

            <Grid.Row centered>
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

            <Grid.Row columns='two' className='bottomRow'>
              <Grid.Column width='eight' verticalAlign='middle'>
              <p className='returnToCart'>Return to CART</p>
              </Grid.Column>
              <Grid.Column width='eight'>
              <Button className='shippingButton' onClick={() => {this.paymentButton()}} size='large'>Continue to Shipping Method</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>


          




          <Grid.Column width='six'>
            <h4>yo</h4>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    all: state.checkoutReducer,
    states: state.checkoutReducer.usStates,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
