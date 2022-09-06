import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './Api/User/api'
import { getAllUsers } from './Api/Users/api'
import { getPlaylist } from './Api/Playlist/api';
import { getAllPlaylists } from './Api/Playlists/api';
import { getAllSongs }  from './Api/Songs/api'

import './Global.css';
import { Admin, Home, Library, Liked, Login, Main, Playlist, Profile, Signup, Search, UsersAdmin, SongsAdmin, NotFound } from './Pages';
import  { AudioPlayer ,Navbar ,Sidebar, UserForm, SongForm }  from './Components/';


function App() {
 
  const dispatch = useDispatch();
  const location = useLocation();
  const { user }  = useSelector((state) => state.auth);
  const { currentSong } = useSelector((state) => state.audioPlayer);

 

  const navigate = useNavigate();
  

  
  

  useEffect(() => {

    let token = null ;
    const root = JSON.parse(window.localStorage.getItem("persist:root"));

    if(root) {
      const { auth } = root;
      const { user } = JSON.parse(auth);

      if(user) token = user.token;
    
    }

    if ( user && token ) {
      getUser(user._id, dispatch);
      getPlaylist(dispatch);
      getAllSongs(dispatch);
     
    }

    if ( user?.isAdmin && token) {
      getAllUsers(dispatch);
      getAllPlaylists(dispatch);
    }
  },[dispatch, user]);
  

  return (
    <Fragment>
      {user &&
        location.pathname !== '/login' && 
        location.pathname !== '/' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/landing' &&
        location.pathname !== '/not-found' && (
          <Fragment>
            <Navbar />
            <Sidebar />
            
            {/* currentSong && <AudioPlayer/> */}
            
          </Fragment>
        )
        }

              
      <Routes>
        
        <Route element={<Main/>} path="/" />
        <Route element={<Signup/>} path="/signup"/>
        <Route element={<Login/>} path="/login"/>
        <Route element={<NotFound/>} path="*" />
        { user && (
          <Fragment>
            <Route element ={<Home/>} path="/home" exact/>
            <Route element={<Search/>} path="/search" exact/>
            <Route element={<Liked/>} path="/collection/tracks" exact/>
            <Route element={<Library/>} path="/collection/playlists" exact/>
            <Route element={<Playlist/>} path="/playlist/:id" exact/> 
            <Route element={<Profile/>} path="/me" exact/>
            
            {user?.isAdmin && (
              <Fragment>
                <Route element={<Admin/>} path="/admin" exact/>
       
                <Route element={<UsersAdmin/>} path="/admin/users" exact />
                <Route element={<UserForm/>}  path="/users/:id" />
                <Route element={<SongsAdmin/>} path="/admin/songs"/>
                <Route element={<SongForm/>} path="/songs/:id"/>
                
                
              </Fragment>
            )}
            
          </Fragment>
          )
        }
          
             
          
        
        

        

      </Routes>
			
	
	

      </Fragment>
      
      
  );
}

export default App;
