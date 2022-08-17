// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by Nishank */
import { useNavigate } from 'react-router';
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import './Register.css'
import MainFooter from '../Footer/MainFooter';
import MainNavBar from '../../components/Navbar/MainNavBar';
import emailjs from 'emailjs-com';
import Alert from 'react-bootstrap/Alert';
import { Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

function Register() {
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tableName = "Users"
    const [formData, updateFormData] = useState({});
    const [counties, setCounties] = useState([]);
    const [showDangerAlert, setshowDangerAlert] = useState(false);
    const [showSuccessAlert, setshowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [validated, setValidated] = useState();
    let role = urlParams.getAll('role')[0];
    let url = "http://127.0.0.1:8001/users";
    useEffect(() => {
        getCounties();

    }, []);

    const getCounties = () => {
        axios.get("http://127.0.0.1:8001/counties", {

        })
            .then(res => {

                setCounties(res.data);
            })
    }


    const handleChange = (e) => {
        updateFormData({
            ...formData,


            [e.target.name]: e.target.value
        });
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

      


            Object.assign(formData, { "table_name": tableName + "(phone_number,first_name,last_name,dob,gender,street1,street2,email,county_id,role_id,password)" });
            let set_values = "'" + formData["phone_number"] + "','" + formData["first_name"] + "','" + formData["last_name"] + "','" + formData["dob"] + "','" + formData["gender"] + "','" + formData["street1"] + "','" + (formData["street2"] ? formData["street2"] : " ") + "','" + formData["email"] + "','" + formData["county_id"] + "','" + formData.role_id + "','" + formData["password"] + "'"
            Object.assign(formData, { "set_values": set_values });



            axios.post(url, formData).then(res => {

                setshowSuccessAlert(true);
                if (res.status === 201||res.status === 200) {
             

                    emailjs.send(
                        'gmail', "template_0i83dy8",
                        { from_name: "Siremar", to_name: formData.first_name, user_name: formData.email, password: formData.password, to_email: formData.email, reply_to: "manasa229@gmail.com" },
                        "F6SSSCyg2eiw9FOqi"
                    ).then(res => {
                        console.log('Email successfully sent!')
                    })
                       
                    navigate("/login");
                } else {
                    alert('Failed');
                }
            })
                .catch(error => {
                    setshowDangerAlert(true);
                    setErrorMessage(error.response.data.message);

                })
        
       
    }

    return (
        <div class="register-container flex-column">
            <MainNavBar />

            <div class="">
                <div className="register-section w-auto" border="2" >
                    <div className="flex-column">
                        <h1 class="register-title">Register</h1>

                        <Form class="register-form" action="" method="">
                            <div class="flex-row">
                                <Form.Label class="custom-form-label-wrapper">
                                    <p class="custom-form-label">First Name</p>
                                    <Form.Control name="first_name" value={formData["first_name"]} onChange={handleChange} type="text" placeholder="Enter first name" required />
                                    <Form.Text className="text-muted"></Form.Text>
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
                                    <p class="custom-form-label">County</p>
                                    <Form.Select class="register-form-select" name="county_id" value={formData.county_id} onChange={handleChange}>
                                        <option value="0">Select county</option>
                                        {counties.map((e, key) => {
                                            return <option key={key} value={e.county_id}>{e.Name}</option>;
                                        })}
                                    </Form.Select>
                                </Form.Label>
                                <Form.Label class="custom-form-label-wrapper">
                                    <p class="custom-form-label">Role</p>
                                    <Form.Select class="register-form-select" name="role_id" value={formData.role_id} onChange={handleChange}>
                                        <option value="0">Select role</option>
                                        <option value="2">Resident</option>
                                        <option value="1">Inspector</option>
                                    </Form.Select>
                                </Form.Label>
                                <Form.Label class="custom-form-label-wrapper">
                                    <p class="custom-form-label">Password</p>
                                    <Form.Control name="password" value={formData["password"]} onChange={handleChange} type="password" placeholder="Enter password" required />
                                </Form.Label>
                                <Form.Label class="custom-form-label-wrapper">
                                    <p class="custom-form-label">Retype Password</p>
                                    <Form.Control type="password" placeholder="Retype password" required />
                                </Form.Label>


                            </div>


                            {/* <div className="d-flex align-items-center justify-content-center ">
                                    <Alert
                                        show={showDangerAlert}
                                        variant="danger"
                                        className=" ml-3 "
                                    >
                                        {errorMessage}
                                    </Alert>
                                    <Alert
                                        show={showSuccessAlert}
                                        variant="success"

                                    >
                                        Registered Successfully
                                    </Alert>
                                </div> */}
                            <div class="button-end">

                                <button class="register-form-btn primary-default-button" onClick={handelSubmit}>Register</button>
                            </div>

                        </Form>

                    </div>

                </div>

            </div>

            <MainFooter />
        </div>
    );

}

export default Register;