import React,{useState,useContext,useReducer} from 'react';
import axios from 'axios';
import useForm from "../useForm";
import UserInputContext from '../userInputContext';
import validate from '../LoginFormValidationRules';

const Login=(props)=>{
      const {values,errors,handleChange,handleSubmit} = useForm(login, validate);    
      function login() {
        console.log('No errors, submit callback called!');
      }
      const [emailError,setEmailError]=useState("");
      const[passwordError,setPasswordError]=useState("");
      const InputStateReducer=useContext(UserInputContext);
      const [state,dispatch]=useReducer(InputStateReducer.reducer,InputStateReducer.initialstate);
      const OnChange=(e)=>{
        dispatch({field:e.target.name,value:e.target.value});
         handleChange(e)       
    }
    const SendData=(event)=> {
          handleSubmit()        
          axios.get(`http://localhost:8000/login`, {params:{user:state}})
            .then(res => {
                console.log(res)   
                console.log(res.data)
                console.log(res.data.error)                                
                        setEmailError(res.data.error);
                        setPasswordError(res.data)
                        if(res.data!=false&&res.data.error==undefined){
                            props.history.push({pathname:'/profile',user:res.data})
                        }
              }).catch(err => {
                console.log(err, "< ERR")
              })             
            }
    return(
        <div class="limiter">            
           <div class="container-login100">
             <div class="wrap-login100">
                <div class="login100-pic js-tilt" data-tilt>
                    <img src="images/img-01.png" alt="IMG"/>                
                </div>                
                   <div class="login100-form validate-form" >
                     <span class="login100-form-title"> Member Login</span>                   
                   <div class="wrap-input100 validate-input" >    
                      <input autoComplete="off" className={`input100 ${errors.email && 'is-danger'}`} type="email"
                       name="email"   onChange={OnChange}  value={values.email || ''} required />
                       {errors.email && (<p className="help is-danger">{errors.email}</p>)}
                       {emailError?<p>{emailError}</p>:""}
                       <span class="focus-input100"></span>
                       <span class="symbol-input100">
                       <i class="fa fa-envelope" aria-hidden="true"></i>
                       </span>
                    </div>

                    <div class="wrap-input100 validate-input" >
                       <input className={`input100 ${errors.password && 'is-danger'}`} type="password" name="password"
                        onChange={OnChange}  value={ values.password || ''} required />
                       {errors.password && (<p className="help is-danger">{errors.password}</p>)}
                       {passwordError?"":<p>password is incorrect</p>}
                       <span class="focus-input100"></span>
                       <span class="symbol-input100">
                       <i class="fa fa-lock" aria-hidden="true"></i>
                       </span>
                    </div>
                    <div class="container-login100-form-btn">
                        <button type="submit" class="login100-form-btn" onClick={SendData}>
                            Login
                        </button>
                    </div>

                    <div class="text-center p-t-12">
                        <span class="txt1">Forgot</span>
                        <a class="txt2" href="#">
                            Username / Password?
                        </a>
                    </div>
                    <div class="text-center p-t-136">                    
                        <a class="txt2" href="/signup">
                            Create your Account
                            <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                        </a>                        
                    </div>
                    </div>
               
            </div>
        </div>
        
    </div>
    
    

    )
}

export default Login;