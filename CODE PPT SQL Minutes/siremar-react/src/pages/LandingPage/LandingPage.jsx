// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by K S Pavan Krishna */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import './LandingPage.css';
import { useNavigate } from 'react-router';
import video from "../../images/margarita.ogv"
import video2 from "../../images/margarita.mp4"
import video3 from "../../images/margarita.webm"
import image from "../../images/margarita2.png"
import MainNavBar from '../../components/Navbar/MainNavBar';
import HomePage from '../Home/HomePage';
import MainFooter from '../Footer/MainFooter';
import Footer from '../Footer/Footer';
import emailjs from 'emailjs-com';
import "../../components/Navbar/MainNavBar.css"

function LandingPage() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);
 

    const [formData, updateFormData] = useState({});
    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value
        });
    };

    const handelSubmit = (e) => {
        emailjs.send(
            'gmail', "template_0i83dy8",
            { from_name: formData.name, to_name: "Siremar Admin", reply_to: formData.email, to_email: "manasa229@gmail.com", message: formData.message },
            "F6SSSCyg2eiw9FOqi"
        ).then(res => {
            navigate("/")
        })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }


    const clipper = "#t=12,160";
    return (
    
        <div class="landing-page-container flex-container flex-column">

            {/* navigation bar */}
            <MainNavBar />
            
            <div>
                <h1>Cool its {darkMode ? "Dark" : "Light"} Mode </h1>
            </div>
            <div class="background-video-container">
                <video autoPlay muted loop playsinline class="background-video" poster={image}>
                    <source src={video + clipper} type="video/ogv" />
                    <source src={video2 + clipper} type="video/mp4" />
                    <source src={video3 + clipper} type="video/webm" />
                    Your browser does not support HTML5 video.
                </video>
          
              
            </div>

            {/* home section */}
            <section id="home" class="home-section">
                <HomePage />
            </section>

            {/* about section */}
            <section id="about" class="about-section background-video-container-parallax">
                <div class="about-container  ">
                    <span>About 25 miles from the mainland and accessible by plane or ferry, Venezuela's mountainous Margarita Island offers Caribbean-style beaches and a laid-back South American vibe for windsurfing, golf, horseback riding and scuba diving.</span>
                    <br></br>
                    <span>
                        The Island has Places to see, ways to wander, and signature experiences which you have never experienced; A mix of the charming, modern, and world class and also, Can't-miss spots to dine, drink, and feast.
                    </span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span class="about-siremar">
                        Siremar is a Leading Edge Web Portal which Aims to keep a Dynamic count of all residents and provide all the necessary information to the residents of the beautiful island of Margarita located in South America.
                    </span>
                </div>
            </section>

            {/* service section */}
            <section id="services" class="service-section">
                <div class="service-container">
                    <div class="service-container-row1">
                        <div class="service-content">
                            <h4 class="service-heading">Schools</h4>
                            <div class="service-explanation">Users can register for the schools and get top priority for selection based on if they are Residents of the Margarita Island. Other services related to Schools also available.</div>
                        </div>
                        <div class="service-content">
                            <h4 class=" service-heading  ">Identification Card</h4>
                            <div class=" service-explanation  ">Users are entitled to get an Identification card if they are valid Residents of the Island of Margarita. This ID can then be used to avail other services offered to the residents.</div>

                        </div>
                        <div class="service-content">
                            <div class="">

                                <h4 class=" service-heading  ">Flights</h4>
                                <div class="  service-explanation ">Users have access to all available flights to their destinations of choice and also view and avail any discounts offered specially to the residents of Margarita Island.</div>

                            </div>
                        </div>
                    </div>
                    <div class="service-container-row2">
                        <div class=" service-content">
                            <h4 class="service-heading">Ferry</h4>
                            <div class="service-explanation">Users have access to all available Ferry’s to their destinations of choice and also view and avail any discounts offered specially to the residents of Margarita Island.</div>
                        </div>
                        <div class="service-content">
                            <h4 class="service-heading">Business</h4>
                            <div class="service-explanation">Users can view business which are available to purchase or work with and can also avail benefits while taking up the businesses as Residents of the Margarita Island.</div>
                        </div>
                        <div class="service-content">
                            <h4 class="service-heading">Events</h4>
                            <div class="service-explanation">Users can get a great perspective of the Margarita Island by viewing all the event’s and Residents enjoy special discounts and offers.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* getting started section */}
            <section id="gettingStarted" class="getting-started-section">
                <div class="getting-started-content">
                    <div>
                        <h1>Getting Started</h1>
                        <h4 class="getting-started">You are Steps away from making your Life Easier at the Island</h4>
                    </div>
                    <div class="card">
                        <h3 >Register?</h3>
                        <div class="card-text">
                            <span>If you are living in margarita for a minimum of 1 year, you can register to get an ID and to avail all benefits and discounts</span>
                        </div>
                        <button class="button" onClick={() => navigate("/register")}>Click to register</button>


                    </div>
                    <div class="white-card">
                        <h3 >Login?</h3>
                        <div class="card-text">
                            <span>Already an registered user?</span>
                        </div>
                        <button class="button" onClick={() => navigate("/login")}>Click to login</button>

                    </div>
                </div>
            </section>

            {/* contact us section */}
            <section id="contact-us" class="contact-us-section">
                <div class="contact-us-wrapper">
                    <div class="row justify-content-center">
                        <div class="col-md-6 text-center">
                            <h2 class="heading-section">Get in touch with us</h2>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-10 col-md-12">
                            <div class="contact-us-content">
                                <div class="row justify-content-center">
                                    <div class="col-lg-8 mb-2">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="dbox w-100 text-center">
                                                    <div class=" d-flex align-items-center justify-content-center">

                                                    </div>
                                                    <div class="text">
                                                        <p class="contact-text"><span>Address:</span> <span class="address-text">198 West 21th Street, Suite 721 Margarita NY 10016</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="dbox w-100 text-center">
                                                    <div class="d-flex align-items-center justify-content-center">

                                                    </div>
                                                    <div class="text">
                                                        <p class="contact-text"><span>Phone:</span> <a href="tel://1234567920">+ 1234567897</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="dbox w-100 text-center">
                                                    <div class=" d-flex align-items-center justify-content-center">

                                                    </div>
                                                    <div class="text">
                                                        <p class="contact-text"><span>Email:</span> <a href="mailto:siremar@gmail.com">siremar@gmail.com</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="contact-wrap">
                                            <form method="POST" id="contactForm" name="contactForm" class="contactForm">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <input value={formData.name} onChange={handleChange} type="text" class="form-control" name="name" id="name" placeholder="Name" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <input value={formData.email} onChange={handleChange} type="email" class="form-control" name="email" id="email" placeholder="Email" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <textarea value={formData.message} onChange={handleChange} name="message" class="form-control" id="message" cols="30" rows="8" placeholder="Message"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 ">
                                                        <div class="form-group ">
                                                            <button type="submit" value="Send Message" class="btn primary-default-button" onClick={handelSubmit}>Submit</button>
                                                            <div class="submitting"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* footer*/}
            <Footer />
        </div>
      
    )
}

export default LandingPage;