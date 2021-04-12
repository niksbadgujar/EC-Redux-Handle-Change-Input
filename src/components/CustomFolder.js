import React, { Component } from "react";
import "../styles/components/customFolder.style.css";

class CustomFolder extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="custom-folder-section">
          Custom Folder Section (Under Maintenance)
        </div>
      </>
    );
  }
}

export default CustomFolder;
