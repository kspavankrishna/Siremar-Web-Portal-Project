// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)


/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import "../../pages/County/CountyList.css";
import { useNavigate } from 'react-router';
import { Table } from "react-bootstrap";

class CustomTable extends Component {

    render() {
        let loggedUser = JSON.parse(localStorage.getItem('userId'));
        let variant = localStorage.darkMode;

        let path = this.props.path ? this.props.path : "";
        let table_name = this.props.tableName ? this.props.tableName : "";
        let reportStyle = { display: this.props.report ? "" : "none" };
        let showActionHeader = { display: this.props.showActionHeader ? "" : "none" };
        let showAction = { display: this.props.showAction ? "" : "none" };
        let registerStyle = { display: this.props.register ? "" : "none" };
        // let tableItems = this.props.dataList;


        // tableItems.forEach(element => {
        //     if(element.hasOwnProperty('userId')){
        //         delete element['userId']
        //     }
        // });


        const showDisplay = (key) => {
            if (key === "user_id" || key === "id" || key==="county_id") {
                return { display: "none" };
            } else {
                return { display: "" };
            }

        }
        const registerBenefit = (benefitId, userId) => {
            axios.post("http://127.0.0.1:8001/userBenefits", { "benefitId": benefitId, "userId": userId, "type": table_name, 'county_id': loggedUser['county_id'] }).then(res => {

                if (res.status === 201||res.status === 200) {
                    window.location.reload(false);

                } else {
                    alert('Failed');
                }
            })

        }

        const deleteItem = (id) => {
            axios.get("http://127.0.0.1:8001/" + table_name.toLowerCase() + "/delete/" + id).then(res => {

                if (res.status === 200) {

                    window.location.reload(false);


                } else {
                    alert('Failed');
                }
            })

        }

        return (

            <div class="">

                <Table bordered hover variant={variant}>


                    <thead >

                        <tr key={"header"}>
                            {Object.keys(this.props.dataList[0]).map((key) => (

                                <th style={showDisplay(key)} class="table-head">{key}</th>
                            ))}
                            <th class="table-head" style={showActionHeader}>Actions</th>

                        </tr>

                    </thead>

                    <tbody >

                        {this.props.dataList.map((item) => (

                            <tr key={item.id}>

                                {Object.entries(item).map((val, idx) => (
                                    <td style={showDisplay(val[0])}>{val[1]}</td>

                                ))}
                                <td >

                                    <ul class="table-icons" style={showAction}>
                                        <a href={path + "&id=" + item.id} class="icon table-action edit" ></a>
                                        <a onClick={() => { deleteItem(item.id) }} class="icon table-action delete" ></a>
                                    </ul>
                                    <a href={this.props.path} class="dashboard-click-btn" style={reportStyle}>Click to know more</a>
                                    {item.user_id == null ?
                                        <a onClick={() => { registerBenefit(item.id, loggedUser['id']) }} style={registerStyle} class="dashboard-click-btn" >Click to register</a>
                                        :
                                        <a>Already Registered</a>
                                    }
                                    {/* <ul class="users-item-dropdown dropdown">
                                            <span class="icon setting" ></span>
                                            <li><a href="##">Edit</a></li>
                                            <li><a href="##">Quick edit</a></li>
                                            <li><a href="##">Trash</a></li>
                                        </ul> */}


                                </td>

                            </tr>
                        ))}




                        <tr>

                        </tr>


                    </tbody>


                </Table>

            </div>
        );
    }
}

export default CustomTable;

