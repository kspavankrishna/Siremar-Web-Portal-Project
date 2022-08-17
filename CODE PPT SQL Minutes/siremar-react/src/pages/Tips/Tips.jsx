// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by K S Pavan Krishna */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import "../County/CountyList.css"
import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router';
import "../CommunityFeed/CommunityFeed.css"

function Tips() {


    return (
        <div class="layer">
            <div class="flex-container">
                <Sidebar />
                <div class="main-wrapper">
                    <Navbar />
                    <main class="main users chart-page" id="skip-target">
                        <div class="page-container">
                            <div class="flex-column">
                                <h1 class="page-title">Tips</h1>
                                <section id="about" class="about-section background-video-container-parallax">
                                    <div class="news-feed">
                                        <ul>
                                            <li>1. Do not share your Credentials with anyone
                                            </li>
                                            <br></br>
                                            <li>2. Each Resident can have their own personal Resident Portal</li>
                                            <br></br>
                                            <li>3. For assistance with any issues, use the "Contact" section on the Home Page</li>
                                            <br></br>
                                            <li>See something listed here that you can't access? Contact the Admin for more information.</li>
                                            <br></br>
                                            <li>Have an idea that will make the experience better? Submit Feedback under "Feedback" Section on the Home Page.</li>
                                        </ul>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
export default Tips;