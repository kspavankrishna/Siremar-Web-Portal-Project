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


function FAQ() {


    return (
        <div class="layer">
            <div class="flex-container">
                <Sidebar />
                <div class="main-wrapper">
                    <Navbar />
                    <main class="main users chart-page" id="skip-target">
                        <div class="page-container">
                            <div class="flex-column">
                                <h1 class="page-title">FAQ's</h1>
                                <section id="about" class="about-section background-video-container-parallax">
                                    <div class="news-feed">
                                        <ul>
                                            <li>1. What do I do if I forgot my password?
                                            </li>
                                            <li>You can select Contact on the Home screen, which will immediately allow you to send a custom message to the Admin in order to get a new password. If you're still experiencing issues, you can also reach out to the Admin, to ensure they have the correct email address on file.</li>
                                            <br></br>
                                            <li>2. How do I update my Address?</li>
                                            <li>You can select Contact on the Home screen, which will immediately allow you to send a custom message to the Admin in order to update your address. If you're still experiencing issues, you can also reach out to the Admin, to ensure they have the correct address on file.</li>
                                            <br></br>
                                            <li>3. I have submitted feedback about many issues, why haven't I received a response?</li>
                                            <li>
                                                Unfortunately, the Siremar team is small and to provide assistance to everyone in its community it takes time. You don’t need to contact us again as we will respond. Just give us a little more time.</li>
                                            <br></br>
                                            <li>4. I have found a bug in the Website.</li>
                                            <li>
                                                Please report the bug to us using the send feedback or the Contact us options in the Main HomePage. It helps us to make Siremar a more stable and robust tool for everyone who uses it.
                                            </li>

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
export default FAQ;