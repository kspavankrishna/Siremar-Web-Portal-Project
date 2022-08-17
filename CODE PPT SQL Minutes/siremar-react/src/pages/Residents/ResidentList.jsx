// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)


/* Developed by K S Pavan Krishna */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "../County/CountyList.css"
import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../Footer/Footer';
import CustomTable from '../../components/Table/Table';
import EmptyPage from '../../components/EmptyPage';

function ResidentList() {
    const navigate = useNavigate();
    // const sampleResidents = [{
    //     "Name": "Resident 1",
    //     "Gender": "Male",
    //     "Age": 24,
    //     "Phone Number": "8173936701",
    //     "Address": "1001 UTA blvd, campus edge"
    // }, {
    //     "Name": "Resident 2",
    //     "Gender": "Female",
    //     "Age": 24,
    //     "Phone Number": "5674348876",
    //     "Address": "Arlington,Texas,76012"
    // }];
    let url = "";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    const showActionHeader = true;
    let showAction = role == "resident" ? false : true;

    let loggedUser = JSON.parse(localStorage.getItem('userId'));

    const tableName = "Users";
    const [sampleResidents, setItems] = useState([]);


    if (role == 'inspector') {
        url = "http://127.0.0.1:8001/residents/" + loggedUser['county_id'];
    } else if (role == 'admin') {
        url = "http://127.0.0.1:8001/residents";
    }

    const getItems = () => {
        axios.get(url)
            .then(res => {

                setItems(res.data);
            })
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div class="layer">
            <div class="flex-container">
                <Sidebar />
                <div class="main-wrapper">
                    <Navbar />
                    <main class="main users chart-page" id="skip-target">
                        <div class="page-container">
                            <div class="flex-column">
                                <h1 class="page-title">Residents</h1>
                                <button class="button" onClick={() => navigate("/new/resident")}>Add New Resident</button>
                            </div>
                            {sampleResidents.length > 0 ?
                                <div class="page-card">
                                    <CustomTable path={"/new/resident?role=" + role} tableName={tableName} dataList={sampleResidents} showActionHeader={showActionHeader} showAction={showAction} register={!showAction} />
                                </div> : <div>
                                    <EmptyPage />
                                </div>}
                            <Footer />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}


export default ResidentList;

