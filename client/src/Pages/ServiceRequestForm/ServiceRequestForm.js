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
import validator from 'validator';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Base64} from "js-base64";

import { Table } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      startDate: moment(),
      companyName: "",
      companyNames: ["Company","5 D Construction","A-1 Restaurants","A&M","Aaron Clark Industries DBA Desert Foothills Landscape Management","ACS Engineering","Advance Lining","AK&J Sealants LLC","Alliance Plumbing","Alpha Group","Alpine","Alterra Pest Control","Ameri-fab","American Eagle Fire Protection","American Fire","American Leadership Academy","American Solar and Roofing","Apache Equipment Rentals","ARCA","Arion Care Solutions","Arizona Cooperative Therapies","Arizona Industries for the Blind (AIB)","Arizona Kawasaki","Arizona Materials","Arizona Pacific Pulp and Paper","Arizona Protection Agency","Arizona Roofing Contractor Association (ARCA)","Arizona Stone","Artisan Stone","Asprient Properties","AZ Border Transfer","AZ Industrial Pipeline Video","AZ Repair Masons","AZTechRadiology","Bestway Electric Motor","Beyond Stone","BIG Sur","Blount Contracting","Blue Sky Pest Control","BluePrint Hope High School","Bob's Roofing","Bonded Logic","Botta Concrete","Brakemax","Brown Brothers Asphalt","BSA","Burdette Cabinets","Burke and Happy Valley","Burke Basic","C & C Roofing","C&S Sweeping","C&S Sweeping","Caballero Dairy","CAID","Canyon State Drywall","Capilano Properties","Caretakers Landscaping and Tree Managment","CellularOne","Central Arizona Supply","Century Apartments","Certa Pro","Champagne Pools","Cheyenne River Sioux Tribe","Choice Academies","Cholla Livestock","Cholla Management Group","City of Maricopa","Classic Roofing","Clean Cut","ClearSky Auto","Clearwater","Clements Agency","Cobre Valley","Cochise Tech and Development","Community Care Solutions","Community Landscape Management","Cooper Roofing","Copperstate Metals","Countertop Creations","Courier Graphics","CoxReels","CPC","Crating Technology","Crazy Horse","Creative Innervisions LLC","CrossRoad Carriers","Crossroads for Women","Crum Plumbing","CSI","DADC","Dairyland Milk","Dalmolin Excavating Inc","DCB","Defense Pest Control","Desert Fleet","Desert Sun Moving","Desperado Dairy","DHI Communities","Dine BII Association for Disabled Citizens Inc","Dirt","Division 9","DMT","Dolphinaris","Door Mill","Dr. Erin Bradley Family Medicine","Drawer Connection, Inc","Dry Force","DuBrook","Duffy Development","Dugan Calf Farm","Duncan Families Farms","EFG America","Elite Roofing Supply","Embrey","Emergency Restoration","Ennssolutions","Epifini","Esteem Children's Services","Evergreen Turf","Family Support Resources","Farm Fresh","Felix Construction","FMG","Foam Experts Roofing Inc","Fondomonte","Frontline Exterminating","Garden House","GKD Management","GPM LandScape","Grabber Power Products","Granite Basin Roofing","GreenScapes","Gryphon Roofing","Haggai","Happy Valley","Haralson Tire","Hard Rock Concrete","Harvest Power Community Development Group Inc","Hensel Phelps","Houston Trucking","Hozhoni Foundation Inc","Hualapai","Huerta Trucking","Hurricane Fence Co","Hwal'bayBaj","Imagine Architectural Concrete","Inegrety Comercial Cleaning","Inn-Apartments","Innovative Green Technologies","Insure Compliance","InterMountain West Civil Contractors","Interstate Batteries","Invader Pest","JFN Mechanical","Jicarilla Apache Nation","JLC Roofing","JMH Trucking","JPCI","Juarez Contracting","Kann Enterprises_Interstate Batteries","KC Homes","Keystone","Kingman Academy of Learning","Kinkaid Civil Construction","La Canasta","Arizona Society of Safety Engineers (ASSE)","Lakin Milling","Larson Waste","LeBaron & Carroll","Leeds West Groups","Lehi Valley Trading","Leinbach Company Management Inc","LGO","Liberty Fence & Supply, LLC","Lifetime Roof Systems Inc.","Lindel Mechanical","LMC","LoneStar Trucking","Lumberjack Timber","Lyons Roofing","M&B Mechanical","Maddy's Pools","McManus Construction","Metal Masters Mechanical","Metric Roofing","Metro Fire Equipment Inc.","Metro Phoenix PHCC","Michael Brothers","MicroBlend","Mirage Plastering","Modern Paving","Monarch","National Fire Control","NCT","Neiders Company","New folder","New Horizon Youth Homes","New Western","Norman S Wright Co Inc.","Nunez Contracting","Old Tucson","Onni Properties","Otto Transportation","OTTO Trucking","Overleys","Overson Roofing","Paramount Roofing","Paramount Supply","Patriot Disposal","Paul Johnson Drywall","Paul Rich Roofing","Penguin Air","Perco Rock","PEST","Pete King Construction","Phoenix Extermination","Phoenix Recycling","Phoenix Towing Service","Pima Air & Space Museum","Pinal Feeding","Pinal Feeding Red River","PindernationElectric","Pinnacle Restoration","Pioneer Landscape","Pioneer Roofing Co","Planetary Science Institute","Platinum Plastering","Plexus","Plumb Plumbing","PM Plumbing","Prisma","ProSource Roofing","Pueblo of Sandia","Pueblo of Zuni","Pure Landscape","PVIC","Pyramid Technologies","Quechan Tribe","R.T. Brown","Rapid Material Transport","Red Mountain","Red Mountain Rentals","Regency Towers Assocation","Rest Assured","Right Away","Rigid Industries","Rigid Industries","RKS Plumbing","RO Landscape","Robert's Tire","Roberts Tire","Rocky mountain restoration","Romona Farms","Roofing Southwest","Roofing Supply Group","Rovey Dairy","RSG Roofing Supplies","SACATE","Sage","SAGE Counseling","Saguaro Trucking","SAK Plumbing","San Tan Landscape Management","Scottsdale Livestock","SFI","Sierra Signs","Sitting Bull College","Sonoran Air","Sonoran Landesign","Southwest rock","Specialty Orthopaedics","Spectrum","Sportsman Concrete","Stapley Action Garage Door","Star Roofing Inc","Steamy Concepts","Stillwater Landscape Mgmt","Stockwell Scientific","Storage Equipment Systems Inc","Sun City CareGivers","Sun Grinding","Sun State Plumbing","Sun Valley Supply","Sundance","Sunrise Crane Services Inc","Sunshine Acres","Sunshine Residential","Sunstate Plumbing","Sunstate Sweeping","Tecta America Arizona","Teledata","The Mahoney Group","The Maid Connection","The Manning Group","Titan Pest Control","TMC Landscape","Total Waste Management","Tree Doctors","Tremco","Trinsic on Broadway","Trinsic on Indian School","UEB","United Food Bank","Univeral Piping","USI Mesa Insulation","VIP Roofing","W. R. Schulz Properties","Weigand-Omega Management","Weinberger","Western Transport Logistics Inc.","Western Utility Contractors LLC","Whitfill Nursery","Winslow Indian Health Care Center","Wolf Waste LLC","Yavapai-Apache Cliff Castle Casino Hotel","Yavapai-Apache Nation","Young Builders Roofing - A-S Urethane Systems","Marlin Mechanical","Brooks Bros Utility","Prime Pest Control","The HUB Bar and Grill","5 Guys Construction","Zion Compassion Care","Banker Insulation","Cummings Plumming","Summit Inc","Austin Centers for Exceptional Students (ACES)","Sahara Development Inc. Tucson","Nexus Pool Care","J Bar G Restaurants LLC","DAS Products, Inc","Community Medical Services","Appliance Part Company","Saguaro Foundation","Solana Outdoor Living, LLC","Ron Brock's Heating and Cooling","Summit Insurance","Cool Touch, LLC","FLP, LLC","Little Priest College","T&T Cleaning and Restoration","Mt. Graham Hospital","Winnebago Tribe","United Tribes Technical College (UTTC)","TLC Supportive Living Services of Arizona Inc.","Green Valley Hospital","Young Future Tire","New Horizon Community Care","EPCOR Water","Arizona Provider Training (APT)","Aneva Solar LLC","Allegiant Health Care and Rehabilitation","Marc Community Resources Inc.","Central Arizona Project","HJ3","Apache Nugget","Pursuit Builders","Southwest Risk","Achilles AC","Hula Hut","Revamp Roofing","Tega Industries, Inc.","Dutt Hospitality Group","Standing Rock Sioux Tribe","Anthem Pest Control","All Things Metal","Environments by Rojas","State Seal","Cullum Homes Inc","Roofing Specialist","Sault Tribe","Spartan Electric Inc.","ConnectionsAZ","Arizona Sanitation Services","Liberty Companies","Coppertree Construction","Sunstate Plumbing","Reidhead Plumbing & Solar","Apache Medical Transport","Havasu Landing Resort and Casino","Royal Wall Systems","CAM Properties","Parks and Sons of Sun City","APCON Construction Co","West Coast Roofing","Picuris Pueblo","Royal Renovation","Mescalero Tribe","Hendel's Air Conditioning","CMMV LLC","Vroom","ITC AZ","Mountain Power Electircal","Sunrise Park Resort","South Eastern Arizona Behavioral Health","Proof. Pest Control","Caldwell Construction"],
      errors: {
        companyName: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.printDocument = this.printDocument.bind(this);
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

  printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgData1 = 'data:image/png;base64,'+ Base64.encode('logo.png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  required = (value) => {
    if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return 'require';
    }
  }
   
  email = (value) => {
    if (!validator.isEmail(value)) {
      return `${value} is not a valid email.`
    }
  }
   
  lt = (value, props) => {
    // get the maxLength from component's props
    if (!value.toString().trim().length > props.maxLength) {
      // Return jsx
      return <span className="error">The value exceeded {props.maxLength} symbols.</span>
    }
  }
   
  password = (value, props, components) => {
    // NOTE: Tricky place. The 'value' argument is always current component's value.
    // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
    // But if we're changing 'confirm' component - the condition will always be true
    // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
    if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
      // 'confirm' - name of input
      // components['confirm'] - array of same-name components because of checkboxes and radios
      return <span className="error">Passwords are not equal.</span>
    }
  }

  validate(email, password) {
    // true means invalid, so our conditions got reversed
    return {
      email: email.length === 0,
      password: password.length === 0,
    };
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

          <div>
      <div className="mb5">
      <br />
        <Button onClick={this.printDocument}>Print</Button>
      </div>
      <div id="divToPrint" className="mt4">
        {/* <div>Note: Here the dimensions of div are same as A4</div> 
        <div>You Can add any component here</div> */}
        <img src = "logo.png" alt="Insure Compliance Logo" />
        <h5>Insure Compliance</h5>
        <h7>Service Request Form</h7>
        <br/>
        <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
        </Table>

      </div>
    </div>
        </Container>
      </div>
    );
  }
}
