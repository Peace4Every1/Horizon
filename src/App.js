import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Index from './components/Layout/Index';
import axios from 'axios';
import Lyrics from './components/tracks/Lyrics';
import { connect } from 'react-redux';

import './App.css';

export const apikey = "b98a9af6b1d19496323f129a327b4f69";
class App extends Component {
  componentDidMount(){
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${apikey /*process.env.REACT_APP_MM_KEY*/}`)
    .then(res => {
      
      this.props.onGet(res);
      // console.log(res.data.message.body.track_list);
    })
    // .catch(err => console.log(err))
  }
  render() {
    // console.log(this.props.state);
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            {/* <h2 style={{textAlign: "center"}}>{this.props.state.heading}</h2> */}
            <Switch>
              <Route exact path="/" component = {Index} />
              <Route exact path="/lyrics/track/:id" component = {Lyrics} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

function mapStateToProps(state){
  return {
    state
  };
}

function mapDispatchToProps(dispatch){
  return {
    onGet: res => {
      dispatch({
        type: "GET_TOP",
        track_list: res.data.message.body.track_list
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);