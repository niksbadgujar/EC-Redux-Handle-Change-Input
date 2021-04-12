import React, { Component } from "react";
import "../styles/components/inbox.style.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  storeDeletedMails,
  storeNonDeletedInboxMails,
} from "../redux/actionCreators/storeActions";

const mapStateToProps = (state) => ({
  data: state.functionalReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      storeDeletedMails,
      storeNonDeletedInboxMails,
    },
    dispatch
  );

class Inbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inboxData: [],
      selectedInboxMail: {},
      deletedMails: [],
      flaggedMails: [],
      originalInboxData: [],
      noFlaggedMailMessage: "",
    };
  }

  componentDidMount() {
    const { data: { storedInboxMails = [] } = {} } = this.props;
    this.setState({
      inboxData: storedInboxMails,
      originalInboxData: storedInboxMails,
    });
  }

  componentDidUpdate(prevProps) {
    const { data: { storedInboxMails = [] } = {} } = this.props;
    const {
      data: { storedInboxMails: prevStoredInboxMails = [] } = {},
    } = prevProps;
    if (storedInboxMails !== prevStoredInboxMails) {
      this.setState({
        inboxData: storedInboxMails,
      });
    }
  }

  handleMailBoxClick = (mId) => {
    const { inboxData = [] } = this.state;
    const selectedInboxMail = inboxData.filter(
      (eachMail) => eachMail.mId === mId
    )[0];
    this.setState({
      selectedInboxMail,
    });
  };

  handleDeleteInbox = (mId) => {
    const { inboxData = [], deletedMails = [] } = this.state;
    const deletedMail = inboxData.filter((eachMail) => eachMail.mId === mId)[0];
    const nonDeletedMails = inboxData.filter(
      (eachMail) => eachMail.mId !== mId
    );
    this.setState(
      {
        deletedMails: [...deletedMails, deletedMail],
        selectedInboxMail: {},
      },
      () => this.saveDeletedMails(nonDeletedMails)
    );
  };

  handleFlagClick = (mId) => {
    const { inboxData = [], flaggedMails = [] } = this.state;
    const flaggedMail = inboxData.filter((eachMail) => eachMail.mId === mId)[0];
    this.setState({
      flaggedMails: [...flaggedMails, flaggedMail],
    });
  };

  saveDeletedMails = (nonDeletedMails) => {
    const { deletedMails = [] } = this.state;
    this.props.storeNonDeletedInboxMails(nonDeletedMails);
    this.props.storeDeletedMails(deletedMails);
  };

  handleCategoryChange = (event) => {
    const { target: { value = "" } = {} } = event;
    const { flaggedMails = [], originalInboxData = [] } = this.state;
    if (value === "flagged") {
      if (flaggedMails.length === 0) {
        this.setState({
          noFlaggedMailMessage: "No Flagged Mails",
          inboxData: [],
        });
      } else {
        this.setState({
          inboxData: flaggedMails,
          noFlaggedMailMessage: "",
        });
      }
    } else {
      this.setState({
        inboxData: originalInboxData,
        noFlaggedMailMessage: "",
      });
    }
  };

  getFlagButtonValue = (mId) => {
    const { flaggedMails = [] } = this.state;
    const data = flaggedMails.filter((eachMail) => eachMail.mId === mId);
    if (data[0] !== undefined) {
      if (data[0].mId === mId) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  render() {
    const {
      inboxData = [],
      selectedInboxMail = {},
      noFlaggedMailMessage = "",
    } = this.state;
    return (
      <>
        <div className="inbox-section">
          <select
            className="category-dropdown"
            onChange={(e) => this.handleCategoryChange(e)}
          >
            <option value="select">Select Category</option>
            <option value="all">Show All</option>
            <option value="flagged">Flagged</option>
          </select>
          {noFlaggedMailMessage && (
            <p className="no-flagged-text">{noFlaggedMailMessage}</p>
          )}
          {inboxData.map((mail) => (
            <div className="mail-box" key={mail.mId}>
              <div className="mail-operation-section">
                <h3 className="subject-line">{mail.subject}</h3>
                <input
                  type="button"
                  value="Delete"
                  className="delete-button"
                  onClick={() => this.handleDeleteInbox(mail.mId)}
                />
                <input
                  type="button"
                  value="Flag"
                  className="flag-button"
                  disabled={this.getFlagButtonValue(mail.mId)}
                  onClick={() => this.handleFlagClick(mail.mId)}
                />
              </div>
              <div
                className="mail-content-section"
                onClick={() => this.handleMailBoxClick(mail.mId)}
              >
                <h4 className="mail-short-content">{mail.content}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="mail-details-section">
          {Object.keys(selectedInboxMail).length !== 0 && (
            <div className="mail-body">
              <h2>{selectedInboxMail.subject}</h2>
              <p>{selectedInboxMail.content}</p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
