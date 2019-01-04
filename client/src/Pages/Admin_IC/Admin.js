import React from "react";
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import API from "../../utils/API";
import moment from "moment";
import { isNullOrUndefined } from "util";
import { FaSortAmountUp, FaSortAmountDown} from "react-icons/fa";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { render } from "react-dom";
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Home from "./Home.js";

const options = {
    timeout: 5000,
    position: "bottom center"
  };
  

//array sort function
var fastSort = require("fast-sort");

class Admin_IC extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            employees: [],
            asc: [],
            desc: [],
            companyNames: [],
            dateAssigned: moment(),
            dueDate: moment()
            .add(90, "days")
            .format("YYYY-MM-DD"),
            qty: 0
        };
        
        this.getTasks = this.getTasks.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.filterResults = this.filterResults.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
    }

    handleInputChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    getTasks = () => {
        if(this.state.employee.length > 0){
            API.getEmployeeTasks(this.state.employee.split(" ").join("%20"))
            .then(res => {
                console.log(res.data);
                this.setState({
                    tasks: res.data
                });
                this.getCompletedTasks();
            })
            .catch(err => console.log(err));
        }
    }

    displayAlert = () => {
        return (
        <Provider template={AlertTemplate} {...options}>
            <Home />
          </Provider>)
    }

    componentWillMount = () => {
        API.allTasks()
        .then(res => {
            this.setState({
                tasks: res.data
            });
            console.log(res.data);
        })
        .catch(err => console.log(err));
        API.getCompany()
      .then(res => {
          var uniqueCompanies = [];
        for (let i = 0; i < res.data.length; ++i) {
          if (uniqueCompanies.indexOf(res.data[i].companyName) === -1 && res.data[i].companyName.trim() !== "") {
            uniqueCompanies.push(res.data[i].companyName);
          }
        }
        this.setState({ companyNames: uniqueCompanies });
        console.log("Companies table loaded");
      })
      .catch(err => console.log(err));


        API.getEmployees()
        .then(res => {
            console.log("Employee table loaded!");
            this.setState({
                employees: res.data
            });
        })
        .catch(err => console.log(err));

    }

    filterResults = () => {
        
        API.filterTasks(this.state.employee, this.state.quoteApproved, this.state.completed)
        .then(res => {
            console.log(res);
            console.log(this.state.employee, this.state.quoteApproved, this.state.completed);
            this.setState({
                tasks: res.data
            })
        })
        .catch(err => console.log(err));
    }

    getCompletedTasks = () => {
        API.completedTasks(this.state.employee)
        .then(res => {
            console.log(res.data);
            this.setState({
                completedTasks: res.data.filter(x => x.quoteApproved !== false)
            });
        })
        .catch(err => console.log(err));
    }

    handleChange(date) {
        this.setState({
          dateAssigned: date
        });
        this.setState({
            dueDate: moment(this.state.dateAssigned)
            .add(90, "days")
            .format("YYYY-MM-DD")
        });
        document.getElementById("dueDate").value = moment(
          this.state.dueDate
        ).format("YYYY-MM-DD");
      }
      

    render(){
        return (
            <div>
            <Jumbotron>
            <FormGroup>
                <Label for="filter">Filter Results By:</Label> <br/>
                
                <Input type="select" name="employee" id="employee" onChange={this.handleInputChange} style = {{'width': '25%', 'float': 'left'}} onClick = {() => {
                    var item = {
            quotationIssuedBy: this.state.employee
        }
        this.filterResults();
                }}>
                <option value="">Employee name</option>
                    {this.state.employees.map(x => <option value={x.EMP_NAME}>{x.EMP_NAME}</option>)}
                </Input>
                
                <Input type="select" name="quoteApproved" id="quoteApproved" onChange={this.handleInputChange} style = {{'width': '25%', 'float': 'left'}} onClick = {() => {
                    var item = {
            quoteApproved: this.state.quoteApproved
        }
        this.filterResults();
                }}>
                <option value="">Quote approval</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
                </Input>
                
                <Input type="select" name="completed" id="completed" onChange={this.handleInputChange} style = {{'width': '25%', 'float': 'left'}} onClick = {() => {
                    var item = {
            completed: this.state.completed
        }
        this.filterResults();
                }}>
                <option value="">Completed tasks</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
                </Input>
            </FormGroup>
            
            <br/><br/>
            <Label>
                ADD OR REMOVE TASK FOR EMPLOYEE
            </Label>
            <Form id="addTask">
                <Input type="select" name="toEmployee" id="employee" onChange={this.handleInputChange} style = {{'width': '25%', 'float': 'left', 'margin':'5 5px', 'padding': '5 5px'}}>
                <option value="">Employee assigned task</option>
                    {this.state.employees.map(x => <option value={x.EMP_NAME}>{x.EMP_NAME}</option>)}
                </Input>

                <Input type="select" name="task" id="task" onChange={this.handleInputChange} style = {{'width': '25%', 'float': 'left', 'margin':'5 5px', 'padding': '5 5px'}}>
                <option value="">Choose a task category</option>
                <option value="Admin Task">Admin Task</option>
                <option value="Management Task">Management Task</option>
                <option value="IC Employee Training">IC Employee Training</option>
                <option value="Marketing Task">Marketing Task</option>
                <option value="Miscellanous">Miscellanous</option>
                <option value="Networking Task">Networking Task</option>
                <option value="Sales Task">Sales Task</option>
                <option value="Research Task">Research Task</option>
                <option value="Scheduling Task">Scheduling Task</option>
                </Input>

                {/* <Input type="text" name="task" id="task" placeholder="Enter task here" onChange = {this.handleInputChange} style = {{'width': '25%', 'float': 'left', 'margin':'5 5px', 'padding': '5 5px'}}/> */}
                <Input type="select" name="client" id="client" onChange={this.handleInputChange} style = {{'width': '25%', 'float': 'left', 'margin':'5 5px', 'padding': '5 5px'}}>
                <option value="">Choose Client</option>
                    {this.state.companyNames.map(x => <option value={x}>{x}</option>)}
                </Input>
                <br/>
                <br/>
                <Label style= {{'clear': 'both'}}>Task Details:</Label>
                <Input
                type="textarea"
                name="details"
                id="details"
                onChange={this.handleInputChange}
                placeholder = "Enter task details"
            />
                <br/>
                <Label>Pick date of assignment of task:</Label><br />
                <DatePicker
                selected={this.state.dateAssigned}
                onChange={this.handleChange}
                name="dateAssigned"
                placeholder="Date Assigned"
                style = {{'width': '25%', 'float': 'left', 'margin':'5 5px', 'padding': '5 5px'}}
              />
              <br/> <br/>
              
              <Label>Due date of task:</Label><br />
              <Input
                type="text"
                name="dueDate"
                id="dueDate"
                onChange={this.handleInputChange}
                value = {moment(this.state.dateAssigned).add(90, "days").format("YYYY-MM-DD")}
                placeholder = "Enter due date"
                style = {{'width': '25%', 'margin':'5 5px', 'padding': '5 5px'}}
            /> <br />
                
                <Button className="btn-success" style = {{'clear': 'both'}} onClick = {() => {
                    var item = {
                        quotationIssuedBy: this.state.toEmployee,
                        quotationNumber: "EMPTY",
                        service: this.state.task,
                        client: this.state.client,
                        instructions: this.state.details,
                        startDate: this.state.dateAssigned, //sort
                        validThru: this.state.dueDate,
                        qty: parseFloat(this.state.qty)
                    };
                    API.addTask(item)
                    .then(() => {
                        console.log("Task added!");
                        document.getElementById('addTask').reset();
                        })
                    .catch(err => console.log(err));
                }}>Add Task</Button>
            </Form>  
            </Jumbotron>

            <Container>

            <h5 style = {{'fontFamily': 'Noto Serif SC, serif'}}>All Tasks</h5>
            <br/>
            <table id="active">
            <thead className="table-header">
                <tr>
                    <th className="col">QUOTATION NUMBER</th>
                    <th className="col">SERVICE<FaSortAmountUp id="sortServiceDesc" onClick = {() => {
                        if(document.getElementById('sortServiceDesc').style.color !== 'yellow'){
                            document.getElementById('sortServiceDesc').style.color = 'yellow';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "service").concat("service"),
                                    asc: this.state.asc.filter(x => x !== "service")
                                });
                            if(document.getElementById('sortServiceAsc').style.color === 'lime'){
                                document.getElementById('sortServiceAsc').style.color = 'black';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "service"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortServiceDesc').style.color = 'black';
                            this.setState({
                                    desc: this.state.desc.filter(x => x !== "service"),
                                });
                        }
                        if(document.getElementById('sortServiceAsc').style.color === 'black' && document.getElementById('sortServiceDesc').style.color === 'black'){
                            this.setState({
                                    desc: this.state.desc.filter(x => x !== "service"),
                                    asc: this.state.asc.filter(x => x !== "service")
                                });
                        }
                        this.setState({
                            tasks: fastSort(fastSort(this.state.tasks).by([
                                    {asc: this.state.asc}
                                    ])).by([
                                    {desc: this.state.desc}
                                    ])
                        });
                            
                    }} />  <FaSortAmountDown id="sortServiceAsc" onClick = {() => {
                        if(document.getElementById('sortServiceAsc').style.color !== 'lime'){
                            document.getElementById('sortServiceAsc').style.color = 'lime';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "service"),
                                    asc: this.state.asc.filter(x => x !== "service").concat("service")
                                });                        
                            if(document.getElementById('sortServiceDesc').style.color === 'yellow'){
                                document.getElementById('sortServiceDesc').style.color = 'black';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "service"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortServiceAsc').style.color = 'black';
                            this.setState({
                                    asc: this.state.asc.filter(x => x !== "service")
                                });
                        }
                        if(document.getElementById('sortServiceAsc').style.color === 'black' && document.getElementById('sortServiceDesc').style.color === 'black'){
                            this.setState({
                                    desc: this.state.desc.filter(x => x !== "service"),
                                    asc: this.state.asc.filter(x => x !== "service")
                                });
                        }
                        this.setState({
                            tasks: fastSort(fastSort(this.state.tasks).by([
                                    {desc: this.state.desc}
                                    ])).by([
                                    {asc: this.state.asc}
                                    ])
                        });
                        
                    }} /></th>


                    <th className="col">CLIENT<FaSortAmountUp id="sortClientDesc" onClick = {() => {
                        if(document.getElementById('sortClientDesc').style.color !== 'yellow'){
                            document.getElementById('sortClientDesc').style.color = 'yellow';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "client").concat("client"),
                                    asc: this.state.asc.filter(x => x !== "client")
                                });
                            if(document.getElementById('sortClientAsc').style.color === 'lime'){
                                document.getElementById('sortClientAsc').style.color = 'black';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "client"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortClientDesc').style.color = 'black';
                            this.setState({
                                    desc: this.state.desc.filter(x => x !== "client"),
                                });
                        }
                        if(document.getElementById('sortClientAsc').style.color === 'black' && document.getElementById('sortClientDesc').style.color === 'black'){
                            this.setState({
                                    desc: this.state.desc.filter(x => x !== "client"),
                                    asc: this.state.asc.filter(x => x !== "client")
                                });
                        }
                        this.setState({
                            tasks: fastSort(fastSort(this.state.tasks).by([
                                    {asc: this.state.asc}
                                    ])).by([
                                    {desc: this.state.desc}
                                    ])
                        });
                            
                    }}/>  
                    <FaSortAmountDown id = "sortClientAsc" onClick = {() => {
                        if(document.getElementById('sortClientAsc').style.color !== 'lime'){
                            document.getElementById('sortClientAsc').style.color = 'lime';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "client"),
                                    asc: this.state.asc.filter(x => x !== "client").concat("client")
                                });                        
                            if(document.getElementById('sortClientDesc').style.color === 'yellow'){
                                document.getElementById('sortClientDesc').style.color = 'black';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "client"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortClientAsc').style.color = 'black';
                            this.setState({
                                    asc: this.state.asc.filter(x => x !== "client")
                                });
                        }
                        if(document.getElementById('sortClientAsc').style.color === 'black' && document.getElementById('sortClientDesc').style.color === 'black'){
                            this.setState({
                                    desc: this.state.desc.filter(x => x !== "client"),
                                    asc: this.state.asc.filter(x => x !== "client")
                                });
                        }
                        this.setState({
                            tasks: fastSort(fastSort(this.state.tasks).by([
                                    {desc: this.state.desc}
                                    ])).by([
                                    {asc: this.state.asc}
                                    ])
                        });
                       
                    }}/></th>

                    <th className="col">DATE ASSIGNED<FaSortAmountUp id= "sortDateAssignedDesc" onClick = {() => {
                        if(document.getElementById('sortDateAssignedDesc').style.color !== 'yellow'){
                            document.getElementById('sortDateAssignedDesc').style.color = 'yellow';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "DateAssigned").concat("DateAssigned"),
                                    asc: this.state.asc.filter(x => x !== "DateAssigned")
                                });
                            if(document.getElementById('sortDateAssignedAsc').style.color === 'lime'){
                                document.getElementById('sortDateAssignedAsc').style.color = 'black';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "DateAssigned"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDateAssignedDesc').style.color = 'black';
                            this.setState({
                                    desc: this.state.desc.filter(x => x !== "DateAssigned"),
                                });
                        }
                        if(document.getElementById('sortDateAssignedAsc').style.color === 'black' && document.getElementById('sortDateAssignedDesc').style.color === 'black'){
                            this.setState({
                                    desc: this.state.desc.filter(x => x !== "DateAssigned"),
                                    asc: this.state.asc.filter(x => x !== "DateAssigned")
                                });
                        }
                        this.setState({
                            tasks: fastSort(fastSort(this.state.tasks).by([
                                    {asc: this.state.asc}
                                    ])).by([
                                    {desc: this.state.desc}
                                    ])
                        });
                           
                    }}/>  
                    
                    <FaSortAmountDown id= "sortDateAssignedAsc" onClick = {() => {
                        if(document.getElementById('sortDateAssignedAsc').style.color !== 'lime'){
                            document.getElementById('sortDateAssignedAsc').style.color = 'lime';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "DateAssigned"),
                                    asc: this.state.asc.filter(x => x !== "DateAssigned").concat("DateAssigned")
                                });                        
                            if(document.getElementById('sortDateAssignedDesc').style.color === 'yellow'){
                                document.getElementById('sortDateAssignedDesc').style.color = 'black';
                                this.setState({
                                    desc: this.state.desc.filter(x => x !== "DateAssigned"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDateAssignedAsc').style.color = 'black';
                            this.setState({
                                    asc: this.state.asc.filter(x => x !== "DateAssigned")
                                });
                        }
                        if(document.getElementById('sortDateAssignedAsc').style.color === 'black' && document.getElementById('sortDateAssignedDesc').style.color === 'black'){
                            this.setState({
                                    desc: this.state.desc.filter(x => x !== "DateAssigned"),
                                    asc: this.state.asc.filter(x => x !== "DateAssigned")
                                });
                        }
                        this.setState({
                            tasks: fastSort(fastSort(this.state.tasks).by([
                                    {desc: this.state.desc}
                                    ])).by([
                                    {asc: this.state.asc}
                                    ])
                        });
                        
                    }}/></th>

                    <th className="col">DUE DATE <FaSortAmountUp id = "sortDueDateDesc" onClick = {() => {
                        if(document.getElementById('sortDueDateDesc').style.color !== 'yellow'){
                            document.getElementById('sortDueDateDesc').style.color = 'yellow';
                                this.setState({
                                    
                                    desc: this.state.desc.filter(x => x !== "DueDate").concat("DueDate"),
                                    asc: this.state.asc.filter(x => x !== "DueDate")
                                });
                            if(document.getElementById('sortDueDateAsc').style.color === 'lime'){
                                document.getElementById('sortDueDateAsc').style.color = 'black';
                                this.setState({
                                   
                                    desc: this.state.desc.filter(x => x !== "DueDate"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDueDateDesc').style.color = 'black';
                            this.setState({
                                   
                                    desc: this.state.desc.filter(x => x !== "DueDate"),
                                });
                        }
                        if(document.getElementById('sortDueDateAsc').style.color === 'black' && document.getElementById('sortDueDateDesc').style.color === 'black'){
                            this.setState({
                                    
                                    desc: this.state.desc.filter(x => x !== "DueDate"),
                                    asc: this.state.asc.filter(x => x !== "DueDate")
                                });
                        }
                        this.setState({
                            tasks: fastSort(fastSort(this.state.tasks).by([
                                    {asc: this.state.asc}
                                    ])).by([
                                    {desc: this.state.desc}
                                    ])
                        });
                           
                    }}/>
                    
                    <FaSortAmountDown id = "sortDueDateAsc" onClick = {() => {
                        if(document.getElementById('sortDueDateAsc').style.color !== 'lime'){
                            document.getElementById('sortDueDateAsc').style.color = 'lime';
                                this.setState({
                                   
                                    desc: this.state.desc.filter(x => x !== "DueDate"),
                                    asc: this.state.asc.filter(x => x !== "DueDate").concat("DueDate")
                                });                        
                            if(document.getElementById('sortDueDateDesc').style.color === 'yellow'){
                                document.getElementById('sortDueDateDesc').style.color = 'black';
                                this.setState({
                                    
                                    desc: this.state.desc.filter(x => x !== "DueDate"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDueDateAsc').style.color = 'black';
                            this.setState({
                                    
                                    asc: this.state.asc.filter(x => x !== "DueDate")
                                });
                        }
                        if(document.getElementById('sortDueDateAsc').style.color === 'black' && document.getElementById('sortDueDateDesc').style.color === 'black'){
                            this.setState({
                                    
                                    desc: this.state.desc.filter(x => x !== "DueDate"),
                                    asc: this.state.asc.filter(x => x !== "DueDate")
                                });
                        }
                        this.setState({
                            tasks: fastSort(fastSort(this.state.tasks).by([
                                    {desc: this.state.desc}
                                    ])).by([
                                    {asc: this.state.asc}
                                    ])
                        });
                        
                    }}/></th>


                    {/* <th className="col">SERVICE UNITS</th> */}
                    <th className="col">DATE COMPLETED (YYYY-MM-DD) <FaSortAmountUp id = "sortDateCompletedDesc" onClick = {() => {
                        if(document.getElementById('sortDateCompletedDesc').style.color !== 'yellow'){
                            document.getElementById('sortDateCompletedDesc').style.color = 'yellow';
                                this.setState({
                                   
                                    desc: this.state.desc.filter(x => x !== "DateCompleted").concat("DateCompleted"),
                                    asc: this.state.asc.filter(x => x !== "DateCompleted")
                                });
                            if(document.getElementById('sortDateCompletedAsc').style.color === 'lime'){
                                document.getElementById('sortDateCompletedAsc').style.color = 'black';
                                this.setState({
                                    
                                    desc: this.state.desc.filter(x => x !== "DateCompleted"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDateCompletedDesc').style.color = 'black';
                            this.setState({
                                    
                                    desc: this.state.desc.filter(x => x !== "DateCompleted"),
                                });
                        }
                        if(document.getElementById('sortDateCompletedAsc').style.color === 'black' && document.getElementById('sortDateCompletedDesc').style.color === 'black'){
                            this.setState({
                                    
                                    desc: this.state.desc.filter(x => x !== "DateCompleted"),
                                    asc: this.state.asc.filter(x => x !== "DateCompleted")
                                });
                        }
                        this.setState({
                            tasks: fastSort(fastSort(this.state.tasks).by([
                                    {asc: this.state.asc}
                                    ])).by([
                                    {desc: this.state.desc}
                                    ])
                        });
                           
                    }}/> 
                    <FaSortAmountDown id = "sortDateCompletedAsc" onClick = {() => {
                        if(document.getElementById('sortDateCompletedAsc').style.color !== 'lime'){
                            document.getElementById('sortDateCompletedAsc').style.color = 'lime';
                                this.setState({
                                   
                                    desc: this.state.desc.filter(x => x !== "DateCompleted"),
                                    asc: this.state.asc.filter(x => x !== "DateCompleted").concat("DateCompleted")
                                });                        
                            if(document.getElementById('sortDateCompletedDesc').style.color === 'yellow'){
                                document.getElementById('sortDateCompletedDesc').style.color = 'black';
                                this.setState({
                                    
                                    desc: this.state.desc.filter(x => x !== "DateCompleted"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDateCompletedAsc').style.color = 'black';
                            this.setState({
                                   
                                    asc: this.state.asc.filter(x => x !== "DateCompleted")
                                });
                        }
                        if(document.getElementById('sortDateCompletedAsc').style.color === 'black' && document.getElementById('sortDateCompletedDesc').style.color === 'black'){
                            this.setState({
                                   
                                    desc: this.state.desc.filter(x => x !== "DateCompleted"),
                                    asc: this.state.asc.filter(x => x !== "DateCompleted")
                                });
                        }
                        this.setState({
                            tasks: fastSort(fastSort(this.state.tasks).by([
                                    {desc: this.state.desc}
                                    ])).by([
                                    {asc: this.state.asc}
                                    ])
                        });
                        
                    }}/> </th>
                    <th className="col">DETAILS</th>
                    {/* <th className="col">SERVICE DESCRIPTION</th> */}
                    <th className="col">QUOTE APPROVED</th>
                    <th className="col">COMPLETED</th>
                    <th className="col">REMOVE TASK</th>
                </tr>
            </thead>
            <tbody>
                {this.state.tasks.filter(x => !isNullOrUndefined(x.quotationIssuedBy)).map((x, index) => 
                <tr key={"activeList"+index} className="table-row">
                    <td key={"activeList"+index+"_quotationNumber"}>{!isNullOrUndefined(x.quotationIssuedBy) ? "QN_" + x.quotationIssuedBy.substring(0,3).toUpperCase() + "_" + (x.id + 1023) : "QN_EMPTY_" + (x.id + 1023)}</td>
                    <td key={"activeList"+index+"_service"}>{x.service}</td>
                    <td key={"activeList"+index+"_client"}>{x.client}</td>
                    <td key={"activeList"+index+"_dateAssigned"}>{moment(x.dateAssigned).format("YYYY-MM-DD")}</td>
                    <td key={"activeList"+index+"_dueTime"}>{moment(x.dueDate).format("YYYY-MM-DD")}</td>
                    {/* <td key={"activeList"+index+"_serviceUnits"}>{x.qty}</td> */}
                    <td key={"activeList"+index+"_dateOfCompletion"}>{moment(x.dateCompleted).format("YYYY-MM-DD")}
                    {/* <Input
                          type="text"
                          name={"activeList"+ index + "_dateCompleted"}
                          id={"activeList"+ index + "_dateCompleted"}
                          defaultValue={moment(x.dateCompleted).format("YYYY-MM-DD")}
                          placeholder="Enter date of completion"
                          onChange={this.handleInputChange}
                        /> */}
                    </td>
                    <td key={"activeList"+ index +"_status_notes_comments"}>
                    <Input
                          type="textarea"
                          name={"activeList"+ index + "_status_notes_comments"}
                          id={"activeList"+ index + "_status_notes_comments"}
                          defaultValue={x.details}
                          placeholder="Enter status/notes/comments"
                          onChange={this.handleInputChange}
                        />
                    </td>
                    {/* <td key={"activeList" + index + "serviceDescription"}>
                     <span style = {{'fontSize': '10px'}}>{x.serviceDescription}</span>

                    </td> */}
                    <td key={"activeList"+index+"_quoteApproved"}>
                    <FormGroup tag="fieldset">
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"activeList"+index+"_quoteApproved"} id={"activeList"+index+"_quoteApproved"} value={true}  onChange = {this.handleInputChange} checked = {x.quoteApproved || !isNullOrUndefined(x.quoteApproved)} onClick = {() => {
                                console.log(x.id);
                                var item = {
                                    // dateCompleted: document.getElementById("activeList"+index+ "_dateCompleted").value,
                                    // status_notes_comments: document.getElementById("activeList"+ index + "_status_notes_comments")
                                    quoteApproved: true,
                                    dateCompleted: x.dateCompleted,
                                    status_notes_comments: x.status_notes_comments,
                                    completed: x.completed
                                }
                                API.modifyTask(x.id, item)
                                .then(res => {
                                    console.log("Quote approved");
                                    console.log(res.data);
                                    API.getEmployeeTasks(this.state.employee.split(" ").join("%20"))
                                    .then(res2 => {
                                        console.log(res2.data);
                                        this.setState({
                                            tasks: res2.data,
                                        });

                                    this.setState({
                                    tasks: fastSort(fastSort(this.state.tasks).by([
                                    {desc: this.state.desc}
                                    ])).by([
                                    {asc: this.state.asc}
                                    ])
                        });
                                    })
                                    .catch(err => console.log(err));
                
                                    })
                                .catch(err => console.log(err))
                            }}/>{' '}
                            Yes
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"activeList"+index+"_quoteApproved"} id={"activeList"+index+"_quoteApproved"} value={false}  onChange = {this.handleInputChange} checked = {!isNullOrUndefined(x.quoteApproved) && !x.quoteApproved} onClick = {() => {
                                console.log(x.id);
                                var item = {
                                    // dateCompleted: document.getElementById("activeList"+index+ "_dateCompleted").value,
                                    quoteApproved: false,
                                    dateCompleted: x.dateCompleted,
                                    status_notes_comments: x.status_notes_comments,
                                    completed: x.completed
                                }
                                API.modifyTask(x.id, item)
                                .then(() => console.log("Quote not approved"))
                                .catch(err => console.log(err))
                            }}/>{' '}
                            No
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    </td>
                    <td key={"activeList"+index+"_completed"}>
                    <FormGroup tag="fieldset">
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"activeList"+index+"_completed"} checked={x.completed || !isNullOrUndefined(x.completed)} value={true} onChange = {this.handleInputChange} onClick = {() => {
                                console.log(x.id);
                                console.log(document.getElementById("activeList"+index+ "_dateCompleted").value, document.getElementById("activeList"+ index + "_status_notes_comments").value);
                                console.log(!isNullOrUndefined(x.quoteApproved))
                                var item = {
                                    quoteApproved: x.quoteApproved,
                                    dateCompleted: x.dateCompleted,
                                    status_notes_comments: x.status_notes_comments,
                                    completed: true
                                }
                                API.modifyTask(x.id, item)
                                .then(() => {console.log("Task completed");
                                })
                                .catch(err => console.log(err))
                            }}/>{' '}
                            Yes
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"activeList"+index+"_completed"} checked={!isNullOrUndefined(x.quoteApproved) && !x.completed} value={false} onChange = {this.handleInputChange} onClick = {() => {
                             console.log(x.id);
                                var item = {
                                    quoteApproved: x.quoteApproved,
                                    dateCompleted: x.dateCompleted,
                                    status_notes_comments: x.status_notes_comments,
                                    completed: false
                                }
                                API.modifyTask(x.id, item)
                                .then(() => console.log("Task incomplete"))
                                .catch(err => console.log(err))   
                            }}/>{' '}
                            No
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    </td>
                    <td key={"activeList"+index+"_removeTask"}>
                    
                    <Button className = 'btn-danger' onClick = {() => {
                        console.log(x);
                        API.deleteTask(x.id)
                        .then(() => {
                            console.log(x.id ,"deleted");
                            this.displayAlert();
                        })
                        .catch(err => console.log(err));
                    }}> Remove Task</Button></td>
                </tr>
                )}
            </tbody>
            </table>
            <br/><br/>
            
           </Container>
            </div>
        )
    }

}

export default Admin_IC;