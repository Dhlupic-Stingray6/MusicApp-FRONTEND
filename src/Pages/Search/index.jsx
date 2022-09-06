import { Fragment, useState } from 'react';
import axiosInstance from '../../Api/axios';
import Song from '../../Components/Song';
import Playlist from '../../Components/Playlist';
import { IconButton, CircularProgress } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "./styles.module.scss";


const Search = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState({});
    const [isFetching, setIsFetching] = useState(false);
  
    const handleSearch = async ({ currentTarget: input }) => {
      setSearch(input.value);
      
      
    setResults({}); 

      try {
        setIsFetching(true);
        const url = `/?search=${input.value}`;
        const { data } = await axiosInstance.get(url);
        setResults(data);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    };


    

   
    
    
    return (
      <div className={styles.container}>
        <div className={styles.search_input_container}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input
            type="text"
            placeholder="Search for songs and playlists"
            onChange={handleSearch}
            value={search}
          />
          <IconButton onClick={() => setSearch("")}>
            <ClearIcon />
             
          </IconButton>
        </div>
        {isFetching && (
          <div className={styles.progress_container}>
            <CircularProgress style={{ color: "#1ed760" }} size="5rem" />
          </div>
        )}
        {
        Object.values(results).length !== 0 && (
          <div className={styles.results_container}>
            {
            
            results.data.songs.length !== 0 && (
              <div className={styles.songs_container}>
                {results.data.songs.map((song) => (
                  <Fragment key={song._id}>
                    <Song song={song} />
                  </Fragment>
                ))}
              </div>
                )}
            {results.data.playlists.length !== 0 && (
              <div className={styles.playlists_container}>
                <Playlist playlists={results.data.playlists} />
              </div>
            )}
          </div>
            ) 
            }
      </div>
    );
  };
  
  export default Search;
  