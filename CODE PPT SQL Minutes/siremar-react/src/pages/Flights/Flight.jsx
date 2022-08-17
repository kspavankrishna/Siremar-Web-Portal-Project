// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import "../County/CountyList"
import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router';
import { Form } from 'react-bootstrap';

function Flight() {

    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tableName = "Flights"
    const [formData, updateFormData] = useState({});
    const [counties, setCounties] = useState([]);
    let id = urlParams.getAll('id')[0];
    let role = urlParams.getAll('role')[0];
    let url = "http://127.0.0.1:8001/flights";
    useEffect(() => {
        getCounties();
        getResidentById();
    }, []);

        const getCounties = () => {
        axios.get("http://127.0.0.1:8001/counties")
            .then(res => {

                setCounties(res.data);
            })
    }
    const getResidentById = () => {

        if (id) {
            axios.get("http://127.0.0.1:8001/flights/" + id)
                .then(res => {
    
                    updateFormData(res.data);
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
            formData.id=id;
            url = "http://127.0.0.1:8001/updateFlight"
            Object.assign(formData, { "table_name": tableName });
            let set_values = "flight_number='" + formData["flight_number"] + "'," + "airlines_name='" + formData["airlines_name"] + "',date_of_departure='" + formData.date_of_departure + "',flight_time='" + formData.flight_time + "',destination='" + formData.destination + "',county_id='" + formData.county_id + "',benefits='" + formData.benefits + "'";
            Object.assign(formData, { "set_values": set_values });
        } else {
            Object.assign(formData, { "table_name": tableName + "(airlines_name,flight_number,date_of_departure,flight_time,destination,county_id,benefits)" });
            let set_values = "'" + formData["airlines_name"] + "','" + formData.flight_number +  "','" + formData["date_of_departure"]+"','" + formData["flight_time"] + "','" + formData["destination"]  + "','" + formData["county_id"] + "','"+formData["benefits"]+"'";
            Object.assign(formData, { "set_values": set_values });
        }


        axios.post(url, formData).then(res => {
      
            if (res.status === 201||res.status === 200) {
         
                navigate("/flights?role="+role);
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
                    <h1 class="page-title">New Flight</h1>
                    <div class="form-section">
                        <div class="form-save-card">

                            <Form class="register-form" action="" method="">
                                <div class="flex-row">
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Airlines Name</p>
                                        <Form.Control name="airlines_name" value={formData["airlines_name"]} onChange={handleChange} type="text" placeholder="Enter clinic name" required />
                                    </Form.Label>
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Flight number</p>
                                        <Form.Control name="flight_number" value={formData["flight_number"]} onChange={handleChange} type="text" placeholder="Enter flight no" required />
                                    </Form.Label>

                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Date</p>
                                        <Form.Control name="date_of_departure" value={formData["date_of_departure"]} onChange={handleChange} type="date" placeholder="Enter date" required />
                                    </Form.Label>
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Time</p>
                                        <Form.Control name="flight_time" value={formData["flight_time"]} onChange={handleChange} type="time" placeholder="Enter time" />
                                    </Form.Label>

                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Destination</p>
                                        <Form.Control name="destination" value={formData["destination"]} onChange={handleChange} type="text" placeholder="Enter phone number" required />
                                    </Form.Label>


                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">County</p>
                                        <Form.Select class="register-form-select" name="county_id" value={formData.county_id} onChange={handleChange}>
                                            <option value="0">Select county</option>
                                            {counties.map((e, key) => {
                                                return <option key={key} value={e.county_id}>{e.Name}</option>;
                                            })}
                                        </Form.Select>
                                    </Form.Label>
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Benefits/Discounts</p>
                                        <Form.Control name="benefits" value={formData["benefits"]} onChange={handleChange} type="text" placeholder="Enter the benefits/discount on ticket" required />
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

export default Flight;

