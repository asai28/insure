import React from "react";
// import {Button, FormGroup, Label, Input} from "reactstrap";
// import {  FaBeer } from 'react-icons/fa';
// //FaCheckCircleO, FaCircleO,
// const styles = {
//     'FaCircleO' : {
//       'color' : '#339933'
//     }
//   }
  

// class MultiSelectWithCheckBox extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             equipmentsForSite: ["Laptop", "Projector Screen", "TV monitor", "Table", "electrical power socket with extension cord"],
//             equipmentsSelectedSite: [],
//             equipmentsSelectedTraining: [],
//             equipmentsForTraining : ["Laptop", "Projector Screen", "TV monitor", "Table", "Electrical power socket with extension cord", "Forklift training kit", "CPR mannequins", "First aid training bag", "AED training device", "Handouts"]
//         }
//         this.handleClick = this.handleClick.bind(this);

//     }
//     handleClick = e => {
//         console.log(e.target);
//         const {name, value} = e.target;
//         console.log(name, value);
//     }
//     // {<input type="checkbox" id="scales" name="feature"
//     //            value="scales" checked />}
//     render() {
//         return (
//             <div>
//             <FormGroup>
//               <Label for="exampleSelectMulti">Select Multiple</Label>
//               <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
//               {this.state.equipmentsForSite.map((x, index )=> 
//                 (<option key = {"siteEquipment" + index} name = {"siteEquipment" + index} value={x} onClick = {this.handleClick}>{x}</option>)
//               )
//               }
//               </Input>
//             </FormGroup>
//             </div>
//         )
//     }
// };

import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
 
// ...
const options = [
  { label: 'Thing 1', value: 1},
  { label: 'Thing 2', value: 2},
];
const MultiSelectWithCheckBox = () => {
return (
<ReactMultiSelectCheckboxes options={options} />
)
}

export default MultiSelectWithCheckBox;