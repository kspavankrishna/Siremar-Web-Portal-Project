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
import { Form } from 'react-bootstrap';

function Moveout() {

    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tableName = "Moveout"
    const [formData, updateFormData] = useState({});
    const [counties, setCounties] = useState([]);
    let id = urlParams.getAll('id')[0];
    let role = urlParams.getAll('role')[0];
    let url = "http://127.0.0.1:8001/moveouts";
    useEffect(() => {
        getResidents();
        getResidentById();
    }, []);

    const getResidents = () => {
        axios.get("http://127.0.0.1:8001/residents")
            .then(res => {

                setCounties(res.data);
            })
    }
    const getResidentById = () => {

        if (id) {
            axios.get("http://127.0.0.1:8001/moveouts/" + id)
                .then(res => {

                    updateFormData(res.data[0]);
                })
        }
    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value
        });
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        if (id) {
            url = "http://127.0.0.1:8001/updateMoveout"
            Object.assign(formData, { "table_name": tableName });
            let set_values = "date_of_moveout='" + formData["date_of_moveout"] + "'," + "name='" + formData["name"] + "',moveout_time='" + formData["moveout_time"] + "',street1='" + formData.street1 + "',street2='" + formData.street2 + "'";
            Object.assign(formData, { "set_values": set_values });
        } else {
            Object.assign(formData, { "table_name": tableName + "(name,date_of_moveout,moveout_time,street1,street2)" });
            let set_values = "'" + formData["name"] + "','" + formData.date_of_moveout + "','" + formData["moveout_time"] + "','" + formData["street1"] + "','" + (formData["street2"] ? formData["street2"] : " ") + "'";
            Object.assign(formData, { "set_values": set_values });
        }


        axios.post(url, formData).then(res => {

            if (res.status === 201||res.status === 200) {

                navigate("/moveout?role=" + role);
            } else if (res.status === 200) {
                navigate("/moveout?role=" + role);
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
                    <h1 class="page-title">New moveout</h1>
                    <div class="form-section">
                        <div class="form-save-card">
                            <Form class="register-form" action="" method="">
                                <div class="flex-row">
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Resident</p>
                                        <Form.Select class="register-form-select" name="user_id" value={formData.user_id} onChange={handleChange}>
                                            <option value="0">Select Resident</option>
                                            {counties.map((e, key) => {
                                                return <option key={key} value={e.id}>{e.Name}</option>;
                                            })}
                                        </Form.Select>
                                    </Form.Label>


                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Date</p>
                                        <Form.Control name="date_of_moveout" value={formData["date_of_moveout"]} onChange={handleChange} type="date" placeholder="Enter date" required />
                                    </Form.Label>
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Time</p>
                                        <Form.Control name="moveout_time" value={formData["moveout_time"]} onChange={handleChange} type="time" placeholder="Enter time" />
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

export default Moveout;

