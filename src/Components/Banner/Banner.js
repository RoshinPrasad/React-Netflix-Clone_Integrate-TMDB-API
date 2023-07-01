import React, { useState, useEffect } from 'react';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import logo from './580b57fcd9996e24bc43c529.png';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {baseUrl , imgUrl , apiKey } from '../../Constants/constants';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));


function Banner() {
  const [bannerMovie, setbannerMovie] = useState('');
  const [loading, setLoading] = useState(true);
  const reqUrl = `${baseUrl}discover/movie?api_key=${apiKey}&with_companies=420`;

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 10) + 5;
    fetch(reqUrl)
      .then(res => res.json())
      .then(movie => {
        setbannerMovie(movie.results[randomNumber]);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (loading) {
    return (
      <div style={{ marginTop: '200px' }}>
        Loading
      </div>
    );
  } else {
    return (
      <div style={{ backgroundImage: `url(${imgUrl + bannerMovie.backdrop_path})` }} className='banner'>
        <AppBar position="fixed" style={{ backgroundColor: "transparent", boxShadow: "none" }}>
          <Toolbar>
            <img
              src={logo}
              alt="Netflix Logo"
              style={{ width: '150px', height: 'auto'}}
            />
            <Search sx={{ display: { xs: 'none', sm: "block", md: 'block', lg: 'block' } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <h1 className='movie-title'>
          {bannerMovie.original_title}
        </h1>
        <p className='movie-overview'>
          {bannerMovie.overview}
        </p>
        <div className="btn-container">
          <button className='btn btn-play' style={{boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.5)' }}>Now Playing</button>
          <button className='btn btn-view'>View More</button>
        </div>
      </div>
    );
  }
}

export default Banner;
