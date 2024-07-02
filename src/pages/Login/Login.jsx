import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

import loginImg from '../../assets/others/authentication1.png'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {
    const[disabled, setDisabled] = useState(true);
    const{signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)

    useEffect( () =>{
        loadCaptchaEnginge(6); 
    }, [])

    const handleLogIn = event =>{
        event.preventDefault();
       const form = event.target;
       const email = form.email.value;
       const password = form.password.value;
       console.log(email, password);
       signIn(email, password)
       .then(result =>{
        const user = result.user;
        console.log(user);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Login Successfull",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(from, {replace:true});
       })
    }

    const handleValidateCaptcha = (e) =>{
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value);
        if(validateCaptcha(user_captcha_value)){
            setDisabled(false)
        }
        
        
    }

    return (
    <>
        <Helmet>
                <title>Bistro Boss | Login </title>
        </Helmet>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="md:w-1/2 text-center lg:text-left">
                    <img src={loginImg} alt="" />
                </div>
                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleLogIn} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <LoadCanvasTemplate />
                    </label>
                    <input onBlur={handleValidateCaptcha} type="text"  name='captcha' placeholder="type the captcha above" className="input input-bordered" required />
                    
                    </div>
                    <div className="form-control mt-6">
                        {/* TODO: apply disable for re capcha */}
                        <input disabled={false} className="btn btn-primary btn-md text-xl font-semibold mt-2" type="submit" value="login"/>
                    </div>
                </form>
                <div className='divider'></div>
                 <SocialLogin></SocialLogin>
                <p className='text-center p-6 text-green-600 text-xl font-bold '><small>New Here? <Link className='hover:underline' to="/signup">Create an account</Link> </small></p>
                </div>
                
            </div>
           
        </div>
    </>    
    );
};

export default Login;