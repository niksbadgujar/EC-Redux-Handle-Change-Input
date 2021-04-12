import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/components/spam.style.css";

const mapStateToProps = (state) => ({
  data: state.functionalReducer,
});

class Spam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spamData: [],
      selectedSpamMail: {},
    };
  }

  componentDidMount() {
    const { data: { storedSpamMails = [] } = {} } = this.props;
    this.setState({
      spamData: storedSpamMails,
    });
  }

  handleMailBoxClick = (mId) => {
    const { spamData = [] } = this.state;
    const selectedSpamMail = spamData.filter(
      (eachMail) => eachMail.mId === mId
    )[0];
    this.setState({
      selectedSpamMail,
    });
  };

  render() {
    const { spamData = [], selectedSpamMail = {} } = this.state;
    return (
      <>
        <div className="spam-section">
          <div style={{ padding: "1%", height: "3%" }}></div>
          {spamData.map((mail) => (
            <div
              className="mail-box"
              key={mail.mId}
              onClick={() => this.handleMailBoxClick(mail.mId)}
            >
              <h3>{mail.subject}</h3>
              <h4 className="mail-short-content">{mail.content}</h4>
            </div>
          ))}
        </div>

        <div className="mail-details-section">
          {Object.keys(selectedSpamMail).length !== 0 && (
            <div className="mail-body">
              <h2>{selectedSpamMail.subject}</h2>
              {<p>{selectedSpamMail.content}</p>}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(Spam);
