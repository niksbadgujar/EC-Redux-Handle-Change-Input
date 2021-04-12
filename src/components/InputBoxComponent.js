import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  handleInputChangeInStore,
} from "../redux/actionCreators/storeActions";
import { fieldDataMock } from './MockInputBoxData/MockInputBoxData';

const mapStateToProps = (state) => ({
  data: state.functionalReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleInputChangeInStore,
    },
    dispatch
  );

const InputBoxComponent = ({ data, handleInputChangeInStore }) => {

  useEffect(() => {
    const fieldDataMockArray = Object.entries(fieldDataMock);
    fieldDataMockArray.map((eachField) => {
      handleInputChangeInStore(eachField[0], eachField[1]);
    })
  }, [fieldDataMock]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const regEx = new RegExp(/^\d*(?:\.\d{0,2})?$/)
    if (name === 'firstName') {
      if (regEx.test(value)) {
        handleInputChangeInStore(name, value);
      }
    } else {
      handleInputChangeInStore(name, value);
    }
  }

  const {
    fieldData: {
      firstName = '',
      lastName = '',
    } = {},
    fieldData = {},
  } = data;
  console.log('fieldData - ', fieldData);
  return (
    <>
      <div>
        <label>First Name</label><br />
        <input type="text" name="firstName" value={firstName} onChange={(e) => handleChange(e)}/>

        <label>Last Name</label><br />
        <input type="text" name="lastName" value={lastName} onChange={(e) => handleChange(e)}/>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBoxComponent);