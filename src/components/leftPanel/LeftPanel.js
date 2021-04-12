import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../styles/components/leftPanel/leftPanel.style.css";

const mapStateToProps = (state) => ({
  data: state.functionalReducer,
});

class LeftPanel extends Component {
  render() {
    const {
      data: { storedInboxMails = [], storedSpamMails = [] } = {},
    } = this.props;
    const inboxUnreadCount = storedInboxMails.filter(
      (eachMail) => eachMail.unread === true
    ).length;
    const spamUnreadCount = storedSpamMails.filter(
      (eachMail) => eachMail.unread === true
    ).length;
    return (
      <>
        <div className="left-panel">
          <p className="folder-title">Folders</p>
          <div className="folders-section">
            <NavLink to="/inbox">
              <div className="folder">
                Inbox <span className="unread-count">{inboxUnreadCount}</span>
              </div>
            </NavLink>
            <NavLink to="/spam">
              <div className="folder">
                Spam <span className="unread-count">{spamUnreadCount}</span>
              </div>
            </NavLink>
            <NavLink to="/deletedItems">
              <div className="folder">Deleted Items</div>
            </NavLink>
            <NavLink to="/custom">
              <div className="folder">Custom Folder</div>
            </NavLink>

            <NavLink to="/input">
              <div className="folder">Input Box Page</div>
            </NavLink>

            <NavLink to="/tableSorting">
              <div className="folder">Table Sort</div>
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(LeftPanel);
