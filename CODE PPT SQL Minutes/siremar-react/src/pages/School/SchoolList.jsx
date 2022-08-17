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

function SchoolList() {
    const navigate = useNavigate();
    // const sampleSchools = [{
    //     "Name": "School 1",
    //     " County": "WS",
    //     "Phone Number": "8173936701",
    //     "Address": "1001 UTA blvd, campus edge"
    // }, {
    //     "Name": "School 2",
    //     "County": "Tarrant",
    //     "Phone Number": "6923937753",
    //     "Address": "1001 UTA blvd, campus edge"

    // }];
    let url = "";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    const showActionHeader = true;
    let showAction = role == "resident" ? false : true;
    let btnStyle = { display: role == "resident" ? "none" : "" };

    let loggedUser = JSON.parse(localStorage.getItem('userId'));

    const tableName = "Schools"
    const [sampleSchools, setItems] = useState([]);

    let params = {
        select: "name as Name,phone_number as 'Phone Number',id",
        table_name: tableName
    };



    const getItems = () => {
        if (role == "resident") {
            url = "http://127.0.0.1:8001/schools/residents/" + loggedUser['id']

        } else if (role == 'inspector') {
            url = "http://127.0.0.1:8001/schools/inspectors/" + loggedUser['county_id'];
        } else {
            url = "http://127.0.0.1:8001/schools"
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
                                <h1 class="page-title">Schools</h1>
                                <button class="button" style={btnStyle} onClick={() => navigate("/new/school?role=" + role)}>Add New School</button>
                            </div>
                            {sampleSchools.length > 0 ?
                                <div class="page-card">
                                    <CustomTable path={"/new/school?role=" + role} tableName={tableName} dataList={sampleSchools} showActionHeader={showActionHeader} showAction={showAction} register={!showAction} />
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


export default SchoolList;

