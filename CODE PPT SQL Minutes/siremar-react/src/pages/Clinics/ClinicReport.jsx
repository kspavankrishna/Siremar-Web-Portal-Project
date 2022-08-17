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
import Piechart from '../../components/Table/Piechat';

function ClinicReportList() {
    const navigate = useNavigate();
    // const sampleClinicsForGraph = [{
    //     "Name": "Clinic 1",
    //     "Number of Residents registered": "20",
    //     "no": 20,
    //     "color": "color-green"
    // }, {
    //     "Name": "Clinic 2",
    //     "Number of Residents registered": "50",
    //     "no": 50,
    //     "color": "color-primary"
    // }]
    // let sampleClinics = [{
    //     "Name": "Clinic 1",
    //     "Number of Residents registered": "20",

    // }, {
    //     "Name": "Clinic 2",
    //     "Number of Residents registered": "50",

    // }]
    let condition = "";
    let conditionForTotalItems = "";
    const [totalResidents, setTotalResidents] = useState(3);
    const [totalResidentsRegistered, settotalResidentsRegistered] = useState(0);
    let url = "http://127.0.0.1:8001/clinicsReport";
    const tableName = "Clinics";
    let getTotalItemUrl="http://127.0.0.1:8001/userBenefits/count/"+tableName;
    const message = "Not registered";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let loggedUser = JSON.parse(localStorage.getItem('userId'));
    let role = urlParams.getAll('role')[0];
    let title = "Clinic Report";
    let showAction = true;
    let params = {
        table_name: tableName,
        select:"name as Name"
    };
    if (role == "inspector") {
        title = "Clinic Report for county 1";
        getTotalItemUrl="http://127.0.0.1:8001/userBenefits/count/"+tableName+"/"+loggedUser['county_id'];
        url= "http://127.0.0.1:8001/clinicsReportInspectors/"+loggedUser['county_id'];
    } else if (role == "resident") {
        title = "Availed benefits history for clinics";
        showAction = false;
        params.resident_id = loggedUser['id'];
        url = "http://127.0.0.1:8001/clinics/report/residents/"+loggedUser['id'];
        //     sampleClinics = [{
        //        "Name": "Clinic 1",
        //        "Date": "03/12/2021",
        //        "Availed Benefit":"Insurance"
        //    }, {
        //        "Name": "Clinic 2",
        //        "Date": "08/12/2020",
        //        "Availed Benefit":"Insurance"

        //    }]
    }
    let graphStyle = { display: role == "resident" ? "none" : "" };

    const [sampleClinics, setItems] = useState([]);
    const [sampleClinicsForGraph, setItemsForGraph] = useState([]);

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
                                {/* <button class="button" onClick={() => navigate("/new/Clinic")}>Add New Clinic</button> */}
                            </div>
                            <div class="pie-chart-section" style={graphStyle}>
                                <Piechart dataList={sampleClinicsForGraph} totalItems={totalResidents} totalItemsInChart={totalResidentsRegistered} message={message} />
                            </div>
                            {sampleClinics.length > 0 ?
                                <div class="page-card">
                                    <CustomTable dataList={sampleClinics} report={showAction} showActionHeader={showAction} path="report/insights" />
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


export default ClinicReportList;

