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
import CustomTable from '../../components/Table/Table';
import EmptyPage from '../../components/EmptyPage';
import Piechart from '../../components/Table/Piechat';

function FlightReportList() {
    // const sampleFlightsForGraph = [{
    //     "Name": "Flight 1",
    //     "Number of Residents availed the discount": "20",
    //     "no": 20,
    //     "color": "color-green"
    // }, {
    //     "Name": "Flight 2",
    //     "Number of Residents availed the discount": "20",
    //     "no": 20,
    //     "color": "color-primary"
    // }]
    // let sampleFlights = [{
    //     "Name": "Flight 1",
    //     "Number of Residents availed the discount": "20",

    // }, {
    //     "Name": "Flight 2",
    //     "Number of Residents availed the discount": "20",

    // }]
    let condition = "";
    let conditionForTotalItems = "";
    const [totalResidents, setTotalResidents] = useState(3);
    const [totalResidentsRegistered, settotalResidentsRegistered] = useState(0);
    let url = "http://127.0.0.1:8001/flightsReport";
    const tableName = "Flights";
    let getTotalItemUrl="http://127.0.0.1:8001/userBenefits/count/"+tableName;
    let loggedUser = JSON.parse(localStorage.getItem('userId'));
    const message = "Not availed the discount";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    let title = "Flight Report";
    let params = {
        table_name: tableName,
        select: "airlines_name as Name"
    };

    let showAction = true;
    if (role == "inspector") {
        title = "Flight Report for county 1";
        getTotalItemUrl="http://127.0.0.1:8001/userBenefits/count/"+tableName+"/"+loggedUser['county_id'];
        url= "http://127.0.0.1:8001/flightsReportInspectors/"+loggedUser['county_id'];
    } else if (role == "resident") {
        title = "Availed benefits history for flights";
        showAction = false;
        params.resident_id = loggedUser['id'];
        url = "http://127.0.0.1:8001/flights/report/residents/"+loggedUser['id'];
        // sampleFlights = [{
        //     "Name": "Flight 1",
        //     "Date": "03/12/2021",
        //     "Availed Benefit": "5%"
        // }, {
        //     "Name": "Flight 2",
        //     "Date": "08/12/2020",
        //     "Availed Benefit": "10%"

        // }]
    };
    let graphStyle = { display: role == "resident" ? "none" : "" };

    const [sampleFlights, setItems] = useState([]);
    const [sampleFlightsForGraph, setItemsForGraph] = useState([]);
    const getTotalItems = () => {
        let params = {
            select: "COUNT(*) as count",
            table_name: "Users",
            condition: "where role_id=2"
        }
        if (conditionForTotalItems != "") {
            params.condition = conditionForTotalItems + " and role_id=2"
        }
        axios.get(getTotalItemUrl)
            .then(res => {

                setTotalResidents(res.data)
            })
    }
    const getItems = () => {
        axios.get(url)
            .then(res => {

                setItems(res.data);
                setItemsforGraphFuntion(res.data);
            })
    }

    const setItemsforGraphFuntion = (items) => {
        let itemsForGraph = items.map(v => ({
            Name: v.Name,
            no: v['Number of Residents registered'],
            color: '#' + (Math.random().toString(16) + '0000000').slice(2, 8)
            ,
            id:v.id

        }))
        
        const set = []
        const result = itemsForGraph.filter((o) => {
            if (!set.includes(o)&&o.no!=0){
                set.push(o)
            }
        });
        setItemsForGraph(set)
        let totalItemsRegistered = set.reduce((accumulator, object) => {
            return accumulator + object.no;
        }, 0);
        settotalResidentsRegistered(totalItemsRegistered)
        // console.log(sampleSchoolsForGraph)

    }

    useEffect(() => {
        if (role != "resident") {
            getTotalItems();
        }
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
                                <h1 class="page-title">{title}</h1>
                                {/* <button class="button" onClick={() => navigate("/new/Flight")}>Add New Flight</button> */}
                            </div>
                            <div class="pie-chart-section" style={graphStyle}>
                                <Piechart dataList={sampleFlightsForGraph} totalItems={totalResidents} totalItemsInChart={totalResidentsRegistered} message={message} />
                            </div>
                            {sampleFlights.length > 0 ?
                                <div class="page-card">
                                    <CustomTable dataList={sampleFlights} report={showAction} showActionHeader={showAction} path="report/insights" />
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


export default FlightReportList;

