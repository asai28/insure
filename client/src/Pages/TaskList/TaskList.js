import React from "react";
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import API from "../../utils/API";

var employee_data = [];

class TaskList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: true,
            employee_data: []
        };
        this.toggle = this.toggle.bind(this);
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

    render(){
        return (
            <div> 
            <Jumbotron>
            <FormGroup>
                <Label for="employee">Employee Name</Label>
                <Input type="select" name="select" id="exampleSelect">
                    <option>Choose your name</option>
                    {this.state.employee_data.map(x => <option value={x.EMP_NAME}>{x.EMP_NAME}</option>)}
                </Input>
            </FormGroup>
            </Jumbotron>
            <br/><br/>
            <h5 style = {{'fontFamily': 'Noto Serif SC, serif'}}>Active Tasks</h5>

            <h5 style = {{'fontFamily': 'Noto Serif SC, serif'}}>Completed Tasks</h5>
            </div>
        )
    }
}

export default TaskList;