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

function Inspector() {
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tableName = "Users"
    const [formData, updateFormData] = useState({});
    const [counties, setCounties] = useState([]);
    let id = urlParams.getAll('id')[0];
    let role = urlParams.getAll('role')[0];
    let url = "http://127.0.0.1:8001/inspectors";
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
            axios.get("http://127.0.0.1:8001/users/" + id)

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
            url = "http://127.0.0.1:8001/updateInspector";
            Object.assign(formData, { "table_name": tableName });
            let set_values = "phone_number='" + formData["phone_number"] + "',first_name='" + formData["first_name"] + "',last_name='" + formData.last_name + "',dob='" + formData.dob + "',gender='" + formData.gender + "',street1='" + formData.street1 + "',street2='" + formData.street2 + "',email='" + formData.email + "',county_id='" + formData.county_id + "',password='" + formData["last_name"] + (formData["phone_number"]).substring(1, 4) + "'";
            Object.assign(formData, { "set_values": set_values });
        } else {
            url = "http://127.0.0.1:8001/inspectors"
            Object.assign(formData, { "table_name": tableName + "(phone_number,first_name,last_name,dob,gender,street1,street2,email,county_id,role_id,password)" });
            let set_values = "'" + formData["phone_number"] + "','" + formData["first_name"] + "','" + formData["last_name"] + "','" + formData["dob"] + "','" + formData["gender"] + "','" + formData["street1"] + "','" + (formData["street2"] ? formData["street2"] : " ") + "','" + formData["email"] + "','" + formData["county_id"] + "','" + '1' + "','" + formData["last_name"] + (formData["phone_number"]).substring(1, 4) + "'"
            Object.assign(formData, { "set_values": set_values });
        }

        axios.post(url, formData).then(res => {

            if (res.status === 201) {

                navigate("/inspectors?role=" + role);
            } else if (res.status === 200) {
                navigate("/inspectors?role=" + role);
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
                    <h1 class="page-title">New Inspector</h1>
                    <div class="form-section">
                        <div class="form-save-card">
                            <Form class="register-form" action="" method="">
                                <div class="flex-row">
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">First Name</p>
                                        <Form.Control name="first_name" value={formData["first_name"]} onChange={handleChange} type="text" placeholder="Enter first name" required />
                                    </Form.Label>
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Last Name</p>
                                        <Form.Control name="last_name" value={formData["last_name"]} onChange={handleChange} type="text" placeholder="Enter last name" required />
                                    </Form.Label>
                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Date of birth</p>
                                        <Form.Control name="dob" value={formData["dob"]} onChange={handleChange} type="date" placeholder="Enter date of birth" required />
                                    </Form.Label>

                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Gender</p>
                                        <Form.Select class="register-form-select" name="gender" value={formData["gender"]} onChange={handleChange}>
                                            <option value="0">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
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
                                        <p class="custom-form-label">Email</p>
                                        <Form.Control name="email" value={formData["email"]} onChange={handleChange} type="email" placeholder="Enter email" required />
                                    </Form.Label>

                                    <Form.Label class="custom-form-label-wrapper">
                                        <p class="custom-form-label">Assign County</p>
                                        <Form.Select class="register-form-select" name="county_id" value={formData.county_id} onChange={handleChange}>
                                            <option value="0">Assign county for the inspector</option>
                                            {counties.map((e, key) => {
                                                return <option key={key} value={e.county_id}>{e.Name}</option>;
                                            })}
                                        </Form.Select>
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

export default Inspector;

