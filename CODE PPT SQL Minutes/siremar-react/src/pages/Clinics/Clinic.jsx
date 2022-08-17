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

function Clinic() {

    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tableName = "Clinics"
    const [formData, updateFormData] = useState({});
    const [counties, setCounties] = useState([]);
    let id = urlParams.getAll('id')[0];
    let role = urlParams.getAll('role')[0];
    let url = "http://127.0.0.1:8001/clinics";
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
            axios.get("http://127.0.0.1:8001/clinics/" + id)
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
            formData.id = id;
            url = "http://127.0.0.1:8001/updateClinic"
            Object.assign(formData, { "table_name": tableName });
            let set_values = "phone_number='" + formData["phone_number"] + "'," + "name='" + formData["name"] + "',street1='" + formData.street1 + "',street2='" + formData.street2 + "',county_id='" + formData.county_id + "',benefits='" + formData.benefits + "'";
            Object.assign(formData, { "set_values": set_values });
        } else {
            Object.assign(formData, { "table_name": tableName + "(name,phone_number,street1,street2,county_id,benefits)" });
            let set_values = "'" + formData["name"] + "','" + formData.phone_number + "','" + formData["street1"] + "','" + (formData["street2"] ? formData["street2"] : " ") + "','" + formData["county_id"] + "','" + formData.benefits + "'";
            Object.assign(formData, { "set_values": set_values });
        }


        axios.post(url, formData).then(res => {

            if (res.status === 201||res.status === 200) {

                navigate("/clinics?role=" + role);
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
                    <h1 class="page-title">New Clinic</h1>
                    <div class="form-section">
                        <div class="form-save-card">


                            <Form class="register-form" action="" method="">
                                <div class="flex-row">
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Name</p>
                                        <Form.Control name="name" value={formData["name"]} onChange={handleChange} type="text" placeholder="Enter clinic name" required />
                                    </Form.Label>

                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Street 1</p>
                                        <Form.Control name="street1" value={formData["street1"]} onChange={handleChange} type="text" placeholder="Enter street 1" required />
                                    </Form.Label>
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Street 2</p>
                                        <Form.Control name="street2" value={formData["street2"]} onChange={handleChange} type="text" placeholder="Enter street 2" />
                                    </Form.Label>

                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Phone number</p>
                                        <Form.Control name="phone_number" value={formData["phone_number"]} onChange={handleChange} type="number" placeholder="Enter phone number" required />
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
                                        <p class="custom-form-label">Benefits</p>
                                        <Form.Control name="benefits" value={formData["benefits"]} onChange={handleChange} type="text" placeholder="Enter the benefits who visits this hospital" required />
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

export default Clinic;

