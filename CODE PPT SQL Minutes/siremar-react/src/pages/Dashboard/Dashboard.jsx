// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./Dashboard.css"
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from "../Sidebar/Sidebar.js";
import Footer from '../Footer/Footer';
import Graph from '../../components/Table/Graph';


function Dashboard() {
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let loggedUser = JSON.parse(localStorage.getItem('userId'));
    let role = urlParams.getAll('role')[0];
    let cardTitle = "Total residents registered";
    let cardTitle2 = "Total residents availed offers";
    let title = "Welcome "
    let graphStyle = { display: "" };
    let dashBoardCardStyle = { "margin-left": "-10px" };
    let graphTitle = "Moving outs"
    if (role == 'resident') {
        cardTitle = "School registered history";
        cardTitle2 = "Availed benefits history"
        title = "Welcome "
        graphStyle = { display: "none" };
        dashBoardCardStyle = { "margin-left": "10px" };
       
    }else if(role=="inspector"){
        graphTitle = "Moving outs from county 1"
        graphStyle = { display: "none" };
    }

    return (
        <div class="layer">
            <div class="flex-container">

                <Sidebar />
                <div class="main-wrapper">
                    <Navbar />
                    <main class="main dashboard h-100" id="skip-target">
                        <div className="dashboard-container">
                            <h2 class="main-title">{title+loggedUser["Name"]+"!"}</h2>
                            <div class="flex-row dashboard-cards" style={dashBoardCardStyle}>
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon primary">
                                            {/* <span>70</span> */}
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Schools</p>
                                            <p class="dashboard-cards-info__details">{cardTitle}</p>
                                            <p class="dashboard-cards-info__button">
                                                <a class="dashboard-click-btn" onClick={() => navigate("/schools/report?role="+role)}>Click to know more insights</a>
                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon orange">
                                            {/* <span>40</span> */}
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Business</p>
                                            <p class="dashboard-cards-info__details">{cardTitle}</p>
                                            <p class="dashboard-cards-info__button">
                                                <a class="dashboard-click-btn" onClick={() => navigate("/business/report?role="+role)}>Click to know more insights</a>
                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon purple">
                                            {/* <span>40</span> */}
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Flights</p>
                                            <p class="dashboard-cards-info__details">{cardTitle2}</p>
                                            <p class="dashboard-cards-info__button">
                                                <a class="dashboard-click-btn" onClick={() => navigate("/flights/report?role="+role)}>Click to know more insights</a>
                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon green">
                                            {/* <span>100</span> */}
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Ferry</p>
                                            <p class="dashboard-cards-info__details">{cardTitle2}</p>
                                            <p class="dashboard-cards-info__button">
                                                <a class="dashboard-click-btn" onClick={() => navigate("/ferry/report?role="+role)}>Click to know more insights</a>
                                            </p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div class="flex-row">
                                <div class="dashboard-graph" style={graphStyle}>
                                <h1 class="header">{graphTitle}</h1>
                                    <Graph title={graphTitle} />
                                </div>

                                <div class="col-md-6 col-xl-3 dashboard-second-row">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon red">
                                            {/* <span>20</span> */}
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Events</p>
                                            <p class="dashboard-cards-info__details">{cardTitle2}</p>
                                            <p class="dashboard-cards-info__button">
                                                <a class="dashboard-click-btn" onClick={() => navigate("/events/report?role="+role)}>Click to know more insights</a>
                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon yellow">
                                            {/* <span>90</span> */}
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Clinics</p>
                                            <p class="dashboard-cards-info__details">{cardTitle2}</p>
                                            <p class="dashboard-cards-info__button">
                                                <a class="dashboard-click-btn" onClick={() => navigate("/clinics/report?role="+role)}>Click to know more insights</a>
                                            </p>
                                        </div>
                                    </article>
                                </div>

                            </div>
                            {/* <Footer /> */}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;  