import React, {useEffect, useState} from 'react';
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";



const imgurl = "https://image.tmdb.org/t/p/original/";


function Row({title, fetchUrl, isLargerRow}) {
    const[movies,setMovies]=useState([]);
    const [trailerUrl,setTrailerUrl] = useState("")

    useEffect(() =>{

        async function fetchData(){
            const request = await axios.get(fetchUrl,{
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDZmNDI3YjNlYjNkOWNjZGQ0MDYyYmZlZTM0NjlmNSIsInN1YiI6IjY0OTlhNmQwOTU1YzY1MDE0NDRlOWVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vwe_CB3H5ByR_6EsZX6KhgBR4A7npTIDYQqiR5hSKLg'
                }
            });
            //  console.log(fetchUrl)
            setMovies(request.data.results);
            return request;
        }
        fetchData();

    },[fetchUrl])
    // console.table(movies)

    function fetchVideoLink(videoId) {
        const url = `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=8789b2e1805f257e5339cb972533b290`;
        axios
          .get(url)
          .then((res) => {
            if (res.data.results.length !== 0)
              console.log(res.data.results[0]?.key);
            setTrailerUrl(res.data.results[0]?.key);
          })
          .then((movieKey) => movieKey);
      }
    
      const handleClick = (movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          fetchVideoLink(movie.id);
        }
      };

    const opts ={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1
        },

    }

    // const handleClick = (movie) =>{
    //     if (trailerUrl){
    //         settrailerUrl("")
    //     }else{
    //         movieTrailer(movie?.name || "").then((url)=>{
    //             const urlParam = new URLSearchParams (new URL(url).search);
    //             settrailerUrl(urlParam.get('v'))
    //         }).catch((err) => console.log(err))
    //     }
    // }

    return(
        <div className='row'>
            <h2>{title}</h2>

            <div className="row_posters">
                {
                    movies.map(movie => (
                        // console.log(movie.name)
                        // console.log(`${imgurl}${movie.poster_path}`)
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargerRow && "row_posterlarge"}`}
                        src = {`${imgurl}${isLargerRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}/>
                    ))
                }

            </div>
            {trailerUrl && <YouTube videoId = {trailerUrl} opts={opts}/>}

        </div>
    )
            }

export default Row;