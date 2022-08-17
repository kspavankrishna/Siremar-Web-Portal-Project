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

function MoveoutList() {

    const navigate = useNavigate();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    const showActionHeader = true;
    let showAction = role == "resident" ? false : true;
    let btnStyle = { display: role == "resident" ? "none" : "" };
    // const sampleFerrys = [{
    //     "Name": "Ferry 1",
    //     "Date": "09/03/2022",
    //     "Phone Number": "8173936701",
    //     "Address": "1001 UTA blvd, campus edge",
    //     "Discounts/Benefits": "20% discount on purchase of two tickets"
    // }, {
    //     "Name": "Ferry 2",
    //     "Date": "09/04/2022",
    //     "Phone Number": "6923937753",
    //     "Address": "1001 UTA blvd, campus edge",
    //     "Discounts/Benefits": "free food and drink available"

    // }];
    let loggedUser = JSON.parse(localStorage.getItem('userId'));
    let url="";
    const tableName = "Moveout"
    const [sampleMoveouts, setItems] = useState([]);

    const getItems = () => {
        if (role == 'inspector') {
            url = "http://127.0.0.1:8001/moveouts/inspectors/" + loggedUser['county_id'];
        } else {
            url = "http://127.0.0.1:8001/moveouts"
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
                                <h1 class="page-title">Moveout</h1>
                                <button class="button" style={btnStyle} onClick={() => navigate("/new/moveout?role="+role)}>Add New Moveout</button>
                            </div>
                            {sampleMoveouts.length > 0 ?
                                <div class="page-card">
                                    <CustomTable path={"/new/moveout?role="+role} tableName={tableName} dataList={sampleMoveouts} showActionHeader={showActionHeader} showAction={showAction} register={!showAction} />
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


export default MoveoutList;

