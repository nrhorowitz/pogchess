import React from 'react';
import Landing from '../Landing';
import Login from '../Login';
import SignUp from '../SignUp';
import CreateRoom from '../CreateRoom';
import Room from '../Room';
import Dashboard from '../Dashboard';

import Loading from '../Loading';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import firebase from '../Firebase';

import '../../css/index.css';


const uuidv1 = require('uuid/v1');
var pendingRequests = {};
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          localData: {},
        }
        this.renderView = this.renderView.bind(this);
        this.data = this.data.bind(this);
        this.updateData = this.updateData.bind(this);
        this.writeData = this.writeData.bind(this);
    }

    componentWillMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          
        } else {

        }
        this.setState({loading: false});
      });
    }

    data(tree, id) {
      if ((tree + id) in pendingRequests) {
        return;
      }
      var current = this.state.localData;
      if (current[tree] === undefined) {
        current[tree] = {};
      }
      if (current[tree][id] === undefined) {
        pendingRequests[tree + id] = true;
        firebase.firestore().collection(tree).doc(id).get().then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            delete pendingRequests[tree + id];
            current[tree][id] = doc.data();
            this.setState({localData: current});
            return null;
          }
        }).catch(err => {
          console.log('Error getting document', err);
        });
      }
      return current[tree][id];
    }

    updateData(tree, id, category, value) {
      var current = this.state.localData;
      if (current[tree] === undefined) {
        current[tree] = {};
      }
      if (current[tree][id] === undefined) {
        current[tree][id] = {};
      }
      current[tree][id][category] = value;
      firebase.firestore().collection(tree).doc(id).set({
        [category]: value
      }, {merge: true}).then(() => {
        this.setState({localData: current});
      }).catch((error) => {
        console.log(error);
      });
    }

    writeData(tree, data, id=false) {
      if (!id) {
        var write = firebase.firestore().collection(tree).doc()
        write.set(data).then(() => {
          var id = write.id
          var current = this.state.localData
          if (current[tree] === undefined) {
            current[tree] = {}
          }
          if (current[tree][id] === undefined) {
            current[tree][id] = {}
          }
          for (var key in data) {
            current[tree][id][key] = data[key]
          }
          this.setState({localData: current});
        }).catch((error) => {
          console.log("error", error)
        })
      } else {
        var write = firebase.firestore().collection(tree).doc(id)
        write.set(data).then(() => {
          var id = write.id
          var current = this.state.localData
          if (current[tree] === undefined) {
            current[tree] = {}
          }
          if (current[tree][id] === undefined) {
            current[tree][id] = {}
          }
          for (var key in data) {
            current[tree][id][key] = data[key]
          }
          this.setState({localData: current})
        }).catch((error) => {
          console.log("error", error)
        })
      }
    }

    renderView(name, pathInput=" ") {
        if (name === "Landing") {
            return (
                <Landing
                    firebase = {firebase}
                ></Landing>
            )
        } else if (name === "Login") {
            return (
                <Login
                    firebase = {firebase}
                ></Login>
            )
        } else if (name === "SignUp") {
            return (
                <SignUp
                    firebase = {firebase}
                ></SignUp>
            )
        } else if (name === "CreateRoom") {
          return (
              <CreateRoom
                  firebase = {firebase}
                  uuidv1 = {uuidv1}
                  data = {this.data}
                  writeData = {this.writeData}
                  updateData = {this.updateData}
              ></CreateRoom>
          )
        } else if (name === "Room") {
          const pathInputId = pathInput.location.search.split('=')[1];
          return (
              <Room
                  firebase = {firebase}
                  roomId = {pathInputId}
              ></Room>
          )
      } else if (name === "Dashboard") {
        return (
            <Dashboard
                firebase = {firebase}
                data = {this.data}
            ></Dashboard>
        )
      }
    }

    render() {
      console.log(firebase.auth().currentUser);
      console.log(this.state.localData);
      if (this.state.loading) {
        return (
          <Loading></Loading>
        )
      } else {
        return (
          <div>
            <Router>
              <Switch>
                <Route exact path="/" component={() => this.renderView("Landing")} />
                <Route exact path="/login" component={() => this.renderView("Login")} />
                <Route exact path="/signup" component={() => this.renderView("SignUp")} />
                <Route exact path="/createroom" component={() => this.renderView("CreateRoom")} />
                <Route exact path="/room" component={(id) => this.renderView("Room", id)} />
                <Route exact path="/dashboard" component={() => this.renderView("Dashboard")} />


              </Switch>
            </Router>
          </div>
        )
      }
    }
}

export default App;