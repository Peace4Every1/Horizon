import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';

const apikey = "b98a9af6b1d19496323f129a327b4f69";

class Search extends Component {
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.findTrack = this.findTrack.bind(this);
    }

    findTrack(e){
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.props.state.name}&page_size=10&page=1&s_track_rating=desc&apikey=${apikey}`)
        .then(res => {
            this.props.onGet(res);
        })
    }

    onChange(e){
        this.props.setName( e.target.value );
    }

    render() {
        return (
        <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For A Song
            </h1>
            <p className="lead text-center">Get the lyrics for any song</p>
            <form onSubmit={this.findTrack}>
                <div className="form-group">
                    <input type="text" name="trackTitle" value={this.props.state.name || ''} onChange={this.onChange} placeholder="Song title..." className="form-control form-control-lg"/>
                </div>
                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Get Track Lyrics</button>
            </form>
        </div>
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
        setName: songName => {
            dispatch({
                type: "SET_NAME",
                name: songName
            })
        },
        onGet: res => {
            dispatch({
                type: "SEARCH_TRACKS",
                payload: res.data.message.body.track_list
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);