import React from "react";

/*Imports required for Form Group */
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

/*Imports required for Form Group */
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import "./style.css";

/*Imports required for React Calendar */
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

/*Imports required for input validation */
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      startDate: moment(),
      companyName: "",
      companyNames: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      companyNames: this.state.companyNames.concat(this.state.companyName)
    });
  }

  handleInputChange = e => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }


  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src="./logo.png" />
            <h1 className="float-right">&nbsp;Insure Compliance</h1>{" "}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <img src="./open3.jpg" alt="Construction workers" className="openingImage" />

        <Container className="mt-3">
          <Form>
            <FormGroup>
            <Label for="companyName">Company Name</Label>
            <Input type="select" name="select" id="exampleSelect">
                {this.state.companyNames.length === 0 ? 
                <option>...</option> :
                this.state.companyNames.map(option => 
                <option>{option}</option>
                )
                }
              </Input>
              <Label for="companyName">New Company Name?</Label>
              <Input
                type="text"
                name="companyName"
                id="companyName"
                placeholder="Enter the name of the company"
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dateOfRequest">Date of Request</Label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                placeholder="Enter date of request"
              />
            </FormGroup>
            <FormGroup>
              <Label for="paymentForTraining">
                Who is paying for Training?
              </Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>Producer</option>
                <option>Contract</option>
                <option>Direct Sale</option>
                <option>ARCA</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address of Training</Label>
              <Input
                type="text"
                name="trainingAddress"
                id="trainingAddress"
                placeholder="Enter the address of training"
              />
            </FormGroup>
            <FormGroup>
              <Label for="langOfTraining">Language of training</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>English</option>
                <option>Spanish</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="numStudents">Number of students</Label>
              <Input
                type="text"
                name="numStudents"
                id="numStudents"
                placeholder="Enter number of students"
              />
            </FormGroup>
            <FormGroup>
              <Label for="topic">Topic</Label>
              <Input
                type="text"
                name="topic"
                id="topic"
                placeholder="Enter the topic of training"
              />
            </FormGroup>
            <FormGroup>
              <Label for="contactName">Contact Person's Name</Label>
              <Input
                type="text"
                name="contactName"
                id="contactName"
                placeholder="Enter the name of the contact"
              />
            </FormGroup>
            <FormGroup>
              <Label for="contactEmail">Contact Person's Email</Label>
              <Input
                type="email"
                name="contactEmail"
                id="contactEmail"
                placeholder="Enter the email of the contact"
              />
            </FormGroup>
            <FormGroup>
              <Label for="contactPhone">Contact Person's Contact Number</Label>
              <Input
                type="text"
                name="contactPhone"
                id="contactPhone"
                placeholder="Enter the phone number of the contact"
              />
            </FormGroup>
            <FormGroup>
              <Label for="contactCell">
                Contact Person's Cell phone number
              </Label>
              <Input
                type="text"
                name="contactCell"
                id="contactCell"
                placeholder="Enter the cell number of the contact"
              />
            </FormGroup>
            <FormGroup>
              <Label for="instructions">
                Provide instructions to service provider
              </Label>
              <Input type="textarea" name="instructions" id="instructions" />
            </FormGroup>
            {/* Invoice */}
            {/* Address of delivery? 
        • Dates client is available 
        • Can training be held at client’s location, or does a space need to be rented, or is there a free location available? 
        • Equipment available at training site 
        • Equipment needed for training */}

            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}
