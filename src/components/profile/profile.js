import React,{useState,useEffect} from 'react';
import "./public/css/style.css";
import './public/css/animate.css';
import './public/css/icomoon.css';
import axios from 'axios';


const Profile=(props)=>{ 
  const [isDisplay,setIsDisplay]=useState(false)
  let us={};
  if(props.location.user){
     us=props.location.user[0];    
  }
    const[user,setUser]=useState({name:us.name,sueName:us.surName,email:us.email,image:us.image});
    useEffect(() => {
      axios.get(`http://localhost:8000/userProfile`, {})
    .then(res => {     
     let user=res.data.user[0];
     setUser({name:user.name,surName:user.surName,email:user.email,image:user.image})
     }).catch(err => {
     console.log(err, "< ERR")
})
    },[]);      
    
    
    return(
<div className="App">
  <div id="colorlib-page"> 
		  <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
		  <aside id="colorlib-aside" role="complementary" className="js-fullheight text-center">
			<h1 id="colorlib-logo"><a href="index.html">{user.name}<span>.</span></a></h1>
			<nav id="colorlib-main-menu" role="navigation">
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a href="photography.html">Photography</a></li>
					<li><a href="travel.html">Travel</a></li>
					<li><a href="fashion.html">Fashion</a></li>
					<li className="colorlib-active"><a href="about.html">About</a></li>
					<li><a href="contact.html">Contact</a></li>
				</ul>
			</nav>    
      
		<div className="colorlib-footer">				
                     {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0.  */}
                     Copyright &copy;<script>document.write(new Date().getFullYear());</script>
         All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by
        <a href="https://colorlib.com" target="_blank">Colorlib</a>
				<ul>
					<li><a href="#"><i className="icon-facebook"></i></a></li>
					<li><a href="#"><i className="icon-twitter"></i></a></li>
					<li><a href="#"><i className="icon-instagram"></i></a></li>
					<li><a href="#"><i className="icon-linkedin"></i></a></li>
				</ul>
		</div>
		</aside>
          {/* END COLORLIB-ASIDE */}

		<div id="colorlib-main">  
      <div className="hero-wrap hero-wrap-2 js-fullheight"
          style={{backgroundImage:"url(profileImages/bg_4.jpg)"}} data-stellar-background-ratio="0.5">
        <div className="overlay"></div>        
				<div className="js-fullheight d-flex justify-content-center align-items-center">
					<div className="col-md-8 text text-center">						
            <div className="img mb-4"
             style={{backgroundImage:`url(http://localhost:8000/static${user.image})`}}></div>            
             <div  style={{display:"inline-block" }}>
              <button className="btn btn-secondary" onClick={()=>setIsDisplay(!isDisplay)} >Change Profile Image</button> 
              {isDisplay?
              <form id="profImageForm"
                action="http://localhost:8000/upload_image" method="POST" encType="multipart/form-data" dataid="5">
                <input type="text" name="txt" value={user.email} style={{display:"none"}}></input>
                <input id="fileUpload" type="file" name="avatar" text={user.email}/>
                <button type='submit' >Upload</button>               
               </form>
               :""}              
                             
            </div>        
        {/* <div  style={{display:"inline-block "}}>
          <button class="btn btn-secondary" onClick="document.getElementById('search').style.display='block'">
              Find Peuple</button>
          <input  id="search" type="search" name="search" style={{display:"none"}} />
         </div> */}        
         {/* <br/>  */}
       <div id="request" style={{display:"inline-block "}}>
          <button className="btn btn-secondary" >
            <span>Requests</span>
            <i className=" fa fa-globe" style={{color:"blue", fontSize:"25px"}}></i>
          </button>
       </div>     
        <div style={{display:"inline-block "}}>
             {/* Button to Open the Modal  */}
          <button type="button" className="btn btn-secondary" datatoggle="modal" datatarget="#myModal">
               Edit
          </button>    
        </div>
        <div style={{display:"inline-block "}}>
              <button className="btn btn-secondary"  type="button">Friends</button>
               {/* The Modal  */}
        </div>
        <br/>
        <div id="searchResult" className="desc" style={{display:"inline-block "}}></div>
        <div id='request2' className="desc" style={{display:"inline-block "}}></div>
        <div id='friends' className="desc" style={{display:"inline-block "}}>
          <h2 className="subheading"></h2>
          <h1 className="mb-4"></h1>
          <p className="mb-4"></p>          
        </div>
				<div className="desc">
              <h2 className="subheading">Hello I'm {user.name}</h2>
							<h1 className="mb-4"></h1>
							<p className="mb-4">I am A Blogger Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
							<ul className="ftco-social mt-3">
                <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a></li>
                <li className="ftco-animate"><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
				</div>
			</div>
		 </div>
  	</div>
  </div> 
</div>        
         {/* END COLORLIB-MAIN  
	     END COLORLIB-PAGE 

    loader  */}
    

    <div id="ftco-loader" >
      <svg className="circular" width="48px" height="48px">
        <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/>
        <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/>
      </svg>
    </div>

    <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">

          {/* Modal Header  */}
          <div className="modal-header">
            <h4 className="modal-title">here you can edit yuor data</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>

           {/* Modal body  */}
          <div className="modal-body" id="myDiv">         
            <input id="name" type="text"  name="name" placeholder="name" />
            <input id="surName" type="text" name="surName" placeholder="surName"/>
            <input id="birthday" type="text" name="birthday" placeholder="birthday" />
            <input id="gender" type="text" name="gender" placeholder="gender" />
            <input id="phone" type="text" name="phone" placeholder="phone" />
            <div id="anotherDiv"></div>
          </div>

           {/* Modal footer  */}
           <div className="modal-footer">
              <button className='btn btn-success save' id='save'>save</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
           </div>

     </div>
   </div>
 </div>
</div>
    )
}

export default Profile;