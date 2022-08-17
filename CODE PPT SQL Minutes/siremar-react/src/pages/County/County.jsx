// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by Manasa Mohan Kumar */
import "../County/CountyList.css"
import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from "react-bootstrap";

function County() {
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);


    let id = urlParams.getAll('id')[0];
    let role = urlParams.getAll('role')[0];
    let url = "http://127.0.0.1:8001/counties";
    useEffect(() => {
        getCountyById();
    }, []);
    const getCountyById = () => {

        if (id) {
            axios.get("http://127.0.0.1:8001/counties/" + id)
                .then(res => {

                    updateFormData(res.data);
                })
        }
    }

    const [formData, updateFormData] = useState({});

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value
        });
    };
    const handelSubmit = (e) => {
        e.preventDefault();

        updateFormData({
            ...formData,
            ["table_name"]: "Counties"
        });
        if (id) {
            formData.id = id;
            url = "http://127.0.0.1:8001/updateCounty"
            Object.assign(formData, { "table_name": "Counties" });
            let set_values = "county_name='" + formData["county_name"] + "'";
            Object.assign(formData, { "set_values": set_values });
        } else {
            Object.assign(formData, { "table_name": "Counties(county_name)" });
            let set_values = "'" + formData["county_name"] + "'";
            Object.assign(formData, { "set_values": set_values });
        }


        axios.post(url, formData).then(res => {

            if (res.status === 201) {
         
                navigate("/county?role=" + role);
            } else {
                alert('Failed');
            }
        })

    }




    return (
        <div class="layer">
            <div class="flex-container">
                <Sidebar />
                <div class="main-wrapper">
                    <Navbar />
                    <h1 class="page-title">New County</h1>
                    <div class="form-section">
                        <div class="form-save-card">
                            <Form>
                                <div class="flex-row">
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Name</p>
                                        <Form.Control name="county_name" value={formData["county_name"]} onChange={handleChange} type="text" placeholder="Enter county name" required />
                                    </Form.Label>
                                </div>

                                <div class="save-button">
                                    <button class="save-form-btn primary-default-button" onClick={handelSubmit}>Save</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );

}

export default County;

