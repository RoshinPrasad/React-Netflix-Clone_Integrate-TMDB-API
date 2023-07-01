import React from 'react';
import './App.css';

import Banner from './Components/Banner/Banner';
 
import MovieRow from './Components/MovieRow/MovieRow';
import { categories } from './Constants/constants';



function App() {
  return (
    <React.Fragment>
      <Banner></Banner>
      <div className='category-container'>
        {
          categories.map((item) => {
            
            return(
              <MovieRow key={item.id} {...item}></MovieRow>
            )
          })
        }
      </div>
      
    </React.Fragment>
     
  );
}



export default App;
