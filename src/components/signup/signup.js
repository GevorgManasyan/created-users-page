import React,{useState,useEffect,useReducer, useContext} from 'react';
import UserInputContext from '../userInputContext';
import '../public/css/main.css';
import '../public/css/util.css';
import axios from 'axios';
import { message, Button } from 'antd';
import useForm from "../useForm";
import validate from '../LoginFormValidationRules';


 
const Signup=(props)=>{  
       
    const {values,errors,handleChange,handleSubmit} = useForm(login, validate);    
      function login() {
        console.log('No errors, submit callback called!');        
      }   
    
    const InputStateReducer=useContext(UserInputContext);      
    const[emailError,setEmailError]=useState({emailErrorText:"",emailErrorEnable:false});    
    const [state,dispatch]=useReducer(InputStateReducer.reducer,InputStateReducer.initialstate);

    const OnChange=(e)=>{        
        dispatch({field:e.target.name,value:e.target.value});
        handleChange(e)             
    }    
    
 const SendData=()=>{  
    handleSubmit()     
     let  errorObjectLength=Object.keys(validate(values)).length;                  
        if(state.password==state.confirm && errorObjectLength==0){
             axios.post(`http://localhost:8000/userSignupInputs`, {user:state})
            .then(res => { 
              console.log("res.data",res.data)
                     if(res.data.error==""){
                      props.history.push({pathname:'/'})       
                     }                         
            })           
        }      
                                         
   }
    
return( 
<div className="limiter">
  <div className="container-login100">
    <div className="wrap-login100">
      <div className="login100-pic js-tilt" data-tilt>
           <img src="images/img-01.png" alt="IMG"/>               
      </div>                
      <div class="login100-form validate-form" >
           <span class="login100-form-title"> Sign Up </span>
         <div class="wrap-input100 validate-input" >              
            <input autoComplete="off" className="input100" type="text" placeholder="name"
              name="name"  onChange={OnChange}  value={values.name || ''} required />
               {errors.name && (<p className="help is-danger">{errors.name}</p>)}
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
         </div>
         <div class="wrap-input100 validate-input" >    
            <input autoComplete="off" className="input100" type="text" placeholder="surName"
              name="surName"  onChange={OnChange}  value={values.surName || ''} required />
               {errors.surName && (<p className="help is-danger">{errors.surName}</p>)}
             <span class="focus-input100"></span>
             <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
             </span>
          </div>
         <div class="wrap-input100 validate-input">     
            <input autoComplete="off" className="input100" type="text" placeholder="birthday"
             name="birthday"  onChange={OnChange}  value={values.birthday || ''} required />
              {errors.birthday && (<p className="help is-danger">{errors.birthday}</p>)}
               <span class="focus-input100"></span>
               <span class="symbol-input100">
                   <i class="fa fa-envelope" aria-hidden="true"></i>
               </span>
         </div>
          <div class="wrap-input100 validate-input">     
             <input autoComplete="off" className="input100" type="text" placeholder="gender"
                name="gender"  onChange={OnChange}  value={values.gender || ''} required />
                 {errors.gender && (<p className="help is-danger">{errors.gender}</p>)}    
                   <span class="focus-input100"></span>
                   <span class="symbol-input100">
                       <i class="fa fa-envelope" aria-hidden="true"></i>
                   </span>
           </div>
           <div class="wrap-input100 validate-input">    
              <input autoComplete="off" className="input100" type="text" placeholder="phone"
                 name="phone"  onChange={OnChange}  value={values.phone || ''} required />
                   {errors.phone && (<p className="help is-danger">{errors.phone}</p>)}
                  <span class="focus-input100"></span>
                  <span class="symbol-input100">
                     <i class="fa fa-envelope" aria-hidden="true"></i>
                  </span>
           </div>
            <div class="wrap-input100 validate-input">    
               <input autoComplete="off" className={`input100 ${errors.email && 'is-danger'}`} type="email"
                  placeholder="email" name="email"  onChange={OnChange}  value={values.email || ''} required />
                    {errors.email && (<p className="help is-danger">{errors.email}</p>)}
                    {emailError.emailErrorEnable?<h6>{emailError.emailErrorText}</h6>:""}             
                  <span class="focus-input100"></span>
                  <span class="symbol-input100">
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                 </span>
            </div>
            <div class="wrap-input100 validate-input" >
               <input className={`input100 ${errors.password && 'is-danger'}`} type="password" placeholder="password"
                name="password"  onChange={OnChange}  value={values.password || ''} required />
                     {errors.password && (<p className="help is-danger">{errors.password}</p>)}
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                          <i class="fa fa-lock" aria-hidden="true"></i>
                      </span>
            </div>
            <div class="wrap-input100 validate-input">        
                <input autoComplete="off" className="input100" type="password" placeholder="confirm password"
                    name="confirm"  onChange={OnChange}  value={values.confirm || ''} required />
                      {errors.confirm && (<p className="help is-danger">{errors.confirm}</p>)}
                        <span class="focus-input100"></span>
                         <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
            </div>
            <div class="container-login100-form-btn">
                 <button class="login100-form-btn" type="button" onClick={SendData}> Login </button>
            </div>
        </div>                 
     </div>
   </div>    
 </div>
        
    )
}

export default Signup;