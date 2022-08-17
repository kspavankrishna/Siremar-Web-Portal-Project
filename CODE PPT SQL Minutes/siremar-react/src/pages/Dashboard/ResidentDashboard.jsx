// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import "./Dashboard.css"
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from "../Sidebar/Sidebar.js";
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router';
import Graph from '../../components/Table/Graph';

function ResidentDashboard() {

    const navigate = useNavigate();
    return (
        <div class="layer">
            <div class="flex-container">
                <Sidebar />
                <div class="main-wrapper">
                    <Navbar />
                    <main class="main users chart-page" id="skip-target">
                        <div class="container">
                            <h2 class="main-title">Dashboard</h2>
                            <div class="flex-row dashboard-cards">
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon primary">
                                            <i data-feather="bar-chart-2" aria-hidden="true"></i>
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">How to Use</p>
                                            <p class="dashboard-cards-info__details">Total residents registered</p>
                                            <p class="dashboard-cards-info__button">
                                                <button class="button" onClick={() => navigate("/how/to/guide")}>Click to know more</button>

                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon warning">
                                            <i data-feather="file" aria-hidden="true"></i>
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Business</p>
                                            <p class="dashboard-cards-info__details">Total residents registered</p>
                                            <p class="dashboard-cards-info__button">
                                                <span class="dashboard-cards-info__profit success">
                                                    <i data-feather="trending-up" aria-hidden="true"></i>0.24%
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon purple">
                                            <i data-feather="file" aria-hidden="true"></i>
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Flights</p>
                                            <p class="dashboard-cards-info__details">Total residents availed</p>
                                            <p class="dashboard-cards-info__button">
                                                <span class="dashboard-cards-info__profit danger">
                                                    <i data-feather="trending-down" aria-hidden="true"></i>1.64%
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon success">
                                            <i data-feather="feather" aria-hidden="true"></i>
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Ferry</p>
                                            <p class="dashboard-cards-info__details">Total residents availed</p>
                                            <p class="dashboard-cards-info__button">
                                                <span class="dashboard-cards-info__profit warning">
                                                    <i data-feather="trending-up" aria-hidden="true"></i>0.00%
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div class="flex-row">
                                <div class="dashboard-graph">
                                    <Graph />
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon success">
                                            <i data-feather="feather" aria-hidden="true"></i>
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Events</p>
                                            <p class="dashboard-cards-info__details">Total residents availed</p>
                                            <p class="dashboard-cards-info__button">
                                                <span class="dashboard-cards-info__profit warning">
                                                    <i data-feather="trending-up" aria-hidden="true"></i>0.00%
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="dashboard-cards-item">
                                        <div class="dashboard-cards-icon success">
                                            <i data-feather="feather" aria-hidden="true"></i>
                                        </div>
                                        <div class="dashboard-cards-info">
                                            <p class="dashboard-cards-info__menu">Clinics</p>
                                            <p class="dashboard-cards-info__details">Total residents availed</p>
                                            <p class="dashboard-cards-info__button">
                                                <span class="dashboard-cards-info__profit warning">
                                                    <i data-feather="trending-up" aria-hidden="true"></i>0.00%
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ResidentDashboard;  