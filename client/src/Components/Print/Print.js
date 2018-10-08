
import React, {Component, PropTypes} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./Print.css";
import {Base64} from "js-base64";

export default class Export extends Component {
  constructor(props) {
    super(props);
    this.printDocument = this.printDocument.bind(this);
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

  render() {
    return (<div>
      <div className="mb5">
        <button onClick={this.printDocument}>Print</button>
      </div>
      <div id="divToPrint" className="mt4">
        {/* <div>Note: Here the dimensions of div are same as A4</div> 
        <div>You Can add any component here</div> */}
        <img src = "logo.png" alt="Insure Compliance Logo" />
        <h1 className="text-center">Insure Compliance</h1>
        <h2 className="text-center">Service Request Form</h2>

      </div>
    </div>)
  }
}