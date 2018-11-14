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

/*Imports for modals from reactstrap */
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

/*Imports required for Form Group */
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Container } from "reactstrap";

//Importing CSS for body, logo and table of the pdf generator
import "./style.css";

/*Imports required for React Calendar */
import DatePicker from "react-datepicker";
import moment from "moment";
import Moment from 'react-moment';
import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";

//Validation icons
import { FaPlus, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

//Importing cities and states for countries
import cities from "../../utils/cities.json";
import states from "../../utils/us-states.json";

//Connection to backend
import API from "../../utils/API";

//imports for PDF generation
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
window.html2canvas = html2canvas;

const styles = {
  'pdf': {
    'padding': '10px 10px',
    'height': '180mm',
    'width': '200mm'
  },
  'h4': {
    'color': '#000'
  },
  'logo': {
    'float': 'right',
    'height': '100px',
    'width': '300px'
  },
  'info': {
    'float': 'left'
  },
  'content': {
    'clear': 'both'
  },
  'quotation': {
    'fontFamily': 'Andika',
    'color': '#009999'
  },
  'billedTo': {
    'float': 'left'
  },
  'quote': {
    'float': 'right'
  },
  'FaPlus' : {
    'color' : '#339933'
  },
  'FaCheck': {
    'color' : '#339933'
  },
  'FaTimes' : {
    'color' : "#cc3300"
  },
  'note': {
    'fontFamily': 'Palatino Linotype',
    'fontSize': '0.75em',
    'fontWeight': '500'
  }

}

//Initialized outside to add new equipments on the fly
var equipmentsSelectedSite = [];
var equipmentsForTraining = [];

//Get employee names from API.js
var employees = []

//Get all US states
var us_states = []
for(let key in states){
  us_states.push(states[key]);
}

function getInitial(state){
  for(let key in states){
    if(states[key] === state){
      return key;  
    }
  }
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    //State variables for form elements and their validation
    this.state = {
      startDate: moment(),
      companyName: "",
      newCompanyName: "",
      companyNames: ["","5 D Construction","A-1 Restaurants","A&M","Aaron Clark Industries DBA Desert Foothills Landscape Management","ACS Engineering","Advance Lining","AK&J Sealants LLC","Alliance Plumbing","Alpha Group","Alpine","Alterra Pest Control","Ameri-fab","American Eagle Fire Protection","American Fire","American Leadership Academy","American Solar and Roofing","Apache Equipment Rentals","ARCA","Arion Care Solutions","Arizona Cooperative Therapies","Arizona Industries for the Blind (AIB)","Arizona Kawasaki","Arizona Materials","Arizona Pacific Pulp and Paper","Arizona Protection Agency","Arizona Roofing Contractor Association (ARCA)","Arizona Stone","Artisan Stone","Asprient Properties","AZ Border Transfer","AZ Industrial Pipeline Video","AZ Repair Masons","AZTechRadiology","Bestway Electric Motor","Beyond Stone","BIG Sur","Blount Contracting","Blue Sky Pest Control","BluePrint Hope High School","Bob's Roofing","Bonded Logic","Botta Concrete","Brakemax","Brown Brothers Asphalt","BSA","Burdette Cabinets","Burke and Happy Valley","Burke Basic","C & C Roofing","C&S Sweeping","C&S Sweeping","Caballero Dairy","CAID","Canyon State Drywall","Capilano Properties","Caretakers Landscaping and Tree Managment","CellularOne","Central Arizona Supply","Century Apartments","Certa Pro","Champagne Pools","Cheyenne River Sioux Tribe","Choice Academies","Cholla Livestock","Cholla Management Group","City of Maricopa","Classic Roofing","Clean Cut","ClearSky Auto","Clearwater","Clements Agency","Cobre Valley","Cochise Tech and Development","Community Care Solutions","Community Landscape Management","Cooper Roofing","Copperstate Metals","Countertop Creations","Courier Graphics","CoxReels","CPC","Crating Technology","Crazy Horse","Creative Innervisions LLC","CrossRoad Carriers","Crossroads for Women","Crum Plumbing","CSI","DADC","Dairyland Milk","Dalmolin Excavating Inc","DCB","Defense Pest Control","Desert Fleet","Desert Sun Moving","Desperado Dairy","DHI Communities","Dine BII Association for Disabled Citizens Inc","Dirt","Division 9","DMT","Dolphinaris","Door Mill","Dr. Erin Bradley Family Medicine","Drawer Connection, Inc","Dry Force","DuBrook","Duffy Development","Dugan Calf Farm","Duncan Families Farms","EFG America","Elite Roofing Supply","Embrey","Emergency Restoration","Ennssolutions","Epifini","Esteem Children's Services","Evergreen Turf","Family Support Resources","Farm Fresh","Felix Construction","FMG","Foam Experts Roofing Inc","Fondomonte","Frontline Exterminating","Garden House","GKD Management","GPM LandScape","Grabber Power Products","Granite Basin Roofing","GreenScapes","Gryphon Roofing","Haggai","Happy Valley","Haralson Tire","Hard Rock Concrete","Harvest Power Community Development Group Inc","Hensel Phelps","Houston Trucking","Hozhoni Foundation Inc","Hualapai","Huerta Trucking","Hurricane Fence Co","Hwal'bayBaj","Imagine Architectural Concrete","Inegrety Comercial Cleaning","Inn-Apartments","Innovative Green Technologies","Insure Compliance","InterMountain West Civil Contractors","Interstate Batteries","Invader Pest","JFN Mechanical","Jicarilla Apache Nation","JLC Roofing","JMH Trucking","JPCI","Juarez Contracting","Kann Enterprises_Interstate Batteries","KC Homes","Keystone","Kingman Academy of Learning","Kinkaid Civil Construction","La Canasta","Arizona Society of Safety Engineers (ASSE)","Lakin Milling","Larson Waste","LeBaron & Carroll","Leeds West Groups","Lehi Valley Trading","Leinbach Company Management Inc","LGO","Liberty Fence & Supply, LLC","Lifetime Roof Systems Inc.","Lindel Mechanical","LMC","LoneStar Trucking","Lumberjack Timber","Lyons Roofing","M&B Mechanical","Maddy's Pools","McManus Construction","Metal Masters Mechanical","Metric Roofing","Metro Fire Equipment Inc.","Metro Phoenix PHCC","Michael Brothers","MicroBlend","Mirage Plastering","Modern Paving","Monarch","National Fire Control","NCT","Neiders Company","New folder","New Horizon Youth Homes","New Western","Norman S Wright Co Inc.","Nunez Contracting","Old Tucson","Onni Properties","Otto Transportation","OTTO Trucking","Overleys","Overson Roofing","Paramount Roofing","Paramount Supply","Patriot Disposal","Paul Johnson Drywall","Paul Rich Roofing","Penguin Air","Perco Rock","PEST","Pete King Construction","Phoenix Extermination","Phoenix Recycling","Phoenix Towing Service","Pima Air & Space Museum","Pinal Feeding","Pinal Feeding Red River","PindernationElectric","Pinnacle Restoration","Pioneer Landscape","Pioneer Roofing Co","Planetary Science Institute","Platinum Plastering","Plexus","Plumb Plumbing","PM Plumbing","Prisma","ProSource Roofing","Pueblo of Sandia","Pueblo of Zuni","Pure Landscape","PVIC","Pyramid Technologies","Quechan Tribe","R.T. Brown","Rapid Material Transport","Red Mountain","Red Mountain Rentals","Regency Towers Assocation","Rest Assured","Right Away","Rigid Industries","Rigid Industries","RKS Plumbing","RO Landscape","Robert's Tire","Roberts Tire","Rocky mountain restoration","Romona Farms","Roofing Southwest","Roofing Supply Group","Rovey Dairy","RSG Roofing Supplies","SACATE","Sage","SAGE Counseling","Saguaro Trucking","SAK Plumbing","San Tan Landscape Management","Scottsdale Livestock","SFI","Sierra Signs","Sitting Bull College","Sonoran Air","Sonoran Landesign","Southwest rock","Specialty Orthopaedics","Spectrum","Sportsman Concrete","Stapley Action Garage Door","Star Roofing Inc","Steamy Concepts","Stillwater Landscape Mgmt","Stockwell Scientific","Storage Equipment Systems Inc","Sun City CareGivers","Sun Grinding","Sun State Plumbing","Sun Valley Supply","Sundance","Sunrise Crane Services Inc","Sunshine Acres","Sunshine Residential","Sunstate Plumbing","Sunstate Sweeping","Tecta America Arizona","Teledata","The Mahoney Group","The Maid Connection","The Manning Group","Titan Pest Control","TMC Landscape","Total Waste Management","Tree Doctors","Tremco","Trinsic on Broadway","Trinsic on Indian School","UEB","United Food Bank","Univeral Piping","USI Mesa Insulation","VIP Roofing","W. R. Schulz Properties","Weigand-Omega Management","Weinberger","Western Transport Logistics Inc.","Western Utility Contractors LLC","Whitfill Nursery","Winslow Indian Health Care Center","Wolf Waste LLC","Yavapai-Apache Cliff Castle Casino Hotel","Yavapai-Apache Nation","Young Builders Roofing - A-S Urethane Systems","Marlin Mechanical","Brooks Bros Utility","Prime Pest Control","The HUB Bar and Grill","5 Guys Construction","Zion Compassion Care","Banker Insulation","Cummings Plumming","Summit Inc","Austin Centers for Exceptional Students (ACES)","Sahara Development Inc. Tucson","Nexus Pool Care","J Bar G Restaurants LLC","DAS Products, Inc","Community Medical Services","Appliance Part Company","Saguaro Foundation","Solana Outdoor Living, LLC","Ron Brock's Heating and Cooling","Summit Insurance","Cool Touch, LLC","FLP, LLC","Little Priest College","T&T Cleaning and Restoration","Mt. Graham Hospital","Winnebago Tribe","United Tribes Technical College (UTTC)","TLC Supportive Living Services of Arizona Inc.","Green Valley Hospital","Young Future Tire","New Horizon Community Care","EPCOR Water","Arizona Provider Training (APT)","Aneva Solar LLC","Allegiant Health Care and Rehabilitation","Marc Community Resources Inc.","Central Arizona Project","HJ3","Apache Nugget","Pursuit Builders","Southwest Risk","Achilles AC","Hula Hut","Revamp Roofing","Tega Industries, Inc.","Dutt Hospitality Group","Standing Rock Sioux Tribe","Anthem Pest Control","All Things Metal","Environments by Rojas","State Seal","Cullum Homes Inc","Roofing Specialist","Sault Tribe","Spartan Electric Inc.","ConnectionsAZ","Arizona Sanitation Services","Liberty Companies","Coppertree Construction","Sunstate Plumbing","Reidhead Plumbing & Solar","Apache Medical Transport","Havasu Landing Resort and Casino","Royal Wall Systems","CAM Properties","Parks and Sons of Sun City","APCON Construction Co","West Coast Roofing","Picuris Pueblo","Royal Renovation","Mescalero Tribe","Hendel's Air Conditioning","CMMV LLC","Vroom","ITC AZ","Mountain Power Electircal","Sunrise Park Resort","South Eastern Arizona Behavioral Health","Proof. Pest Control","Caldwell Construction"],
      country: "United States",
      topic: "",
      producer: "",
      sameLocAsTraining: false,
      validCompanyName: false,
      validPhone: false,
      validEmail: false,
      validCellPhone: false,
      validZIP: false,
      contactPhone: 1,
      contactCellPhone: 1,
      contactEmail: "",
      state: "",
      streetAddress: "",
      city: "",
      zip: "",
      contactStreetAddress : "",
      contactZip : "",
      contactCountry: "United States",
      contactState: "",
      contactCity: "",
      equipmentsForSite: ["Laptop", "Projector Screen", "TV monitor", "Table", "Electrical power socket with extension cord"],
      equipmentsSelectedSite: [],
      equipmentsSelectedTraining: [],
      equipmentsForTraining : ["Laptop", "Projector Screen", "TV monitor", "Table", "Electrical power socket with extension cord", "Forklift training kit", "CPR mannequins", "First aid training bag", "AED training device", "Handouts"],
      active: true,
      addOn: "",
      error:{},
      modal: false,
      quotationIssuedBy: ""
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.validateCellPhone = this.validateCellPhone.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateZIP = this.validateZIP.bind(this);
    this.handleCompanyName = this.handleCompanyName.bind(this);
    this.handlePDF = this.handlePDF.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
    this.saveCompany = this.saveCompany.bind(this);
  }


  componentDidMount = () => {
    this.getEmployees();
  }
  //Toggling Navbar
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  saveCompany = () => {
    this.setState({
      companyName: this.state.newCompanyName
    });
    this.toggleModal();
    console.log(this.state.newCompanyName, this.state.companyName);
  }

  //Getting employees from server
  getEmployees(){
    API.getEmployees().then(function(res){
      for(let i = 0; i < res.data.length; ++i){
          employees.push(res.data[i].EMP_NAME)
      }
    });
  }

  //Generates pdf
  handlePDF = () => {
    var companyName = this.state.companyName;
    var startDate = this.state.startDate;
    var divHeight = document.getElementById('capture').offsetHeight;
    var divWidth = document.getElementById('capture').offsetWidth;
    return html2canvas(document.getElementById('capture'), {scale: 0.85, dpi: 278}).then(function(canvas){
      var wid= divWidth;
      var hgt= divHeight;
      var img = canvas.toDataURL("image/png", wid = canvas.width, hgt = canvas.height);
      var hratio = hgt/wid
      var doc = new jsPDF('p','mm','a4');
      var width = doc.internal.pageSize.width;    
      var height = width * hratio
      doc.addImage(img,'JPEG',20,25, width, height);
      console.log(startDate.toDate());
      doc.save(companyName + "-Quotation-" + startDate.format("MM/DD/YYYY") + ".pdf");
      });
    }

  handleCompanyName  = () => {
    if (this.state.companyName.length < 2 && this.state.newCompanyName.length < 2){
      this.setState({
        validCompanyName: false
      });
    }
    else{
      this.setState({
        validCompanyName: true
      });
    }
  }

  validatePhone = () => {
    var re = RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);
    this.setState({
      validPhone: re.test(this.state.contactPhone)
    });
  
  }

  validateCellPhone = () => {
    var re = RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);
    this.setState({
      validCellPhone: re.test(this.state.contactCellPhone)
    });
  }

  validateEmail = () => {
    var re = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.setState({validEmail: re.test(String(this.state.contactEmail).toLowerCase())});
  }

  validateZIP = () => {
    let zipRegex = RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
    this.setState({
      validZIP: zipRegex.test(this.state.zip)
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
    
    for(let i = 0; i < this.state.equipmentsForSite.length; ++i){
      if(document.getElementById("equipmentForSite"+ i).checked === true){
        equipmentsSelectedSite.push(document.getElementById("equipmentForSite"+ i).value);
      }
    }
    
    for(let i = 0; i < this.state.equipmentsForTraining.length; ++i){
      if(document.getElementById("equipmentsForTraining"+ i).checked === true){
        equipmentsForTraining.push(document.getElementById("equipmentsForTraining"+ i).value);
      }
    }
    console.log(equipmentsSelectedSite, equipmentsForTraining);
    var item = {
      startDate: this.state.startDate,
      companyName: this.state.companyName,
      country: this.state.country,
      topic: this.state.topic,
      contactPhone: this.state.contactPhone,
      contactCellPhone: this.state.contactCellPhone,
      contactEmail: this.state.contactEmail,
      state: this.state.state,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      zip: this.state.zip,
      producer: this.state.producer,
      contactStreetAddress : this.state.contactStreetAddress,
      contactZip : this.state.contactZip,
      contactCountry: this.state.contactCountry,
      contactState: this.state.contactState,
      contactCity: this.state.contactCity,
      equipmentsSelectedSite: equipmentsSelectedSite.join(", "),
      equipmentsSelectedTraining: equipmentsForTraining.join(", ")
  }
    API.postService(item)
    .then((res) => {console.log(res); document.getElementById("serviceRequestForm").reset();}
    ).catch(err => console.log(err));
    
  }

  handleInputChange = e => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
    this.validateEmail();
    this.validateZIP();
    this.validatePhone();
    this.validateCellPhone();
    this.handleCompanyName();
    this.setState({
      active: ((this.state.validCellPhone !== "undefined" && this.state.validCellPhone === true) || (this.state.validEmail !== "undefined" && this.state.validEmail === true) || (this.state.validPhone !== "undefined" && this.state.validPhone === true)) || this.state.validZIP && this.state.validCompanyName
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
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
          <Form id="serviceRequestForm">
            <FormGroup>
            <Label for="companyName">Company Name</Label>
            <Input type="select" name="companyName" id="companyNameSelect" onChange={this.handleInputChange} onClick={this.handleCompanyName}>
                {this.state.companyNames.length === 0 ? 
                <option name="companyName" value="">...</option> :
                this.state.companyNames.map(option => 
                <option>{option}</option>
                )
                }
              </Input>
              <Label for="newCompanyName">New Company?</Label>
              <div>
              <Button color="secondary" onClick={this.toggleModal}>Add new company</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Enter new company details      </ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label for="newCompanyName">
                        Company Name
                      </Label>
                      <Input type="text" name="newCompanyName" id="newCompanyName" placeholder="Enter company name" onChange={this.handleInputChange}/>

                      <Label for="newProducer">
                        Producer
                      </Label>
                      <Input type="text" name="newProducer" id="newProducer" placeholder="Enter producer's name" onChange={this.handleInputChange}/>

                    <Label for="newAgency">
                        Agency
                      </Label>
                      <Input type="text" name="newAgency" id="newAgency" placeholder="Enter agency's name" onChange={this.handleInputChange}/>

                      <Label for="newContractClients">
                        Contract Clients
                      </Label>
                      <Input type="text" name="newContractClients" id="newContractClients" placeholder="Enter client's names" onChange={this.handleInputChange}/>
                    </FormGroup>
                    <hr/>

                    <FormGroup id="newContactPhone">


                    <Label for="newContactName">
                        Contact Name
                      </Label>
                      <Input type="text" name="newContactName" id="newContactName" placeholder="Enter contact's name" onChange={this.handleInputChange}/>

                      <Label for="newContactEmail">
                        Contact Email ID
                      </Label>
                      <Input type="text" name="newContactEmail" id="newContactEmail" placeholder="Enter contact's email ID" onChange={this.handleInputChange}/>

                    <Label for="newContactOfficeNumber">
                        Contact Office Number
                      </Label>
                      <Input type="text" name="newContactOfficeNumber" id="newContactOfficeNumber" placeholder="Enter contact's office phone number" onChange={this.handleInputChange}/>

                      <Label for="newContactMobileNumber">
                        Contact Mobile Number
                      </Label>
                    <Input type="text" name="newContactMobileNumber" id="newContactMobileNumber" placeholder="Enter contact's mobile number" onChange={this.handleInputChange}/>

                      <Label for="newContactMobileAlternate">
                        Contact Alternate Mobile Number
                      </Label>
                      <Input type="text" name="newContactMobileAlternate" id="newContactMobileAlternate" placeholder="Enter contact's alternate mobile number" onChange={this.handleInputChange}/>                      

                      <Label for="mainContact">
                        Is this the main contact?
                      </Label><br/>
                      <input type="checkbox" id="check" name="mainContact" value={this.state.mainContact} checked = {this.state.mainContact} onClick={() => this.setState({mainContact: !this.state.mainContact})}/>
                      <br />

                    <b style = {styles.note}>Click on the plus icon to add more contacts</b> <br />
                      <div style={styles.FaPlus}><FaPlus/> </div>
                    </FormGroup>
                    

                    <hr/>
                    
                    <FormGroup id="newContactLocation">
                    <Label>Company Locations</Label> <br/>


                     <Label for="mainLocation">
                        Is this the main office location?
                      </Label><br/>
                      <input type="checkbox" id="check" name="mainLocation" value={this.state.mainLocation} checked = {this.state.mainLocation} onClick={() => this.setState({mainLocation: !this.state.mainLocation})}/>
                      <br />

                    <Label for="companyLocation">
                        Company Location
                      </Label>
                      <Input type="text" name="companyLocation" id="companyLocation" placeholder="Enter company's location" onChange={this.handleInputChange}/>                      


                    <Label for="newCompanyStreetAddress">
                        Street Address
                      </Label>
                      <Input type="text" name="newCompanyStreetAddress" id="newCompanyStreetAddress" placeholder="Enter street address" onChange={this.handleInputChange}/>                      

                    <Label for="newCompanyCity">
                        City
                      </Label>
                      <Input type="text" name="newCompanyCity" id="newCompanyCity" placeholder="Enter name of city" onChange={this.handleInputChange}/>                      

                    <Label for="newCompanyState">
                        State
                      </Label>
                      <Input type="text" name="newCompanyState" id="newCompanyState" placeholder="Enter name of state" onChange={this.handleInputChange}/>                      

                      <Label for="newCompanyZIP">
                        ZIP code
                      </Label>
                      <Input type="text" name="newCompanyZIP" id="newCompanyZIP" placeholder="Enter ZIP code" onChange={this.handleInputChange}/>                      

                      <Label for="newCompanyCountry">
                        Country
                      </Label>
                      <Input type="text" name="newCompanyCountry" id="newCompanyCountry" placeholder="Enter name of country" onChange={this.handleInputChange}/>                      
                    
                    <b style = {styles.note}>Click on the plus icon to add more locations</b><br />
                    <div style={styles.FaPlus}><FaPlus/> </div>
                    </FormGroup>
                    

                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.saveCompany}>Save company</Button>
                  <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>

              {(this.state.validCompanyName) ? <FaCheckCircle style = {styles.FaCheck}/> : <FaTimesCircle style = {styles.FaTimes} />}
            </FormGroup>
            <FormGroup>
              <Label for="dateOfRequest">Date of Request</Label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                name="startDate"
                placeholder="Enter date of request"
              />
            </FormGroup>
            <FormGroup>
              <Label for="paymentForTraining">
                Who is paying for the Service?
              </Label>
              <Input type="select" name="paymentForTraining" id="paymentForTraining" onChange={this.handleInputChange}>
                <option name="paymentForTraining" value={""}>...</option>
                <option name="paymentForTraining" value={"Producer"}>Producer</option>
                <option name="paymentForTraining" value={"Contract"}>Contract</option>
                <option name="paymentForTraining" value={"Direct Sale"}>Direct Sale</option>
                <option name="paymentForTraining" value={"ARCA"}>ARCA</option>
              </Input>
              {(this.state.paymentForTraining) ? <FaCheckCircle style = {styles.FaCheck}/> : <FaTimesCircle style = {styles.FaTimes} />}
            </FormGroup>

            <FormGroup>
              <Label for="producer">
                Producer
              </Label>
              <Input
                type="text"
                name="producer"
                id="producer"
                placeholder="Enter name of producer"
                onChange={this.handleInputChange}
              />
            </FormGroup>

              <FormGroup>
              <Label for="topic">Topic</Label>
              <Input type="select" name="topic" id="topic" onChange={this.handleInputChange}>
                <option name="topic" value={""}>...</option>
                <option name="topic" value={"Training"}>Training</option>
                <option name="topic" value={"1"}>1</option>
                <option name="topic" value={"2"}>2</option>
                <option name="topic" value={"3"}>3</option>
                <option name="topic" value={"Other"}>Other</option>
              </Input>
              {(this.state.topic.length) > 0 && this.state.topic !== "Other" ? <FaCheckCircle style = {styles.FaCheck}/> : <FaTimesCircle style = {styles.FaTimes} />}
            </FormGroup>
                
            {
            this.state.topic === "Other" ? (
              <FormGroup>
              <Label for="topic">Enter new topic</Label>
              <Input
                type="text"
                name="topic"
                id="topic"
                placeholder="Enter new topic"
                onChange={this.handleInputChange}
              />
              {(this.state.topic.length) > 0 ? <FaCheckCircle style = {styles.FaCheck}/> : <FaTimesCircle style = {styles.FaTimes} />}
              </FormGroup>
            ) : ""
            }

            {this.state.topic === "Training" ? (
              <FormGroup className = "training" id= "training">
              <Label for="address">Address of Training</Label><br />
              <Label for="streetAddress">Street Address</Label>
              <Input
                type="text"
                name="streetAddress"
                id="streetAddress"
                placeholder="Street Address"
                onChange={this.handleInputChange}
              />
              <Label for="zip">ZIP</Label>
              <Input
                type="text"
                name="zip"
                id="zip"
                placeholder="ZIP"
                onChange={this.handleInputChange}
              />
              {(this.state.validZIP) > 0 ? <FaCheckCircle style = {styles.FaCheck}/> : <FaTimesCircle style = {styles.FaTimes} />}
              <br/>
              <Label for="country">Country</Label>
              <Input type="select" name="country" id="country" onChange={this.handleInputChange}>
                <option>United States</option>
                {Object.keys(cities).map(country => <option>{country}</option>)}
              </Input>
              <Label for="state">State</Label>
              <Input type="select" name="state" id="state" onChange={this.handleInputChange}>
                <option>Arizona</option>
                {us_states.map(state => <option>{state}</option>)}
              </Input>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Enter City"
                onChange={this.handleInputChange}
              />
             
              <Label for="langOfTraining">Language of training</Label>
              <Input type="select" name="langTraining" id="langTraining" onChange={this.handleInputChange}>
                <option name="langTraining" value="">...</option>
                <option name="langTraining" value="English">English</option>
                <option name="langTraining" value="Spanish">Spanish</option>
                <option name="langTraining" value="Bilingual">Bilingual</option>
              </Input>
            
            
            
              <Label for="numStudents">Number of students</Label>
              <Input
                type="text"
                name="numStudents"
                id="numStudents"
                placeholder="Enter number of students"
                onChange={this.handleInputChange}
              />
            
            </FormGroup>) : ""}
            
            <FormGroup>
              <Label for="contactFirstName">Contact Person's First Name</Label>
              <Input
                type="text"
                name="contactFirstName"
                id="contactFirstName"
                placeholder="Enter first name"
                onChange={this.handleInputChange}
              />
              </FormGroup>
              <FormGroup>
              <Label for="contactLastName">Contact Person's Last Name</Label>
              <Input
                type="text"
                name="contactLastName"
                id="contactLastName"
                placeholder="Enter last name"
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="contactEmail">Contact Person's Email</Label>
              <Input
                type="email"
                name="contactEmail"
                id="contactEmail"
                placeholder="Valid email format example@test.com"
                onChange={this.handleInputChange}
              />
              {(this.state.validEmail) ? <FaCheckCircle style = {styles.FaCheck}/> : <FaTimesCircle style = {styles.FaTimes} />}
            </FormGroup>
            <FormGroup>
              <Label for="contactPhone">Contact Person's Contact Number</Label><br />
              <Input
                type="text"
                name="contactPhone"
                id="contactPhone"
                placeholder="Valid phone format example +1 (999) 999-999"
                onChange = {this.handleInputChange}
              />
              {(this.state.validPhone) ? <FaCheckCircle style = {styles.FaCheck}/> : <FaTimesCircle style = {styles.FaTimes} />}
            </FormGroup>
            <FormGroup>
              <Label for="contactCell">
                Contact Person's Cell phone number
              </Label>
              <Input
                type="text"
                name="contactCellPhone"
                id="contactCellPhone"
                placeholder="Enter the cell number of the contact"
                onChange={this.handleInputChange}
              />
              {(this.state.validCellPhone) ? <FaCheckCircle style = {styles.FaCheck}/> : <FaTimesCircle style = {styles.FaTimes} />}
            </FormGroup>

        
              <div>
              {(this.state.topic === "Training") ? 
              <div>
              <Label for="sameLocAsTraining">Same Location as Training? </Label>
              <br />
              <input type="checkbox" id="check" name="sameLocAsTraining" value={this.state.sameLocAsTraining} checked = {this.state.sameLocAsTraining} onChange={this.handleInputChange} onClick={e => {this.setState({sameLocAsTraining: !this.state.sameLocAsTraining})
              if (this.state.sameLocAsTraining){
                this.setState(
                  {
                    contactStreetAddress : this.state.streetAddress,
                    contactZip : this.state.zip,
                    contactCountry: this.state.country,
                    contactState: this.state.state,
                    contactCity: this.state.city
                  }
                )
              }
              }}/>
              </div>
               : ""}
              <br/>
              {this.state.sameLocAsTraining ? "" :
              (<FormGroup className = "training" id= "training">
              <Label for="address">Contact Address</Label><br />
              <Label for="streetAddress">Street Address</Label>
              <Input
                type="text"
                name="contactStreetAddress"
                id="contactStreetAddress"
                placeholder="Street Address"
                onChange={this.handleInputChange}
              />
              <Label for="contactZip">ZIP</Label>
              <Input
                type="text"
                name="contactZip"
                id="contactZip"
                placeholder="ZIP code"
                onChange={this.handleInputChange}
              />
              <Label for="contactCountry">Country</Label>
              <Input type="select" name="contactCountry" id="contactCountry" onChange={this.handleInputChange}>
                <option>United States</option>
                {Object.keys(cities).map(country => <option>{country}</option>)}
              </Input>
              <Label for="contactState">State</Label>
              <Input type="select" name="contactState" id="contactState" onChange={this.handleInputChange}>
                <option>Arizona</option>
                {us_states.map(state => <option>{state}</option>)}
              </Input>
              <Label for="contactCity">City</Label>
              <Input
                type="text"
                name="contactCity"
                id="contactCity"
                placeholder="Enter City"
                onChange={this.handleInputChange}
              />
            </FormGroup>)
          }  
              
          <FormGroup>
          <Label for="equipmentForSite">Equipment needed for site</Label>
          {this.state.equipmentsForSite.map((x, index) => {
            return (
            <div>
            <input type="checkbox" id={"equipmentForSite" + index} name={"equipmentForSite" + index} value={x}/>{x}
            </div>)
          })}

          </FormGroup>

          <FormGroup>
          <Label for="equipmentForTraining">Equipment needed for training</Label>
          {this.state.equipmentsForTraining.map((x, index) => {
            return (
            <div>
            <input type="checkbox" id={"equipmentsForTraining" + index} name={"equipmentsForTraining" + index} value={x} />{x}
            </div>)
          })}
          
          <Label for="additionalEquipment">Need additional equipment? Add it here</Label>
            <Input type = "text" name = "addOn" id= "addOn" value={this.state.addOn} onChange = {this.handleInputChange}/>
            <div style={styles.FaPlus}><FaPlus onClick = {() => {if(this.state.addOn.trim() !== ""){equipmentsSelectedSite.push(this.state.addOn.trim())}}}/> </div>
            
          </FormGroup>

          


              </div>

            <FormGroup>
              <Label for="instructions">
                Provide instructions to service provider
              </Label>
              <Input type="textarea" name="instructions" id="instructions" onChange={this.handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label for="quotationIssuedBy">
              Quotation Issued By
              </Label>
              <Input type="select" name="quotationIssuedBy" id="quotationIssuedBy" onChange={this.handleInputChange}>
                {employees.map((x,index) => <option key={"emp" + index} value={x}>{x}</option>)}
              </Input>
            </FormGroup>

            <Button name = "active" onClick={this.handleSubmit} disabled={!this.state.active}>Submit</Button> &nbsp;
            <Button onClick = {this.handlePDF}>Print</Button>
          </Form>
          <br/>
          
        <div>
          
        <div id='capture' style={styles.pdf}>
        <div>
        <div style = {styles.info}>
        Insure Compliance, LLC<br/>
        4406 E Main St 102-58<br/>
        Mesa, AZ 85205 US<br/>
        (866) 647-2373<br/>
        insurecompliance.net<br/>
        </div>
        <img src="./Capture.PNG" alt="Company logo" style={styles.logo}/>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div style = {styles.content}>
        <h3 style={styles.quotation}>QUOTATION</h3>
        
        <div>
          <div style = {styles.billedTo}>
          <b>ADDRESS</b><br/>
          {this.state.companyName}<br/>
          {this.state.contactStreetAddress}<br/>
          {this.state.contactCity} {getInitial(this.state.contactState)}{this.state.contactZip}<br/>
          
          </div>

          <div style = {styles.quote}>
          <b>QUOTATION</b> # 1023 &nbsp; <br />
          <b>DATE</b> <Moment format="YYYY/MM/DD" date={this.state.startDate}/> &nbsp; <br />
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <hr style = {styles.quotation}/>

        <div>
          <div style = {styles.billedTo}>
          <b>QUOTATION ISSUED BY</b> &nbsp;{this.state.quotationIssuedBy}<br/>
          </div>

          <div style = {styles.quote}>
          <b>QUOTATION VALID THRU</b>&nbsp; 
          06/07/2017 <br />
          </div>
        </div>

        <br />
        <br />

        <table id="customers">
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Königlich Essen</td>
            <td>Philip Cramer</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
          <tr>
            <td>North/South</td>
            <td>Simon Crowther</td>
            <td>UK</td>
          </tr>
        </table>

        <br />
        <hr style = {styles.quotation}/>
        <div style = {styles.quote}><b>TOTAL</b> VALUE</div>
        <br/>
        <div>
          <div style = {styles.billedTo}>
            <b>Accepted by</b>
          </div>

          <div style = {styles.quote}>
            <b>Accepted Date</b>
          </div>
        </div>
        
</div>
        </div>
        </div>
        </Container>
      </div>
    );
  }
}