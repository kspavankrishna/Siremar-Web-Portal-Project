// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)


/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import "../County/CountyList.css"
import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router';
import "../CommunityFeed/CommunityFeed.css"

function CommunityFeed() {


    return (
        <div class="layer">
            <div class="flex-container">
                <Sidebar />
                <div class="main-wrapper">
                    <Navbar />
                    <main class="main users chart-page" id="skip-target">
                        <div class="page-container">
                            <div class="flex-column">
                                <h1 class="page-title">Community Feed</h1>
                                <section id="about" class="about-section background-video-container-parallax">
                                    <div class="news-feed">
                                        <ul>
                                            <li>1 The Future currency of the world BITCOIN makes it’s way into the Tiny Island of Margarita
                                            </li>
                                            <br></br>
                                            <li>2. The Island Police yesterday arrested individuals who robbed a tourist on the beach</li>
                                            <br></br>
                                            <li>3. Retirement the Margaritaville Way</li>
                                            <br></br>
                                            <li>4. About 400 Russian tourists left Venezuela on charter flight-sources</li>
                                            <br></br>
                                            <li>5. Six Places to Celebrate National Margarita Day</li>
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
export default CommunityFeed;