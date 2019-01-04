import React from "react";
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import API from "../../utils/API";
import moment from "moment";
import "./TaskList.scss";
import { isNullOrUndefined } from "util";
import { FaSortAmountUp, FaSortAmountDown} from "react-icons/fa";

//array sort function
var fastSort = require("fast-sort");

class TaskList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            employee_data: [],
            tasks: [],
            completedTasks: [],
            quoteApproved: false,
            employee: "",
            tooltipOpen: false,
            sortParameters: new Map([]),
            asc: [],
            desc: [],
            incomplete: [],
            incompleteNullTasks: []
        };
        this.toggle = this.toggle.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getCompletedTasks = this.getCompletedTasks.bind(this);
        this.printMap = this.printMap.bind(this);

    }

    componentWillMount = () => {
        API.getEmployees()
        .then(res => {
            this.setState({
                employee_data: res.data 
            });
        })
        .catch(err => console.log(err));

    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleInputChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    getTasks = () => {
        if(this.state.employee.length > 0){
                API.incompleteTasks(this.state.employee.split(" ").join("%20"))
                .then(res2 => {
                    console.log(res2.data);
                    this.setState({
                        incomplete : res2.data
                    })
                    API.incompleteNullTasks(this.state.employee.split(" ").join("%20"))
                    .then(res2 => {
                        console.log(res2.data);
                        this.setState({
                            incompleteNullTasks : res2.data
                        })
                        this.setState({
                            tasks: this.state.incomplete.concat(this.state.incompleteNullTasks).filter(x => x.quoteApproved !== false)
                        });
                        this.getCompletedTasks();
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    }

    printMap = () => {
        for (var [key, value] of this.state.sortParameters.entries()) {
            console.log(key + ' = ' + value);

        }

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

    render(){
        return (
            <div> 
            <Container>
            <Jumbotron>
            <FormGroup>
                <Label for="employee">Employee Name</Label>
                <Input type="select" name="employee" id="employee" onChange={this.handleInputChange} onClick={this.getTasks}>
                    <option>Choose your name</option>
                    {this.state.employee_data.map(x => <option value={x.EMP_NAME}>{x.EMP_NAME}</option>)}
                </Input>
            </FormGroup>
            </Jumbotron>
           
            </Container>
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


                    {/* <th className="col">SERVICE UNITS</th> */}
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
                <tr key={"activeList"+x.id} className="table-row">
                    <td key={"activeList"+x.id+"_quotationNumber"}>{"QN_" + x.quotationIssuedBy.substring(0,3).toUpperCase() + "_" + (x.id + 1023)}</td>
                    <td key={"activeList"+x.id+"_service"}>{x.service}</td>
                    <td key={"activeList"+x.id+"_client"}>{x.client}</td>
                    <td key={"activeList"+x.id+"_dateAssigned"}>{moment(x.dateAssigned).format("YYYY-MM-DD")}</td>
                    <td key={"activeList"+x.id+"_dueTime"}>{moment(x.dueDate).format("YYYY-MM-DD")}</td>
                    {/* <td key={"activeList"+x.id+"_serviceUnits"}>{x.qty}</td> */}
                    <td key={"activeList"+x.id+"_dateOfCompletion"}>
                    <Input
                          type="text"
                          name={"activeList"+ x.id + "_dateCompleted"}
                          id={"activeList"+ x.id + "_dateCompleted"}
                          defaultValue={moment(x.dateCompleted).format("YYYY-MM-DD")}
                          placeholder="Enter date of completion"
                          onChange={this.handleInputChange}
                        />
                    </td>
                    <td key={"activeList"+ x.id +"_status_notes_comments"}>
                    <Input
                          type="textarea"
                          name={"activeList"+ x.id + "_status_notes_comments"}
                          id={"activeList"+ x.id + "_status_notes_comments"}
                          defaultValue={x.status_notes_comments}
                          placeholder="Enter status/notes/comments"
                          onChange={this.handleInputChange}
                        />
                    </td>
                    {/* <td key={"activeList" + x.id + "serviceDescription"}>
                     <span style = {{'fontSize': '10px'}}>{x.serviceDescription}</span>

                    </td> */}
                    <td key={"activeList"+x.id+"_quoteApproved"}>
                    <FormGroup tag="fieldset">
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"activeList"+x.id+"_quoteApproved"} id={"activeList"+x.id+"_quoteApproved"} value={true}  onChange = {this.handleInputChange} checked = {!isNullOrUndefined(x.quoteApproved) || x.quoteApproved } onClick = {() => {
                                console.log(x.id);
                                var item = {
                                    // dateCompleted: document.getElementById("activeList"+x.id+ "_dateCompleted").value,
                                    // status_notes_comments: document.getElementById("activeList"+ x.id + "_status_notes_comments")
                                    dateCompleted: moment(document.getElementById("activeList"+x.id+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    quoteApproved: true,
                                    status_notes_comments: document.getElementById("activeList"+ x.id + "_status_notes_comments").value
                                }
                                API.modifyTask(x.id, item)
                                .then(res => {
                                    console.log("Quote approved");
                                    this.getTasks();
                                    this.setState({
                                    tasks: fastSort(fastSort(this.state.tasks).by([
                                    {desc: this.state.desc}
                                    ])).by([
                                    {asc: this.state.asc}
                                    ])});
                                    })
                                .catch(err => console.log(err))
                            }}/>{' '}
                            Yes
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"activeList"+x.id+"_quoteApproved"} id={"activeList"+x.id+"_quoteApproved"} value={false}  onChange = {this.handleInputChange} checked = {!isNullOrUndefined(x.quoteApproved) && !x.quoteApproved} onClick = {() => {
                                console.log(x.id);
                                var item = {
                                    // dateCompleted: document.getElementById("activeList"+x.id+ "_dateCompleted").value,
                                    quoteApproved: false,
                                    // status_notes_comments: document.getElementById("activeList"+ x.id + "_status_notes_comments")
                                    dateCompleted:moment(document.getElementById("activeList"+x.id+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    status_notes_comments: document.getElementById("activeList"+ x.id + "_status_notes_comments").value
                                }
                                API.modifyTask(x.id, item)
                                .then(() => {
                                    console.log("Quote not approved");
                                    this.getTasks();
                                    this.setState({
                                    tasks: fastSort(fastSort(this.state.tasks).by([
                                    {desc: this.state.desc}
                                    ])).by([
                                    {asc: this.state.asc}
                                    ])});
                                    })
                                .catch(err => console.log(err))
                            }}/>{' '}
                            No
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    </td>
                    <td key={"activeList"+x.id+"_completed"}>
                    <FormGroup tag="fieldset">
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"activeList"+x.id+"_completed"} value={true} onChange = {this.handleInputChange} checked = {!isNullOrUndefined(x.completed) || x.completed} onClick = {() => {
                                console.log(x.id);
                                console.log(document.getElementById("activeList"+x.id+ "_dateCompleted").value, document.getElementById("activeList"+ x.id + "_status_notes_comments").value);
                                console.log(!isNullOrUndefined(x.quoteApproved))
                                API.modifyTask(x.id, {
                                    completed: true,
                                    dateCompleted:moment(document.getElementById("activeList"+x.id+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    quoteApproved: x.quoteApproved || document.getElementById(),
                                    status_notes_comments: document.getElementById("activeList"+ x.id + "_status_notes_comments").value
                                })
                                .then(() => {
                                        console.log("Task completed");

                                    if(x.service.includes("Training")){
                                        API.addTask({
                                            quotationIssuedBy: "Jared",
                                            quotationNumber: "EMPTY",
                                            service: `Schedule a trainer`,
                                            client: `${x.client}`,
                                            instructions: `Create a task for trainer/ service provider manually`,
                                            startDate: x.dateAssigned,
                                            validThru: moment(Date(x.dateAssigned)).add(3, "days").format("YYYY-MM-DD")
                                        })
                                        .then(() => {
                                            console.log("Jared schedules a trainer!");
                                        })
                                        .catch(err => console.log(err));


                                        API.addTask({
                                            quotationIssuedBy: "Jared",
                                            quotationNumber: "EMPTY",
                                            service: `Get paperwork ready for ${"QN_" + x.quotationIssuedBy.substring(0,3).toUpperCase() + "_"+ (x.id + 1023)}`,
                                            client: `${x.client}`,
                                            instructions: ``,
                                            startDate: moment(x.dateAssigned).format("YYYY-MM-DD"),
                                            validThru: moment(x.dateAssigned).add(3, "days").format("YYYY-MM-DD")
                                        })
                                        .then(() => {
                                            console.log("Jared gets paperwork ready!");
                                        })
                                        .catch(err => console.log(err));
                                        
                                        API.addTask({
                                            quotationIssuedBy: "Morgan",
                                            quotationNumber: "EMPTY",
                                            service: `${x.service}`,
                                            client: `${x.client}`,
                                            instructions: `Provide training for ${"QN_" + x.quotationIssuedBy.substring(0,3).toUpperCase() + "_"+ (x.id + 1023)}`,
                                            startDate: `${moment(x.dateAssigned).format("YYYY-MM-DD")}`,
                                            validThru: `${moment(x.dateAssigned).add("days",30).format("YYYY-MM-DD")}`
                                        })
                                        .then(() => {
                                            console.log("Jared schedules a trainer!");
                                        })
                                        .catch(err => console.log(err));

                                        API.addTask({
                                            quotationIssuedBy: "Jared",
                                            quotationNumber: "EMPTY",
                                            service: "QN_" + x.quotationIssuedBy.substring(0,3).toUpperCase() + "_"+ (x.id + 1023) + " Paperwork- part 1",
                                            client: x.client,
                                            instructions: `Recieve, scan file, sign-in sheet and update training tracker`,
                                            startDate: moment(x.dateAssigned).add(30, "days").format("YYYY-MM-DD"),
                                            validThru: moment(x.dateAssigned).add(36,"days").format("YYYY-MM-DD")
                                        })
                                        .then(() => {
                                            console.log("Jared paperwork -1 !");
                                        })
                                        .catch(err => console.log(err));

                                        API.addTask({
                                            quotationIssuedBy: "Jared",
                                            quotationNumber: "EMPTY",
                                            service: "QN_" + x.quotationIssuedBy.substring(0,3).toUpperCase() + "_"+ (x.id + 1023) + " Paperwork- part 2",
                                            client: `${x.client}`,
                                            instructions: `Verify names of class participants with client`,
                                            startDate: moment(x.dateAssigned).add(3, "days").format("YYYY-MM-DD"),
                                            validThru: moment(x.dateAssigned).add(6, "days").format("YYYY-MM-DD")
                                        })
                                        .then(() => {
                                            console.log("Jared paperwork -2 !");
                                        })
                                        .catch(err => console.log(err));

                                        API.addTask({
                                            quotationIssuedBy: "Jared",
                                            quotationNumber: "EMPTY",
                                            service: "QN_" + x.quotationIssuedBy.substring(0,3).toUpperCase() + "_"+ (x.id + 1023) + " Paperwork- part 3",
                                            client: `${x.client}`,
                                            instructions: `Create and send cards`,
                                            startDate: moment(x.dateAssigned).add(3,"days").format("YYYY-MM-DD"),
                                            validThru: moment(x.dateAssigned).add(14, "days").format("YYYY-MM-DD")
                                        })
                                        .then(() => {
                                            console.log("Jared paperwork -3 !");
                                        })
                                        .catch(err => console.log(err));

                                        API.addTask({
                                            quotationIssuedBy: "Jared",
                                            quotationNumber: "EMPTY",
                                            service: "QN_" + x.quotationIssuedBy.substring(0,3).toUpperCase() + "_"+ (x.id + 1023) + " Paperwork- part 4",
                                            client: `${x.client}`,
                                            instructions: `Verify cards were recieved on due date`,
                                            startDate: moment(x.dateAssigned).add(14,"days").format("YYYY-MM-DD"),
                                            validThru: moment(x.dateAssigned).add(21, "days").format("YYYY-MM-DD")
                                        })
                                        .then(() => {
                                            console.log("Jared paperwork - 4 !");
                                        })
                                        .catch(err => console.log(err));
                                    }
                                })
                                .catch(err => console.log(err));
                            this.getCompletedTasks();
                            
                            
                            }}/>{' '}
                            Yes
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"activeList"+x.id+"_completed"}  checked = {!isNullOrUndefined(x.completed) && !x.completed} value={false} onChange = {this.handleInputChange} onClick = {() => {
                             console.log(x.id);
                                var item = {
                                    completed: false,
                                    dateCompleted:moment(document.getElementById("activeList"+x.id+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    quoteApproved: x.quoteApproved || document.getElementById("activeList"+x.id+"_quoteApproved").value === true,
                                    status_notes_comments: document.getElementById("activeList"+ x.id + "_status_notes_comments").value
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
            <br/><br/>
            <h5 style = {{'fontFamily': 'Noto Serif SC, serif'}}>Completed Tasks</h5>
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
                {this.state.completedTasks.map((x) => 
                <tr key={"completedList"+x.id} className="table-row">
                    <td key={"completedList"+x.id+"_quotationNumber"}>{"QN_" + x.quotationIssuedBy.substring(0,3).toUpperCase() + "_" + (x.id + 1023)}</td>
                    <td key={"completedList"+x.id+"_service"}>{x.service}</td>
                    <td key={"completedList"+x.id+"_client"}>{x.client}</td>
                    <td key={"completedList"+x.id+"_dateAssigned"}>{moment(x.dateAssigned).format("YYYY-MM-DD")}</td>
                    <td key={"completedList"+x.id+"_dueTime"}>{moment(x.dueDate).format("YYYY-MM-DD")}</td>
                    <td key={"completedList"+x.id+"_serviceUnits"}>{x.qty}</td>
                    <td key={"completedList"+x.id+"_dateOfCompletion"}>
                    <Input
                          type="text"
                          name={"completedList"+ x.id + "_dateCompleted"}
                          id={"completedList"+ x.id + "_dateCompleted"}
                          defaultValue={moment(x.dateCompleted).format("YYYY-MM-DD")}
                          placeholder="Enter date of completion"
                          onChange={this.handleInputChange}
                        />
                    </td>
                    <td key={"completedList"+ x.id +"_status_notes_comments"}>
                    <Input
                          type="textarea"
                          name={"completedList"+ x.id + "_status_notes_comments"}
                          id={"completedList"+ x.id + "_status_notes_comments"}
                          defaultValue={x.status_notes_comments}
                          placeholder="Enter status/notes/comments"
                          onChange={this.handleInputChange}
                        />
                    </td>
                    {/* <td key={"completedList" + x.id + "serviceDescription"}>
                     <span style = {{'fontSize': '10px'}}>{x.serviceDescription}</span>

                    </td> */}
                    <td key={"completedList"+x.id+"_quoteApproved"}>
                    <FormGroup tag="fieldset">
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"completedList"+x.id+"_quoteApproved"} id={"completedList"+x.id+"_quoteApproved"} value={true}  onChange = {this.handleInputChange} checked = {!isNullOrUndefined(x.quoteApproved) || x.quoteApproved} onClick = {() => {
                                console.log(x.id);
                                var item = {
                                    // dateCompleted: document.getElementById("completedList"+x.id+ "_dateCompleted").value,
                                    // status_notes_comments: document.getElementById("completedList"+ x.id + "_status_notes_comments")
                                    dateCompleted: moment(document.getElementById("completedList"+x.id+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    quoteApproved: true,
                                    status_notes_comments: document.getElementById("completedList"+ x.id + "_status_notes_comments").value
                                }
                                API.modifyTask(x.id, item)
                                .then(res => {
                                    console.log("Quote approved");
                                    this.getTasks();
                                    this.setState({
                                    tasks: fastSort(fastSort(this.state.tasks).by([
                                    {desc: this.state.desc}
                                    ])).by([
                                    {asc: this.state.asc}
                                    ])});
                                    })
                                .catch(err => console.log(err))
                            }}/>{' '}
                            Yes
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"completedList"+x.id+"_quoteApproved"} id={"completedList"+x.id+"_quoteApproved"} value={false}  onChange = {this.handleInputChange}  checked = {!isNullOrUndefined(x.quoteApproved) && !x.quoteApproved} onClick = {() => {
                                console.log(x.id);
                                var item = {
                                    // dateCompleted: document.getElementById("completedList"+x.id+ "_dateCompleted").value,
                                    quoteApproved: false,
                                    // status_notes_comments: document.getElementById("completedList"+ x.id + "_status_notes_comments")
                                    dateCompleted:moment(document.getElementById("completedList"+x.id+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    status_notes_comments: document.getElementById("completedList"+ x.id + "_status_notes_comments").value
                                }
                                API.modifyTask(x.id, item)
                                .then(() => {
                                    console.log("Quote not approved");
                                    this.getTasks();
                                    this.setState({
                                    tasks: fastSort(fastSort(this.state.tasks).by([
                                    {desc: this.state.desc}
                                    ])).by([
                                    {asc: this.state.asc}
                                    ])});
                                    })
                                .catch(err => console.log(err))
                            }}/>{' '}
                            No
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    </td>
                    <td key={"completedList"+x.id+"_completed"}>
                    <FormGroup tag="fieldset">
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name={"completedList"+x.id+"_completed"}  checked = {!isNullOrUndefined(x.completed) || x.completed} value={true} onChange = {this.handleInputChange} onClick = {() => {
                                console.log(x.id);
                                console.log(document.getElementById("completedList"+x.id+ "_dateCompleted").value, document.getElementById("completedList"+ x.id + "_status_notes_comments").value);
                                console.log(!isNullOrUndefined(x.quoteApproved))
                                var item = {
                                    completed: true,
                                    dateCompleted:moment(document.getElementById("completedList"+x.id+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    quoteApproved: x.quoteApproved,
                                    status_notes_comments: document.getElementById("completedList"+ x.id + "_status_notes_comments").value
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
                            <Input type="radio" name={"completedList"+x.id+"_completed"}  checked = {!isNullOrUndefined(x.completed) && !x.completed} value={false} onChange = {this.handleInputChange} onClick = {() => {
                             console.log(x.id);
                                var item = {
                                    completed: false,
                                    dateCompleted:moment(document.getElementById("completedList"+x.id+ "_dateCompleted").value).format("YYYY-MM-DD"),
                                    quoteApproved: x.quoteApproved,
                                    status_notes_comments: document.getElementById("completedList"+ x.id + "_status_notes_comments").value
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

export default TaskList;