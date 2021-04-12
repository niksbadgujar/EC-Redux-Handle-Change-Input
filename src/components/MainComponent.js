import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../components/header/Header";
import LeftPanel from "../components/leftPanel/LeftPanel";
import Inbox from "../components/Inbox";
import "../styles/components/mainComponent.style.css";
import DeletedItems from "./DeletedItems";
import Spam from "./Spam";
import CustomFolder from "./CustomFolder";
import InputBoxComponent from './InputBoxComponent';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  storeInboxMails,
  storeSpamMails,
} from "../redux/actionCreators/storeActions";
import TableSorting from "./TableSorting";

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      storeInboxMails,
      storeSpamMails,
    },
    dispatch
  );

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch("inbox.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((responseData) => {
        this.props.storeInboxMails(responseData);
      });

    fetch("spam.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((responseData) => {
        this.props.storeSpamMails(responseData);
      });
  }

  render() {
    return (
      <>
        <Header />
        <div className="flex-container">
          <LeftPanel />
          <Switch>
            <Route path="/inbox" component={Inbox} />
            <Route path="/deletedItems" component={DeletedItems} />
            <Route path="/spam" component={Spam} />
            <Route path="/custom" component={CustomFolder} />
            <Route path="/input" component={InputBoxComponent} />
            <Route path="/tableSorting" component={TableSorting} />
          </Switch>
        </div>
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(Main);
