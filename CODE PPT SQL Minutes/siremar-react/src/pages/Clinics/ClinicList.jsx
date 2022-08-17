// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import "../County/CountyList.css"
import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router';
import CustomTable from '../../components/Table/Table';
import EmptyPage from '../../components/EmptyPage';

function ClinicList() {

    const navigate = useNavigate();
    let url="";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    const showActionHeader = true;
    let showAction = role == "resident" ? false : true;
    let btnStyle = { display: role == "resident" ? "none" : "" };

    let loggedUser = JSON.parse(localStorage.getItem('userId'));

    const tableName = "Clinics"
    const [sampleClinics, setItems] = useState([]);

    let params = {
        select: "name as Name,phone_number as 'Phone Number',id",
        table_name: tableName
    };

    if (role == 'inspector') {
        params.condition = "where county_id='" + loggedUser['county_id'] + "'";
    }

    const getItems = () => {
        if (role=="resident"){
            url="http://127.0.0.1:8001/clinics/residents/"+loggedUser['id'];
            params.resident_id=loggedUser['id']
            params.select= "name as Name"
        }else if (role == 'inspector') {
            url="http://127.0.0.1:8001/clinics/"+loggedUser['county_id'];
        }else{
            url="http://127.0.0.1:8001/clinics";
        }
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
                                <h1 class="page-title">Clinics</h1>
                                <button class="button" style={btnStyle} onClick={() => navigate("/new/Clinic?role="+role)}>Add New Clinic</button>
                            </div>
                            {sampleClinics.length > 0 ?
                                <div class="page-card">
                                    <CustomTable path={"/new/Clinic?role=" + role} tableName={tableName} dataList={sampleClinics} showActionHeader={showActionHeader} showAction={showAction} register={!showAction} />
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


export default ClinicList;

