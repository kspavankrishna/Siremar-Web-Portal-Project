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


function BusinessList() {
    const navigate = useNavigate();

    // const sampleBusinesss = [{
    //     "Name": "Business 1",
    //     "Type": "Bank",
    //     "Phone Number": "8173936701",
    //     "Address": "1001 UTA blvd, campus edge",
    //     "Discounts/Benfitis": "free insurance for 5 years"
    // }, {
    //     "Name": "Business 2",
    //     "Type": "Housing",
    //     "Phone Number": "6923937753",
    //     "Address": "1001 UTA blvd, campus edge",
    //     "Discounts/Benfitis": "claim the property damages investment upto 8000usd"

    // }];
    let url = "";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let role = urlParams.getAll('role')[0];
    const showActionHeader = true;
    let showAction = role == "resident" ? false : true;
    let btnStyle = { display: role == "resident" ? "none" : "" };

    let loggedUser = JSON.parse(localStorage.getItem('userId'));

    const tableName = "Business"
    const [sampleBusinesss, setItems] = useState([]);

    let params = {
        select: "description as Description,id",
        table_name: tableName
    };

    if (role == 'inspector') {
        params.condition = "where county_id='" + loggedUser['county_id'] + "'";
    }


    const getItems = () => {
        if (role == "resident") {
            url = "http://127.0.0.1:8001/businesses/residents/" + loggedUser['id'];
            params.resident_id = loggedUser['id']
            params.select = "description as Description"

        } else if (role == 'inspector') {
            url="http://127.0.0.1:8001/businesses/"+loggedUser['county_id'];
        }else {
            url = "http://127.0.0.1:8001/businesses"
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
                                <h1 class="page-title">Business</h1>
                                <button class="button" style={btnStyle} onClick={() => navigate("/new/business?role=" + role)}>Add New Business</button>
                            </div>
                            {sampleBusinesss.length > 0 ?
                                <div class="page-card">
                                    <CustomTable path={"/new/business?role=" + role} tableName={tableName} dataList={sampleBusinesss} showActionHeader={showActionHeader} showAction={showAction} register={!showAction} />
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


export default BusinessList;

