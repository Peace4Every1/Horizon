import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import Track from './Track';


class Tracks extends Component {
  render() {
    console.log(this.props.storeSt);
   
    return (
      <div>
        { (() => {
           const { track_list } = this.props.storeSt;
          if (track_list === undefined || track_list.length === 0){
            return <Spinner />
        } else {
          return (
            <React.Fragment>
              <h3 className="text-center mb-4">{this.props.heading}</h3>
              <div className="row">
                {track_list.map(item => (
                  <Track key={item.track.track_id} track={item.track}/>
                ))}
              </div>
            </React.Fragment>
            );
          }
        })()
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    storeSt: state
  };
}

export default connect(mapStateToProps)(Tracks);