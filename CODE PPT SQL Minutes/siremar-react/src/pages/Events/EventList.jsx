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



function EventList() {

    const navigate = useNavigate();
    const tableName = "Events"
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    const showActionHeader = true;
    let showAction = role == "resident" ? false : true;
    let btnStyle = { display: role == "resident" ?"none" : "" };
    let params = {
        select: "name as Name,id",
        table_name: tableName
    };

    // const sampleEvents = [{
    //     "Name": "Event 1",
    //     "Date": "09/03/2022",
    //     "Phone Number": "4567837896",
    //     "Address": "DFW",
    //     "Discounts/Benefits": "20% discount on tickets"
    // }, {
    //     "Name": "Event 2",
    //     "Date": "09/03/2022",
    //     "Phone Number": "7864534567",
    //     "Address": "Newyork",
    //     "Discounts/Benefits": "10% discount on tickets"

    // }];
    let loggedUser = JSON.parse(localStorage.getItem('userId'));
    let url="";

    const [sampleEvents, setItems] = useState([]);

    

    if (role == 'inspector') {
        params.condition = "where county_id='" + loggedUser['county_id'] + "'";
    }

    const getItems = () => {
        if (role=="resident"){
            url="http://127.0.0.1:8001/events/residents/"+loggedUser['id']
            params.resident_id=loggedUser['id']
            params.select="name as Name"
        }else if (role == 'inspector') {
            url="http://127.0.0.1:8001/events/"+loggedUser['county_id'];
        }else{
            url="http://127.0.0.1:8001/events"
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
                                <h1 class="page-title">Events</h1>
                                <button class="button" style={btnStyle}  onClick={() => navigate("/new/event?role="+role)}>Add New Event</button>
                            </div>
                            {sampleEvents.length > 0 ?
                            <div class="page-card">
                                <CustomTable path={"/new/event?role="+role} tableName={tableName}  dataList={sampleEvents} showActionHeader={showActionHeader} showAction={showAction} register={!showAction}/>
                            </div>: <div>
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


export default EventList;

