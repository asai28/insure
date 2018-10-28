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
import { Button, Form, FormGroup, Label, Input, CustomInput } from "reactstrap";
import { Container } from "reactstrap";
import "./style.css";

/*Imports required for React Calendar */
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import { FaPlus, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

/*Imports required for input validation */
import 'react-inputs-validation/lib/react-inputs-validation.min.css';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import cities from "../../utils/cities.json";

import API from "../../utils/API";

const styles = {
  'FaPlus' : {
    'color' : '#339933'
  },
  'FaCheck': {
    'color' : '#339933'
  },
  'FaTimes' : {
    'color' : "#cc3300"
  }

}

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      startDate: moment(),
      companyName: "",
      companyNames: ["5 D Construction","A-1 Restaurants","A&M","Aaron Clark Industries DBA Desert Foothills Landscape Management","ACS Engineering","Advance Lining","AK&J Sealants LLC","Alliance Plumbing","Alpha Group","Alpine","Alterra Pest Control","Ameri-fab","American Eagle Fire Protection","American Fire","American Leadership Academy","American Solar and Roofing","Apache Equipment Rentals","ARCA","Arion Care Solutions","Arizona Cooperative Therapies","Arizona Industries for the Blind (AIB)","Arizona Kawasaki","Arizona Materials","Arizona Pacific Pulp and Paper","Arizona Protection Agency","Arizona Roofing Contractor Association (ARCA)","Arizona Stone","Artisan Stone","Asprient Properties","AZ Border Transfer","AZ Industrial Pipeline Video","AZ Repair Masons","AZTechRadiology","Bestway Electric Motor","Beyond Stone","BIG Sur","Blount Contracting","Blue Sky Pest Control","BluePrint Hope High School","Bob's Roofing","Bonded Logic","Botta Concrete","Brakemax","Brown Brothers Asphalt","BSA","Burdette Cabinets","Burke and Happy Valley","Burke Basic","C & C Roofing","C&S Sweeping","C&S Sweeping","Caballero Dairy","CAID","Canyon State Drywall","Capilano Properties","Caretakers Landscaping and Tree Managment","CellularOne","Central Arizona Supply","Century Apartments","Certa Pro","Champagne Pools","Cheyenne River Sioux Tribe","Choice Academies","Cholla Livestock","Cholla Management Group","City of Maricopa","Classic Roofing","Clean Cut","ClearSky Auto","Clearwater","Clements Agency","Cobre Valley","Cochise Tech and Development","Community Care Solutions","Community Landscape Management","Cooper Roofing","Copperstate Metals","Countertop Creations","Courier Graphics","CoxReels","CPC","Crating Technology","Crazy Horse","Creative Innervisions LLC","CrossRoad Carriers","Crossroads for Women","Crum Plumbing","CSI","DADC","Dairyland Milk","Dalmolin Excavating Inc","DCB","Defense Pest Control","Desert Fleet","Desert Sun Moving","Desperado Dairy","DHI Communities","Dine BII Association for Disabled Citizens Inc","Dirt","Division 9","DMT","Dolphinaris","Door Mill","Dr. Erin Bradley Family Medicine","Drawer Connection, Inc","Dry Force","DuBrook","Duffy Development","Dugan Calf Farm","Duncan Families Farms","EFG America","Elite Roofing Supply","Embrey","Emergency Restoration","Ennssolutions","Epifini","Esteem Children's Services","Evergreen Turf","Family Support Resources","Farm Fresh","Felix Construction","FMG","Foam Experts Roofing Inc","Fondomonte","Frontline Exterminating","Garden House","GKD Management","GPM LandScape","Grabber Power Products","Granite Basin Roofing","GreenScapes","Gryphon Roofing","Haggai","Happy Valley","Haralson Tire","Hard Rock Concrete","Harvest Power Community Development Group Inc","Hensel Phelps","Houston Trucking","Hozhoni Foundation Inc","Hualapai","Huerta Trucking","Hurricane Fence Co","Hwal'bayBaj","Imagine Architectural Concrete","Inegrety Comercial Cleaning","Inn-Apartments","Innovative Green Technologies","Insure Compliance","InterMountain West Civil Contractors","Interstate Batteries","Invader Pest","JFN Mechanical","Jicarilla Apache Nation","JLC Roofing","JMH Trucking","JPCI","Juarez Contracting","Kann Enterprises_Interstate Batteries","KC Homes","Keystone","Kingman Academy of Learning","Kinkaid Civil Construction","La Canasta","Arizona Society of Safety Engineers (ASSE)","Lakin Milling","Larson Waste","LeBaron & Carroll","Leeds West Groups","Lehi Valley Trading","Leinbach Company Management Inc","LGO","Liberty Fence & Supply, LLC","Lifetime Roof Systems Inc.","Lindel Mechanical","LMC","LoneStar Trucking","Lumberjack Timber","Lyons Roofing","M&B Mechanical","Maddy's Pools","McManus Construction","Metal Masters Mechanical","Metric Roofing","Metro Fire Equipment Inc.","Metro Phoenix PHCC","Michael Brothers","MicroBlend","Mirage Plastering","Modern Paving","Monarch","National Fire Control","NCT","Neiders Company","New folder","New Horizon Youth Homes","New Western","Norman S Wright Co Inc.","Nunez Contracting","Old Tucson","Onni Properties","Otto Transportation","OTTO Trucking","Overleys","Overson Roofing","Paramount Roofing","Paramount Supply","Patriot Disposal","Paul Johnson Drywall","Paul Rich Roofing","Penguin Air","Perco Rock","PEST","Pete King Construction","Phoenix Extermination","Phoenix Recycling","Phoenix Towing Service","Pima Air & Space Museum","Pinal Feeding","Pinal Feeding Red River","PindernationElectric","Pinnacle Restoration","Pioneer Landscape","Pioneer Roofing Co","Planetary Science Institute","Platinum Plastering","Plexus","Plumb Plumbing","PM Plumbing","Prisma","ProSource Roofing","Pueblo of Sandia","Pueblo of Zuni","Pure Landscape","PVIC","Pyramid Technologies","Quechan Tribe","R.T. Brown","Rapid Material Transport","Red Mountain","Red Mountain Rentals","Regency Towers Assocation","Rest Assured","Right Away","Rigid Industries","Rigid Industries","RKS Plumbing","RO Landscape","Robert's Tire","Roberts Tire","Rocky mountain restoration","Romona Farms","Roofing Southwest","Roofing Supply Group","Rovey Dairy","RSG Roofing Supplies","SACATE","Sage","SAGE Counseling","Saguaro Trucking","SAK Plumbing","San Tan Landscape Management","Scottsdale Livestock","SFI","Sierra Signs","Sitting Bull College","Sonoran Air","Sonoran Landesign","Southwest rock","Specialty Orthopaedics","Spectrum","Sportsman Concrete","Stapley Action Garage Door","Star Roofing Inc","Steamy Concepts","Stillwater Landscape Mgmt","Stockwell Scientific","Storage Equipment Systems Inc","Sun City CareGivers","Sun Grinding","Sun State Plumbing","Sun Valley Supply","Sundance","Sunrise Crane Services Inc","Sunshine Acres","Sunshine Residential","Sunstate Plumbing","Sunstate Sweeping","Tecta America Arizona","Teledata","The Mahoney Group","The Maid Connection","The Manning Group","Titan Pest Control","TMC Landscape","Total Waste Management","Tree Doctors","Tremco","Trinsic on Broadway","Trinsic on Indian School","UEB","United Food Bank","Univeral Piping","USI Mesa Insulation","VIP Roofing","W. R. Schulz Properties","Weigand-Omega Management","Weinberger","Western Transport Logistics Inc.","Western Utility Contractors LLC","Whitfill Nursery","Winslow Indian Health Care Center","Wolf Waste LLC","Yavapai-Apache Cliff Castle Casino Hotel","Yavapai-Apache Nation","Young Builders Roofing - A-S Urethane Systems","Marlin Mechanical","Brooks Bros Utility","Prime Pest Control","The HUB Bar and Grill","5 Guys Construction","Zion Compassion Care","Banker Insulation","Cummings Plumming","Summit Inc","Austin Centers for Exceptional Students (ACES)","Sahara Development Inc. Tucson","Nexus Pool Care","J Bar G Restaurants LLC","DAS Products, Inc","Community Medical Services","Appliance Part Company","Saguaro Foundation","Solana Outdoor Living, LLC","Ron Brock's Heating and Cooling","Summit Insurance","Cool Touch, LLC","FLP, LLC","Little Priest College","T&T Cleaning and Restoration","Mt. Graham Hospital","Winnebago Tribe","United Tribes Technical College (UTTC)","TLC Supportive Living Services of Arizona Inc.","Green Valley Hospital","Young Future Tire","New Horizon Community Care","EPCOR Water","Arizona Provider Training (APT)","Aneva Solar LLC","Allegiant Health Care and Rehabilitation","Marc Community Resources Inc.","Central Arizona Project","HJ3","Apache Nugget","Pursuit Builders","Southwest Risk","Achilles AC","Hula Hut","Revamp Roofing","Tega Industries, Inc.","Dutt Hospitality Group","Standing Rock Sioux Tribe","Anthem Pest Control","All Things Metal","Environments by Rojas","State Seal","Cullum Homes Inc","Roofing Specialist","Sault Tribe","Spartan Electric Inc.","ConnectionsAZ","Arizona Sanitation Services","Liberty Companies","Coppertree Construction","Sunstate Plumbing","Reidhead Plumbing & Solar","Apache Medical Transport","Havasu Landing Resort and Casino","Royal Wall Systems","CAM Properties","Parks and Sons of Sun City","APCON Construction Co","West Coast Roofing","Picuris Pueblo","Royal Renovation","Mescalero Tribe","Hendel's Air Conditioning","CMMV LLC","Vroom","ITC AZ","Mountain Power Electircal","Sunrise Park Resort","South Eastern Arizona Behavioral Health","Proof. Pest Control","Caldwell Construction"],
      country: "United States",
      topic: "",
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
      equipmentsForSite: ["Laptop", "Projector Screen", "TV monitor", "Table", "electrical power socket with extension cord"],
      equipmentsSelectedSite: [],
      equipmentsSelectedTraining: [],
      equipmentsForTraining : ["Laptop", "Projector Screen", "TV monitor", "Table", "Electrical power socket with extension cord", "Forklift training kit", "CPR mannequins", "First aid training bag", "AED training device", "Handouts"],
      active: true,
      addOn: "",
      error:{}
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.validateCellPhone = this.validateCellPhone.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.printDocument = this.printDocument.bind(this);
    this.validateZIP = this.validateZIP.bind(this);
    this.handleCompanyName = this.handleCompanyName.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  handleCompanyName  = () => {
    if (this.state.companyName.length < 2){
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
      contactStreetAddress : this.state.contactStreetAddress,
      contactZip : this.state.contactZip,
      contactCountry: this.state.contactCountry,
      contactState: this.state.contactState,
      contactCity: this.state.contactCity,
      equipmentsSelectedSite: this.state.equipmentsSelectedSite.join(", "),
      equipmentsSelectedTraining: this.state.equipmentsSelectedTraining.join(", ")
  }
    API.postService(item).then((res) => console.log(res)).catch(err => console.log(err));
    
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

  printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        // const imgData = canvas.toDataURL('image/png');
        // const pdf = new jsPDF();
        // pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        var pdf = new jsPDF('p', 'mm', 'a4');
        //var imgData = canvas.toDataURL('image/jpeg', 1.0);

        // due to lack of documentation; try setting w/h based on unit
        //pdf.addImage(imgData, 'JPEG', 10, 10, 180, 150);  // 180x150 mm @ (10,10)mm
        var logo_sizes = {
          centered_x : 10,
          w : 30,
          h : 30
        }
        var _y = 10;

        //pdf.addImage("logo.png", 'PNG', logo_sizes.centered_x, _y, logo_sizes.w, logo_sizes.h);
        // var flyer_title = "Insure Compliance";
        // pdf.textAlign(flyer_title, {align: "center"}, 0, _y);
        // pdf.setFontSize(20);
        // pdf.setFont("times");
        // pdf.setFontType("bold");
        pdf.save("download.pdf");
      })
    ;
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
            <Input type="select" name="companyName" id="companyNameSelect" onChange={this.handleInputChange} onClick={this.handleCompanyName}>
                {this.state.companyNames.length === 0 ? 
                <option name="companyName" value="">...</option> :
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
                Who is paying for Training?
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

            {this.state.topic === "Training" ? (<FormGroup className = "training" id= "training">
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
                {Object.keys(cities[this.state.country]).map(city => <option>{cities[this.state.country][city]}</option>)}
              </Input>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Enter City"
                onChange={this.handleInputChange}
              />
            </FormGroup>) : ""}
            <FormGroup>
              <Label for="langOfTraining">Language of training</Label>
              <Input type="select" name="langTraining" id="langTraining" onChange={this.handleInputChange}>
                <option name="langTraining" value="">...</option>
                <option name="langTraining" value="English">English</option>
                <option name="langTraining" value="Spanish">Spanish</option>
                <option name="langTraining" value="Bilingual">Bilingual</option>
              </Input>
            </FormGroup>
            <FormGroup> 
            
              <Label for="numStudents">Number of students</Label>
              <Input
                type="text"
                name="numStudents"
                id="numStudents"
                placeholder="Enter number of students"
                onChange={this.handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label for="contactFirstName">Contact Person's First Name</Label>
              <Input
                type="text"
                name="contactFirstName"
                id="contactFirstName"
                placeholder="Enter first name"
                onChange={this.handleInputChange}
              />
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
              <CustomInput
                type="checkbox"
                id="cb-1"
                checked={this.state.sameLocAsTraining}
                onChange={e => this.setState({ checked: !this.state.sameLocAsTraining })}
              />
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
                {Object.keys(cities[this.state.country]).map(city => <option>{cities[this.state.country][city]}</option>)}
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
            <b>Use Ctrl + Click to select multiple items</b><br />
            <Label for="equipmentForSite">Equipment needed for site</Label>
            <Input type="select" name="equipmentForSite" id="equipmentForSite" multiple>
              {this.state.equipmentsForSite.map(x => <option value={x} onClick = {() => {
                if(this.state.equipmentsSelectedTraining.indexOf(x) !== -1){
                  this.setState({
                    equipmentsSelectedSite: this.state.equipmentsSelectedSite.concat(x)
                  });
                }
                else{
                  this.setState({
                    equipmentsSelectedSite: this.state.equipmentsSelectedSite.splice( this.state.equipmentsSelectedSite.indexOf(x), 1)
                  });
                }
              }}>{x}</option>)}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="equipmentForTraining">Equipment needed for training</Label>
            <Input type="select" name="equipmentForTraining" id="equipmentForTraining" multiple>
              {this.state.equipmentsForTraining.map(x => <option value={x} onClick={() => {
                console.log(this.state.equipmentsSelectedTraining.indexOf(x) === -1)
                if(this.state.equipmentsSelectedTraining.indexOf(x) === -1){
                  this.setState({
                    equipmentsSelectedTraining: this.state.equipmentsSelectedTraining.concat(x)
                  });
                  console.log(this.state.equipmentsSelectedSite)
                }
                else{
                  this.setState({
                    equipmentsSelectedTraining: this.state.equipmentsSelectedTraining.splice( this.state.equipmentsSelectedTraining.indexOf(x), 1)
                  });
                }
              }}>{x}</option>)}
            </Input>
            <Label for="additionalEquipment">Need additional equipment? Add it here</Label>
            <Input type = "text" name = "addOn" id= "addOn" value={this.state.addOn} onChange = {this.handleInputChange}/>
            <div style={styles.FaPlus}><FaPlus onClick = {() => {if(this.state.addOn.trim() !== ""){this.setState({equipmentsForTraining: this.state.equipmentsForTraining.concat(this.state.addOn)})}}}/> </div>
          </FormGroup>
              </div>
        
        

            <FormGroup>
              <Label for="instructions">
                Provide instructions to service provider
              </Label>
              <Input type="textarea" name="instructions" id="instructions" onChange={this.handleInputChange} />
            </FormGroup>

            <Button name = "active" onClick={this.handleSubmit} disabled={!this.state.active}>Submit</Button>
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
            Insure Compliance <br />
            Invoice
            <br/>
            <p>Dates of Availability Clients: {this.state.startDate===undefined ? this.state.startDate : new Date().getMonth() + "/" + new Date().getDate() + "/" + new Date().getFullYear()}</p>
            <p>Training Location: {this.state.trainingAddress === "" ?  this.state.trainingAddress : ""}</p>
            <p>Equipment available at training site: N/A</p>
            <p>Equipment needed for training: N/A</p>
          </div>
        </div>
        </Container>
      </div>
    );
    {/* Training checkboxes, give chance to add new checkboxes */}
  }
}