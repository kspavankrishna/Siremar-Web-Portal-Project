// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by Nishank*/
import './Login.css'
import MainFooter from '../Footer/MainFooter';
import MainNavBar from '../../components/Navbar/MainNavBar';
import video2 from "../../images/margarita.mp4"
import video from "../../images/margarita.ogv"
import video3 from "../../images/margarita.webm";
import image from "../../images/margarita2.png"
import { useNavigate } from 'react-router';
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';


const clipper = "#t=12,160";
function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const login = (e) => {
        e.preventDefault();
        axios.get("http://127.0.0.1:8001/login/"+user.email+"/"+user.password).then(res => {
      
            if (res.data.length > 0) {
         
                // set the state of the user
                setUser(res.data[0])
                // store the user in localStorage
                localStorage.setItem('userId', JSON.stringify(res.data[0]))
                let role = 'resident';
                if (res.data[0]['role_id'] === 0) {
                    role = "admin";
                }
                else if (res.data[0]['role_id'] === 1) {
                    role = "inspector";
                }

                navigate("/dashboard?role=" + role);
            } else {
                alert('Invalid username/password');
            }
        })
    }

    return (
        <div class="login-container flex-column">
            <MainNavBar />
            <div class="background-video-container">
                <video autoPlay muted loop playsinline poster={image} class="login-video">
                    <source src={video + clipper} type="video/ogv" />
                    <source src={video2 + clipper} type="video/mp4" />
                    <source src={video3 + clipper} type="video/webm" />
                    Your browser does not support HTML5 video.
                </video>
            </div>
            <div class="login-card">
                <div class="login-form">
                    <h1 class="login-title">Login</h1>
                    <form class="form" action="" method="">
                        <label class="form-label-wrapper">
                            <p class="form-label">Email</p>
                            <input name="email" value={user["email"]} onChange={handleChange} type="email" placeholder="Enter your email" required />
                        </label>
                        <label class="form-label-wrapper">
                            <p class="form-label">Password</p>
                            <input name="password" value={user["password"]} onChange={handleChange} type="password" placeholder="Enter your password" required />
                        </label>
                        <button class="login-btn primary-default-button" onClick={login} >Sign in</button>
                    </form>
                </div>
            </div>
            <MainFooter />
        </div>

    );

}


export default Login;