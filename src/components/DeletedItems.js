import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/components/deletedItems.style.css";

const mapStateToProps = (state) => {
  return {
    data: state.functionalReducer,
  };
};

class DeletedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMail: {},
    };
  }

  handleDeletedMailBoxClick = (mId) => {
    const { data: { deletedMails = [] } = {} } = this.props;
    const selectedMail = deletedMails.filter(
      (eachMail) => eachMail.mId === mId
    )[0];
    this.setState({
      selectedMail,
    });
  };

  render() {
    const { data: { deletedMails = [] } = {} } = this.props;
    const { selectedMail = {} } = this.state;
    return (
      <>
        <div className="deleted-items-section">
          <div style={{ padding: "1%", height: "3%" }}></div>
          {deletedMails.map((mail) => (
            <div className="mail-box" key={mail.mId}>
              <div
                className="mail-content-section"
                onClick={() => this.handleDeletedMailBoxClick(mail.mId)}
              >
                <h3 className="subject-line">{mail.subject}</h3>
                <h4 className="mail-short-content">{mail.content}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="mail-details-section">
          {Object.keys(selectedMail).length !== 0 && (
            <div className="mail-body">
              <h2>{selectedMail.subject}</h2>
              <p>{selectedMail.content}</p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(DeletedItems);
