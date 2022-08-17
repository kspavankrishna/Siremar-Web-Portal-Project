// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by Manasa Mohan Kumar */

import "./CountyList.css"
import Sidebar from "../Sidebar/Sidebar.js";
import Navbar from '../../components/Navbar/Navbar';
import EmptyPage from '../../components/EmptyPage';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router';
import CustomTable from '../../components/Table/Table';
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';


function CountyList() {
    const navigate = useNavigate();
    let url = "";

    const tableName = "Counties"
    const [sampleFerrys, setItems] = useState([]);
    let loggedUser = JSON.parse(localStorage.getItem('userId'));
    let params = {
        select: "county_name as Name,id",
        table_name: tableName
    }

    const getItems = () => {
        if (role == "resident") {
            url = "http://127.0.0.1:8001/schools/Resident/get.php"
            params.resident_id = loggedUser['id']
        } else {
            url = "http://127.0.0.1:8001/counties"
        }
        axios.get(url)
            .then(res => {

                setItems(res.data);
            })
    }

    useEffect(() => {
        getItems();
     
    }, []);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    const showActionHeader = true;
    let showAction = role == "resident" ? false : true;
    return (
        <div class="layer">
            <div class="flex-container">
                <Sidebar />
                <div class="main-wrapper">
                    <Navbar />
                    <main class="main users chart-page" id="skip-target">
                        <div class="page-container">
                            <div class="flex-column">
                                <h1 class="page-title">Counties</h1>
                                <button class="button" onClick={() => navigate("/new/county?role=" + role)}>Add New County</button>
                            </div>
                            {sampleFerrys.length > 0 ?
                                <div class="page-card">

                                    <CustomTable path={"/new/county?role=" + role} tableName={tableName} dataList={sampleFerrys} showActionHeader={showActionHeader} showAction={showAction} register={!showAction} />

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

export default CountyList;

