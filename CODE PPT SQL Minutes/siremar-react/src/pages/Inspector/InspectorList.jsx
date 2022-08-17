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

function InspectorList() {
    const navigate = useNavigate();

    // const sampleInspectors = [{
    //     "Name": "Inspector 1",
    //     "Gender": "Male",
    //     "Assigned County": "WS",
    //     "Phone Number": "8173936701",
    //     "Verified": "Yes"
    // }, {
    //     "Name": "Inspector 2",
    //     "Gender": "Female",
    //     "Assigned County": "Tarrant",
    //     "Phone Number": "6923937753",
    //     "Verified": "No"

    // }];
    let url="";
    let condition="";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    const showActionHeader = true;
    let showAction = role == "resident" ? false : true;
    let loggedUser = JSON.parse(localStorage.getItem('userId'));
    const tableName = "Users"
    const [sampleInspectors, setItems] = useState([]);
    let params= {
        select: "first_name as Name,phone_number as 'Phone Number', email as Email,id",
        table_name: tableName,
        condition:"where role_id=1"
    }

    const getItems = () => {
        if (role=="resident"){
            url="http://127.0.0.1:8001/schools/Resident/get.php"
            params.resident_id=loggedUser['id']
            params.sub_select="name"
        }else{
            url = "http://127.0.0.1:8001/inspectors";
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
                                <h1 class="page-title">Inspectors</h1>
                                <button class="button" onClick={() => navigate("/new/inspector")}>Add New Inspector</button>
                            </div>
                            {sampleInspectors.length > 0 ?
                            <div class="page-card">
                                <CustomTable path={"/new/inspector?role=" + role} tableName={tableName} dataList={sampleInspectors} showActionHeader={showActionHeader} showAction={showAction} register={!showAction}/>
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


export default InspectorList;

