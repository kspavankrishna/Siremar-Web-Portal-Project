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
import Piechart from '../../components/Table/Piechat';

function SchoolReportList() {
    const navigate = useNavigate();

    // let sampleSchools = [{
    //     "Name": "School 1",
    //     "Number of Residents registered": "20",

    // }, {
    //     "Name": "School 2",
    //     "Number of Residents registered": "50",

    // }]
    // let sampleSchoolsForGraph=[]
    const message = "Not registered";
    let url = "http://127.0.0.1:8001/schoolsReport";

    let condition = "";
    let conditionForTotalItems = "";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    let title = "School Report";
    let loggedUser = JSON.parse(localStorage.getItem('userId'));
    let showAction = true;
    let graphStyle = { display: role == "resident" ? "none" : "" };
    const tableName = "Schools"
    let getTotalItemUrl = "http://127.0.0.1:8001/userBenefits/count/" + tableName;
    const [sampleSchools, setItems] = useState([]);
    const [totalResidents, setTotalResidents] = useState(0);
    const [totalResidentsRegistered, settotalResidentsRegistered] = useState(0);
    const [sampleSchoolsForGraph, setItemsForGraph] = useState([]);
    let params = {
        table_name: tableName,
        select: "name as Name"
    };
    if (role == "inspector") {
        title = "School Report for county 1";
        condition = " where Schools.county_id='" + loggedUser['county_id'] + "'";
        conditionForTotalItems = " where county_id='" + loggedUser['county_id'] + "'";
        getTotalItemUrl = "http://127.0.0.1:8001/userBenefits/count/" + tableName + "/" + loggedUser['county_id'];
        url= "http://127.0.0.1:8001/schoolsReportInspectors/"+loggedUser['county_id'];
    } else if (role == "resident") {
        title = "Registerd schools history";
        params.resident_id = loggedUser['id'];
        url = "http://127.0.0.1:8001/schools/report/residents/" + loggedUser['id'];
        // if (role == "inspector") {
        //     title = "Flight Report for county 1";
        // } else if (role == "resident") {
        //     title = "Availed benefits history for flights";
        showAction = false;
        // sampleSchools = [{
        //     "Name": "School 1",
        //     "Date": "03/12/2021",
        //     "Availed Benefit": "Free meal"
        // }, {
        //     "Name": "School 2",
        //     "Date": "08/12/2020",
        //     "Availed Benefit": "10% on fees"
        // }]

    }

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
        if (condition != "") {
            params.condition = condition;
        }
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
            color: '#' + (Math.random().toString(16) + '0000000').slice(2, 8),
            id: v.id

        }))

        const set = []
        const result = itemsForGraph.filter((o) => {
            if (!set.includes(o) && o.no != 0) {
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
                                {/* <button class="button" onClick={() => navigate("/new/school")}>Add New School</button> */}
                            </div>
                            <div class="pie-chart-section" style={graphStyle}>
                                <Piechart dataList={sampleSchoolsForGraph} totalItems={totalResidents} totalItemsInChart={totalResidentsRegistered} message={message} />
                            </div>
                            {sampleSchools.length > 0 ?
                                <div class="page-card">
                                    <CustomTable dataList={sampleSchools} report={showAction} showActionHeader={showAction} path="report/insights" />
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


export default SchoolReportList;

