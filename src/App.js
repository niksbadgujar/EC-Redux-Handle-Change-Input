import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/MainComponent";
import store from "./redux/configureStore";
import applicationURL from './constants';

class App extends React.Component {
  render() {
    console.log('applicationURL in App - ', applicationURL);
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
