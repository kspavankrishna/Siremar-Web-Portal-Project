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

function FlightList() {

    const navigate = useNavigate();
    // const sampleFlights = [{
    //     "Name": "Flight 1",
    //     "Flight Number": "093",
    //     "Source": "Dallas",
    //     "Destination": "Sanfranscisco",
    //     "Airport": "DFW",
    //     "Discounts/Benefits": "20% discount on tickets"
    // }, {
    //     "Name": "Flight 2",
    //     "Flight Number": "063",
    //     "Source": "Dallas",
    //     "Destination": "Newyork",
    //     "Airport": "DFW",
    //     "Discounts/Benefits": "10% discount on tickets"

    // }];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    const showActionHeader = true;
    let showAction = role == "resident" ? false : true;
    let btnStyle = { display: role == "resident" ? "none" : "" };

    let loggedUser = JSON.parse(localStorage.getItem('userId'));

    const tableName = "Flights";
    const [sampleFlights, setItems] = useState([]);

    let params = {
        select: "airlines_name as Name,id",
        table_name: tableName
    };

   
    let url="";
    const getItems = () => {
        if (role=="resident"){
            url="http://127.0.0.1:8001/flights/residents/"+loggedUser['id']
            params.resident_id=loggedUser['id']
            params.select= "airlines_name as Name"
        } else if (role == 'inspector') {
            url="http://127.0.0.1:8001/flights/"+loggedUser['county_id'];
        }else{
            url="http://127.0.0.1:8001/flights";
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
                                <h1 class="page-title">Flights</h1>
                                <button class="button" style={btnStyle} onClick={() => navigate("/new/flight?role="+role)}>Add New Flight</button>
                            </div>
                            {sampleFlights.length > 0 ?
                                <div class="page-card">
                                    <CustomTable path={"/new/flight?role=" + role}tableName={tableName} dataList={sampleFlights} showActionHeader={showActionHeader} showAction={showAction} register={!showAction} />
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


export default FlightList;

