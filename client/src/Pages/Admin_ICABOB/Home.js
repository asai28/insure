import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <button
          onClick={() => {
            this.props.alert.show("Oh look, an alert!");
          }}
        >
          Show Alert
        </button>
        <button
          onClick={() => {
            this.props.alert.error("You just broke something!");
          }}
        >
          Oops, an error
        </button>
        <button
          onClick={() => {
            this.props.alert.success("It's ok now!");
          }}
        >
          Success!
        </button>
      </Fragment>
    );
  }
}

export default withAlert(Home);
