import React, { Component } from 'react'
import Axios from 'axios';
import TMDB_api_key from '../../../TMDB_api_key'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getInfo } from '../../../ducks/reducer'
import './Search.css'

class Search extends Component {
    constructor(){
        super()

        this.state = {
            poster: '',
            posters: []
        }
    }

    componentDidMount(){
        console.log(this.props.posters)
        let allPosters = this.props.posters.map(poster => {
            return poster.poster
        })
        this.setState({
            posters: allPosters
        })
        let query = this.props.search.replace(/ /g, '%20')
        console.log(query)
        Axios.get(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${query}&language=en-US&api_key=${TMDB_api_key.tmdb}`).then(res => {
            console.log(res.data.results[0])
            if(!res.data.results[0]){
                this.setState({
                    poster: ''
                })
            } else {
                this.setState({
                    poster: `https://image.tmdb.org/t/p/original${res.data.results[0].poster_path}`
                })
            }
        })
    }


    render() {
        let index = this.state.posters.indexOf(this.state.poster)
        if(index === -1){
            return (
            <div>
               <div className='searchS'>
               <div className='paddingN'></div>
                    Movie Not Available
               </div>
               <div className='exact'>
                   Please Make Sure Spelling Is Exact
               </div>
               <div className='LinkDiv'>
               <Link className='linkHome'to='/DriveMovies'>Return Home</Link>
               </div>
            </div>
            )
        } else { 
            console.log(this.props.posters[index])
            return (
                <div className='search'>
                <div className='padding'></div>
                    <Link to='/MovieInfo'>
                        <img src={this.state.poster} alt="" width='350px' height='500px' onClick={
                            () => {this.props.getInfo({
                                year: this.props.posters[index].year,
                                title: this.props.posters[index].title,
                                id: this.props.posters[index].id
                            })}
                        }/>
                    </Link>
                    
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    let { search, posters } = state
    return {
        search,
        posters
    }
}

export default connect(mapStateToProps, { getInfo })(Search)
