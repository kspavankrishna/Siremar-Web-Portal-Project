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


function Classifieds() {
    return (
        <div class="layer">
            <div class="flex-container">
                <Sidebar />
                <div class="main-wrapper">
                    <Navbar />
                    <main class="main users chart-page" id="skip-target">
                        <div class="page-container">
                            <div class="flex-column">
                                <h1 class="page-title">Classifieds</h1>
                                <section id="about" class="about-section background-video-container-parallax">
                                    <div class="news-feed">
                                        <ul>
                                            <li>    1. Rottweiler puppies for sale in Margarita
                                            </li>
                                            <br></br>
                                            <li> 2. Customer Service Representative needed- Creative Freight and Brokerage</li>
                                            <br></br>
                                            <li> 3. Looking for a Gas island attendant - Olson bros point</li>
                                            <br></br>
                                            <li>4. Earn $100-$500 bi-weekly by teaching trading?</li>
                                            <br></br>
                                            <li>  6. Margi Blvd 2932 No. 12B for Sale/Lease/Rent. Call 888(888)-8888</li>
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
export default Classifieds;