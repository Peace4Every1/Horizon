import React, { Component } from 'react'
import axios from 'axios';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
//Seperating the application state (stored in Redux store) and component state, because this data is going to be used only in this component, and nowhere else in the whole project

class Lyrics extends Component {
    constructor(props){
        super(props);
        this.state = {
            track: {},
            lyrics: {}
        }
    }
    
    componentDidMount(){
        const apikey = "b98a9af6b1d19496323f129a327b4f69";
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${apikey /*process.env.REACT_APP_MM_KEY*/}`)
        .then(res => {
            // console.log(res.data.message);
            this.setState({lyrics: res.data.message.body.lyrics});

            return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${apikey}`);
        })
        .then(res => {
            // console.log(res.data.message)
            this.setState({track: res.data.message.body.track});
        })
        .catch(err => console.log(err))
    }

    render() {
        const { track, lyrics } = this.state;
        if(
            track === undefined ||
            lyrics === undefined ||
            //Cos these are non-primitive data types (objects) I can't just check them for equality (it'll check their references)
            Object.keys(track).length === 0 ||
            Object.keys(lyrics).length === 0 
        ) {
            return <Spinner />;
        } else {
                return (
                    <React.Fragment>
                        <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                        <div className="card">
                            <h5 className="card-header">
                                {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
                            </h5>
                            <div className="card-body">
                                <p className="card-text">{lyrics.lyrics_body}</p>
                            </div>
                        </div>

                        <ul className="list-group mt-3">
                            <li className="list-group-item">
                                <strong>Album ID</strong>: {track.album_id}
                            </li>
                            <li className="list-group-item">
                                <strong>Song Genre</strong>: {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                            </li>
                            <li className="list-group-item">
                                <strong>Explicit Words</strong>:  {track.explicit === 0 ? 'No' : 'Yes'}
                            </li>
                            <li className="list-group-item">
                                <strong>Release Date</strong>:  <Moment format="DD/MM/YYYY">{track.first_release_date}</Moment>
                            </li>
                        </ul>
                    </React.Fragment>

                );
        }
    }
}

export default Lyrics;