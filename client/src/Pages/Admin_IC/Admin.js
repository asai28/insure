import React from "react";
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import API from "../../utils/API";
import moment from "moment";
import { isNullOrUndefined } from "util";
import { FaSortAmountUp, FaSortAmountDown, FaDivide} from "react-icons/fa";

//array sort function
var fastSort = require("fast-sort");

class Admin_IC extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            employees: []
        };
        
        this.getTasks = this.getTasks.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.filterResults = this.filterResults.bind(this);
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

    componentWillMount = () => {
        API.allTasks()
        .then(res => {
            this.setState({
                tasks: res.data
            })
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
        
        API.filterTasks(this.state.employee, this.state.quoteApproval, this.state.completed)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    render(){
        return (
            <div>
            <br/><br/>
            <Jumbotron>
            <FormGroup>
                <Label for="filter">Filter Results By:</Label> <br/>
                
                <Input type="select" name="employee" id="employee" onChange={this.handleInputChange} style = {{'width': '25%', 'float': 'left'}} onClick = {() => {
                    var item = {
            quotationIssuedBy: this.state.employee
        }
        this.filterResults(item);
                }}>
                <option value="">Employee name</option>
                    {this.state.employees.map(x => <option value={x.EMP_NAME}>{x.EMP_NAME}</option>)}
                </Input>
                
                <Input type="select" name="quoteApproval" id="quoteApproval" onChange={this.handleInputChange} style = {{'width': '25%', 'float': 'left'}} onClick = {() => {
                    var item = {
            quoteApproved: this.state.quoteApproval
        }
        this.filterResults(item);
                }}>
                <option value="">Quote approval</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
                </Input>
                
                <Input type="select" name="completed" id="completed" onChange={this.handleInputChange} style = {{'width': '25%', 'float': 'left'}} onClick = {() => {
                    var item = {
            completed: this.state.completed
        }
        this.filterResults(item);
                }}>
                <option value="">Completed tasks</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
                </Input>
            </FormGroup>
            </Jumbotron>
            <Container>
            <h5 style = {{'fontFamily': 'Noto Serif SC, serif'}}>Active Tasks</h5>
            <br/>
            <table id="active">
            <thead className="table-header">
                <tr>
                    <th className="col">QUOTATION NUMBER</th>
                    <th className="col">SERVICE<FaSortAmountUp id="sortServiceDesc" onClick = {() => {
                        if(document.getElementById('sortServiceDesc').style.color !== 'yellow'){
                            document.getElementById('sortServiceDesc').style.color = 'yellow';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('service',true),
                                    desc: this.state.desc.filter(x => x !== "service").concat("service"),
                                    asc: this.state.asc.filter(x => x !== "service")
                                });
                            if(document.getElementById('sortServiceAsc').style.color === 'lime'){
                                document.getElementById('sortServiceAsc').style.color = 'black';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('service',true),
                                    desc: this.state.desc.filter(x => x !== "service"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortServiceDesc').style.color = 'black';
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('service',true),
                                    desc: this.state.desc.filter(x => x !== "service"),
                                });
                        }
                        if(document.getElementById('sortServiceAsc').style.color === 'black' && document.getElementById('sortServiceDesc').style.color === 'black'){
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('service',false),
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
                            this.printMap();
                    }} />  <FaSortAmountDown id="sortServiceAsc" onClick = {() => {
                        if(document.getElementById('sortServiceAsc').style.color !== 'lime'){
                            document.getElementById('sortServiceAsc').style.color = 'lime';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('service',false),
                                    desc: this.state.desc.filter(x => x !== "service"),
                                    asc: this.state.asc.filter(x => x !== "service").concat("service")
                                });                        
                            if(document.getElementById('sortServiceDesc').style.color === 'yellow'){
                                document.getElementById('sortServiceDesc').style.color = 'black';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('service',false),
                                    desc: this.state.desc.filter(x => x !== "service"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortServiceAsc').style.color = 'black';
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('service',false),
                                    asc: this.state.asc.filter(x => x !== "service")
                                });
                        }
                        if(document.getElementById('sortServiceAsc').style.color === 'black' && document.getElementById('sortServiceDesc').style.color === 'black'){
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('service',false),
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
                        this.printMap();
                    }} /></th>


                    <th className="col">CLIENT<FaSortAmountUp id="sortClientDesc" onClick = {() => {
                        if(document.getElementById('sortClientDesc').style.color !== 'yellow'){
                            document.getElementById('sortClientDesc').style.color = 'yellow';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('client',true),
                                    desc: this.state.desc.filter(x => x !== "client").concat("client"),
                                    asc: this.state.asc.filter(x => x !== "client")
                                });
                            if(document.getElementById('sortClientAsc').style.color === 'lime'){
                                document.getElementById('sortClientAsc').style.color = 'black';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('client',true),
                                    desc: this.state.desc.filter(x => x !== "client"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortClientDesc').style.color = 'black';
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('client',true),
                                    desc: this.state.desc.filter(x => x !== "client"),
                                });
                        }
                        if(document.getElementById('sortClientAsc').style.color === 'black' && document.getElementById('sortClientDesc').style.color === 'black'){
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('client',false),
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
                            this.printMap();
                    }}/>  
                    <FaSortAmountDown id = "sortClientAsc" onClick = {() => {
                        if(document.getElementById('sortClientAsc').style.color !== 'lime'){
                            document.getElementById('sortClientAsc').style.color = 'lime';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('client',false),
                                    desc: this.state.desc.filter(x => x !== "client"),
                                    asc: this.state.asc.filter(x => x !== "client").concat("client")
                                });                        
                            if(document.getElementById('sortClientDesc').style.color === 'yellow'){
                                document.getElementById('sortClientDesc').style.color = 'black';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('client',false),
                                    desc: this.state.desc.filter(x => x !== "client"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortClientAsc').style.color = 'black';
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('client',false),
                                    asc: this.state.asc.filter(x => x !== "client")
                                });
                        }
                        if(document.getElementById('sortClientAsc').style.color === 'black' && document.getElementById('sortClientDesc').style.color === 'black'){
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('client',false),
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
                        this.printMap();
                    }}/></th>

                    <th className="col">DATE ASSIGNED<FaSortAmountUp id= "sortDateAssignedDesc" onClick = {() => {
                        if(document.getElementById('sortDateAssignedDesc').style.color !== 'yellow'){
                            document.getElementById('sortDateAssignedDesc').style.color = 'yellow';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DateAssigned',true),
                                    desc: this.state.desc.filter(x => x !== "DateAssigned").concat("DateAssigned"),
                                    asc: this.state.asc.filter(x => x !== "DateAssigned")
                                });
                            if(document.getElementById('sortDateAssignedAsc').style.color === 'lime'){
                                document.getElementById('sortDateAssignedAsc').style.color = 'black';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DateAssigned',true),
                                    desc: this.state.desc.filter(x => x !== "DateAssigned"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDateAssignedDesc').style.color = 'black';
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DateAssigned',true),
                                    desc: this.state.desc.filter(x => x !== "DateAssigned"),
                                });
                        }
                        if(document.getElementById('sortDateAssignedAsc').style.color === 'black' && document.getElementById('sortDateAssignedDesc').style.color === 'black'){
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DateAssigned',false),
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
                            this.printMap();
                    }}/>  
                    
                    <FaSortAmountDown id= "sortDateAssignedAsc" onClick = {() => {
                        if(document.getElementById('sortDateAssignedAsc').style.color !== 'lime'){
                            document.getElementById('sortDateAssignedAsc').style.color = 'lime';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DateAssigned',false),
                                    desc: this.state.desc.filter(x => x !== "DateAssigned"),
                                    asc: this.state.asc.filter(x => x !== "DateAssigned").concat("DateAssigned")
                                });                        
                            if(document.getElementById('sortDateAssignedDesc').style.color === 'yellow'){
                                document.getElementById('sortDateAssignedDesc').style.color = 'black';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DateAssigned',false),
                                    desc: this.state.desc.filter(x => x !== "DateAssigned"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDateAssignedAsc').style.color = 'black';
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DateAssigned',false),
                                    asc: this.state.asc.filter(x => x !== "DateAssigned")
                                });
                        }
                        if(document.getElementById('sortDateAssignedAsc').style.color === 'black' && document.getElementById('sortDateAssignedDesc').style.color === 'black'){
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DateAssigned',false),
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
                        this.printMap();
                    }}/></th>

                    <th className="col">DUE DATE <FaSortAmountUp id = "sortDueDateDesc" onClick = {() => {
                        if(document.getElementById('sortDueDateDesc').style.color !== 'yellow'){
                            document.getElementById('sortDueDateDesc').style.color = 'yellow';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DueDate',true),
                                    desc: this.state.desc.filter(x => x !== "DueDate").concat("DueDate"),
                                    asc: this.state.asc.filter(x => x !== "DueDate")
                                });
                            if(document.getElementById('sortDueDateAsc').style.color === 'lime'){
                                document.getElementById('sortDueDateAsc').style.color = 'black';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DueDate',true),
                                    desc: this.state.desc.filter(x => x !== "DueDate"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDueDateDesc').style.color = 'black';
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DueDate',true),
                                    desc: this.state.desc.filter(x => x !== "DueDate"),
                                });
                        }
                        if(document.getElementById('sortDueDateAsc').style.color === 'black' && document.getElementById('sortDueDateDesc').style.color === 'black'){
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DueDate',false),
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
                            this.printMap();
                    }}/>
                    
                    <FaSortAmountDown id = "sortDueDateAsc" onClick = {() => {
                        if(document.getElementById('sortDueDateAsc').style.color !== 'lime'){
                            document.getElementById('sortDueDateAsc').style.color = 'lime';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DueDate',false),
                                    desc: this.state.desc.filter(x => x !== "DueDate"),
                                    asc: this.state.asc.filter(x => x !== "DueDate").concat("DueDate")
                                });                        
                            if(document.getElementById('sortDueDateDesc').style.color === 'yellow'){
                                document.getElementById('sortDueDateDesc').style.color = 'black';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DueDate',false),
                                    desc: this.state.desc.filter(x => x !== "DueDate"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDueDateAsc').style.color = 'black';
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DueDate',false),
                                    asc: this.state.asc.filter(x => x !== "DueDate")
                                });
                        }
                        if(document.getElementById('sortDueDateAsc').style.color === 'black' && document.getElementById('sortDueDateDesc').style.color === 'black'){
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DueDate',false),
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
                        this.printMap();
                    }}/></th>


                    <th className="col">SERVICE UNITS</th>
                    <th className="col">DATE COMPLETED (YYYY-MM-DD) <FaSortAmountUp id = "sortDateCompletedDesc" onClick = {() => {
                        if(document.getElementById('sortDateCompletedDesc').style.color !== 'yellow'){
                            document.getElementById('sortDateCompletedDesc').style.color = 'yellow';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DateCompleted',true),
                                    desc: this.state.desc.filter(x => x !== "DateCompleted").concat("DateCompleted"),
                                    asc: this.state.asc.filter(x => x !== "DateCompleted")
                                });
                            if(document.getElementById('sortDateCompletedAsc').style.color === 'lime'){
                                document.getElementById('sortDateCompletedAsc').style.color = 'black';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DateCompleted',true),
                                    desc: this.state.desc.filter(x => x !== "DateCompleted"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDateCompletedDesc').style.color = 'black';
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DateCompleted',true),
                                    desc: this.state.desc.filter(x => x !== "DateCompleted"),
                                });
                        }
                        if(document.getElementById('sortDateCompletedAsc').style.color === 'black' && document.getElementById('sortDateCompletedDesc').style.color === 'black'){
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DateCompleted',false),
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
                            this.printMap();
                    }}/> 
                    <FaSortAmountDown id = "sortDateCompletedAsc" onClick = {() => {
                        if(document.getElementById('sortDateCompletedAsc').style.color !== 'lime'){
                            document.getElementById('sortDateCompletedAsc').style.color = 'lime';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DateCompleted',false),
                                    desc: this.state.desc.filter(x => x !== "DateCompleted"),
                                    asc: this.state.asc.filter(x => x !== "DateCompleted").concat("DateCompleted")
                                });                        
                            if(document.getElementById('sortDateCompletedDesc').style.color === 'yellow'){
                                document.getElementById('sortDateCompletedDesc').style.color = 'black';
                                this.setState({
                                    sortParameters: this.state.sortParameters.set('DateCompleted',false),
                                    desc: this.state.desc.filter(x => x !== "DateCompleted"),
                                });
                            }
                        }
                        else{
                            document.getElementById('sortDateCompletedAsc').style.color = 'black';
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DateCompleted',false),
                                    asc: this.state.asc.filter(x => x !== "DateCompleted")
                                });
                        }
                        if(document.getElementById('sortDateCompletedAsc').style.color === 'black' && document.getElementById('sortDateCompletedDesc').style.color === 'black'){
                            this.setState({
                                    sortParameters: this.state.sortParameters.set('DateCompleted',false),
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
                        this.printMap();
                    }}/> </th>
                    <th className="col">STATUS/NOTES/COMMENTS</th>
                    {/* <th className="col">SERVICE DESCRIPTION</th> */}
                    <th className="col">QUOTE APPROVED</th>
                    <th className="col">COMPLETED</th>
                </tr>
            </thead>
            <tbody>
                {this.state.tasks.map((x, index) => 
                <tr key={"activeList"+index} className="table-row">
                    <td key={"activeList"+index+"_quotationNumber"}>{"QN_" + x.quotationIssuedBy.substring(0,3).toUpperCase() + "_" + (x.id + 1023)}</td>
                    <td key={"activeList"+index+"_service"}>{x.service}</td>
                    <td key={"activeList"+index+"_client"}>{x.client}</td>
                    <td key={"activeList"+index+"_dateAssigned"}>{moment(x.dateAssigned).format("YYYY-MM-DD")}</td>
                    <td key={"activeList"+index+"_dueTime"}>{moment(x.dueDate).format("YYYY-MM-DD")}</td>
                    <td key={"activeList"+index+"_serviceUnits"}>{x.qty}</td>
                    <td key={"activeList"+index+"_dateOfCompletion"}>
                    <Input
                          type="text"
                          name={"activeList"+ index + "_dateCompleted"}
                          id={"activeList"+ index + "_dateCompleted"}
                          defaultValue={moment(x.dateCompleted).format("YYYY-MM-DD")}
                          placeholder="Enter date of completion"
                          onChange={this.handleInputChange}
                        />
                    </td>
                    <td key={"activeList"+ index +"_status_notes_comments"}>
                    <Input
                          type="textarea"
                          name={"activeList"+ index + "_status_notes_comments"}
                          id={"activeList"+ index + "_status_notes_comments"}
                          defaultValue={x.status_notes_comments}
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
                            <Input type="radio" name={"activeList"+index+"_quoteApproved"} id={"activeList"+index+"_quoteApproved"} value={true}  onChange = {this.handleInputChange} checked = {x.quoteApproved} onClick = {() => {
                                console.log(x.id);
                                var item = {
                                    // dateCompleted: document.getElementById("activeList"+index+ "_dateCompleted").value,
                                    // status_notes_comments: document.getElementById("activeList"+ index + "_status_notes_comments")
                                    dateCompleted: moment(document.getElementById("activeList"+index+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    quoteApproved: true,
                                    status_notes_comments: document.getElementById("activeList"+ index + "_status_notes_comments").value
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
                            <Input type="radio" name={"activeList"+index+"_quoteApproved"} id={"activeList"+index+"_quoteApproved"} value={false}  onChange = {this.handleInputChange} checked = {!x.quoteApproved} onClick = {() => {
                                console.log(x.id);
                                var item = {
                                    // dateCompleted: document.getElementById("activeList"+index+ "_dateCompleted").value,
                                    quoteApproved: false,
                                    // status_notes_comments: document.getElementById("activeList"+ index + "_status_notes_comments")
                                    dateCompleted:moment(document.getElementById("activeList"+index+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    status_notes_comments: document.getElementById("activeList"+ index + "_status_notes_comments").value
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
                            <Input type="radio" name={"activeList"+index+"_completed"} checked={x.completed} value={true} onChange = {this.handleInputChange} onClick = {() => {
                                console.log(x.id);
                                console.log(document.getElementById("activeList"+index+ "_dateCompleted").value, document.getElementById("activeList"+ index + "_status_notes_comments").value);
                                console.log(!isNullOrUndefined(x.quoteApproved))
                                var item = {
                                    completed: true,
                                    dateCompleted:moment(document.getElementById("activeList"+index+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    quoteApproved: x.quoteApproved,
                                    status_notes_comments: document.getElementById("activeList"+ index + "_status_notes_comments").value
                                }
                                API.modifyTask(x.id, item)
                                .then(() => {console.log("Task completed");
                                this.getCompletedTasks();
                                })
                                .catch(err => console.log(err))
                            }}/>{' '}
                            Yes
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"activeList"+index+"_completed"} checked={!x.completed} value={false} onChange = {this.handleInputChange} disabled ={
                                isNullOrUndefined(x.quoteApproved)
                                } onClick = {() => {
                             console.log(x.id);
                                var item = {
                                    completed: false,
                                    dateCompleted:moment(document.getElementById("activeList"+index+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    quoteApproved: x.quoteApproved,
                                    status_notes_comments: document.getElementById("activeList"+ index + "_status_notes_comments").value
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
                </tr>
                )}
            </tbody>
            </table>
           </Container>
            </div>
        )
    }

}

export default Admin_IC;