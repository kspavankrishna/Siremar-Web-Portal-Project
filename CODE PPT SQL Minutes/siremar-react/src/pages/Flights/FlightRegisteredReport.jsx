// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "../County/CountyList.css"
import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../Footer/Footer';
import CustomTable from '../../components/Table/Table';
import EmptyPage from '../../components/EmptyPage';

function FlightRegisteredReport() {
    const navigate = useNavigate();
    const sampleResidents = [{
        "Name": "Resident 1",
        "Gender": "Female",
        "Age": 24,
        "Phone Number": "8173936701",
        "Address": "1001 UTA blvd, campus edge"
    }, {
        "Name": "Resident 2",
        "Gender": "Female",
        "Age": 24,
        "Phone Number": "5674348876",
        "Address": "Arlington,Texas,76012"
    },
    {
        "Name": "Resident 3",
        "Gender": "Female",
        "Age": 24,
        "Phone Number": "5674343876",
        "Address": "Arlington,Texas,76012"
    }]

    return (
        <div class="layer">
            <div class="flex-container">
                <Sidebar />
                <div class="main-wrapper">
                    <Navbar />
                    <main class="main users chart-page" id="skip-target">
                        <div class="page-container">
                            <div class="flex-column">
                                <h1 class="page-title">Residents availed discount for Flight 1</h1>
                            </div>
                            <div class="page-card">
                                <CustomTable dataList={sampleResidents} showActionHeader={false} showAction={false}/>
                            </div>
                            <Footer />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}


export default FlightRegisteredReport;

