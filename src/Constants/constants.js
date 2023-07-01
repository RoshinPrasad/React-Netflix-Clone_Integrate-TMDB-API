const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = 'fff56231b4542a9c19192df90dc99f71';
const imgUrl = 'https://image.tmdb.org/t/p/original';

const categories = [
  {id: 1 , category: 'now_playing' , title: 'NOW PLAYING'} ,
  {id: 2 , category: 'top_rated' , title: 'TOP RATED'} ,
  {id: 3 , category: 'upcoming' , title: 'UPCOMING'} ,
  {id: 4 , category: 'popular' , title: 'POPULAR'} 
]

export {apiKey , imgUrl , baseUrl ,categories};