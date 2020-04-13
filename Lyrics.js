import React, { useState, useEffect } from "react";
import axios from "axios";
import { faCode, faThumbsUp, faBars,faBell, faShower, faComment, faAngleDoubleDown, faAngleDown, faAngleLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header'
import { runInThisContext } from "vm";
import  { setGlobal } from 'reactn';
import  { getGlobal } from 'reactn';
import { withRouter } from "react-router-dom";
import  { Redirect } from 'react-router-dom';
import {Properties} from './Properties'



var styles ={
  color: 'black',
  position: "relative",
  marginRight:"auto",
  width: "32px",
  height: "50px",
  marginRight: "auto"
};

var contbig={
  backgroundColor:"#008fb3",
  height:"100%",
  overflow:"scroll"
}

class Lyrics extends React.Component
{
constructor()
{
  super()
  this.state={
  trackid: '',
  Lyricsid:'',
  track_nm:'',
  mysong:'',
  }
  this.change=this.change.bind(this)
 
}


change()
{
  this.setState({ch:"hi"})
}




componentDidMount()
{  


  
  var id=getGlobal().mysongid;
  console.log("id", id);
  console.log("myglobal list", getGlobal().myGlobalSongs);
  var myAlbum=getGlobal().myGlobalSongs;
  var albumName=myAlbum.albumName;
  var mySongs=myAlbum['songs'];
  console.log( "mytext",mySongs[id].text);
  var mytext=mySongs[id].text;
  var res = mytext.replace(/ /g, "%20");
  var myAlbumName=albumName.replace(/ /g, "%20");
  console.log("myyyyy",this.state.mysong);

      
   

  axios.get(
  `https://api.musixmatch.com/ws/1.1/matcher.track.get?q_artist=eminem&q_track=${res}&q_artist=${myAlbumName}&f_has_subtitle=1&apikey=43a71a387b2bb9b4ef2ee19fa6eed444`
  )
  .then(
  res=>{
    console.log(res);
    this.setState({track_nm:res.data.message.body.track.track_name})
    // this.setState({persons:res.data.message.body.lyrics });
    this.setState({trackid:res.data.message.body.track.track_id});
    return axios
    .get(
  `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.state.trackid}&apikey=43a71a387b2bb9b4ef2ee19fa6eed444`
  )
  .then(
  res=>{
    console.log("id",this.state.trackid)
    console.log(res);
    // this.setState({persons:res.data.message.body.lyrics });
    this.setState({Lyricsid:res.data.message.body.lyrics.lyrics_body});
  });
  }
);
}
render()
{ 

  if(this.state.ch=="hi")
  {
    return(
<Redirect to={ Properties.AUTHENTICATED_URL + "/home"}/>
    )
  }
    else{
   return(
           <div>
              <div className="container-fluid"   style={contbig} className="footer fixed-bottom" > 
                    <div className="row" style={{marginTop: "15px"}} >
                        <div className="col-2">
                        <FontAwesomeIcon icon={ faAngleLeft } style={styles} onClick={this.change}/>
                        
                       
                        </div>
                        <div className="col-8"> 
                          <h4 style={{textAlign:"center",fontSize:"xx-large" , textShadow: "2px 2px 5px white"}}className="card-title">{this.state.track_nm}</h4>
                          <hr style={{color:"white"}}></hr>
                        </div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row"style={{overflow:"scroll"}}>
                        <div className="col-12">
                          <p style={{fontSize:"21px",color:"black",fontStyle:"normal"}}className="card-text">{this.state.Lyricsid}</p>
                        </div>
                    </div>
               </div>
            </div>             
 

    
  )
}
}
}
export default Lyrics

