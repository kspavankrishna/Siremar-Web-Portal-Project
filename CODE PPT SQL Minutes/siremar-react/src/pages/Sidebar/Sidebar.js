// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)


/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import "./Sidebar.css"
let navLinks = [
    { url: '/residents?role=admin', icon: 'icon user-3', name: 'Residents' },
    { url: '/county?role=admin', icon: 'icon county', name: 'County' },
    { url: '/inspectors?role=admin', icon: 'icon inspector', name: 'Inspector' },
    { url: '/schools?role=admin', icon: 'icon school', name: 'Schools' },
    { url: '/clinics?role=admin', icon: 'icon clinic', name: 'Clinics' },
    { url: '/businesses?role=admin', icon: 'icon business', name: 'Businesses' },
    { url: '/flights?role=admin', icon: 'icon flight', name: 'Flights' },
    { url: '/ferry?role=admin', icon: 'icon ferry', name: 'Ferry' },
    { url: '/events?role=admin', icon: 'icon event', name: 'Events' },
    { url: '/adminchat?role=admin', icon: 'icon messages', name: 'Messages' },
];
let dashboardUrl='/dashboard?role=admin'

class Sidebar extends Component {

    constructor() {
        super();
        this.state = {
            style: "sidebar",
            menuStatus: "open"
        };
        this.handleClick = this.handleClick.bind(this);
    };




    handleClick() {

        switch (this.state.menuStatus) {
            case "open":
                this.setState({
                    menuStatus: "close",
                    style: "sidebar hidden"
                });
                break;
            case "close":
                this.setState({
                    menuStatus: "open",
                    style: "sidebar"
                });
                break;
        }
    }


    render() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let role = urlParams.getAll('role')[0];
        let loggedUser = JSON.parse(localStorage.getItem('userId'));
        if (role == "resident") {
            navLinks = [
                { url: '/schools?role=resident', icon: 'icon school', name: 'Schools' },
                { url: '/clinics?role=resident', icon: 'icon clinic', name: 'Clinics' },
                { url: '/businesses?role=resident', icon: 'icon business', name: 'Businesses' },
                { url: '/flights?role=resident', icon: 'icon flight', name: 'Flights' },
                { url: '/ferry?role=resident', icon: 'icon ferry', name: 'Ferry' },
                { url: '/events?role=resident', icon: 'icon event', name: 'Events' },
                { url: '/Reschat?role=resident', icon: 'icon messages', name: 'Messages' },
                { url: '/news/feed?role=resident', icon: 'icon messages', name: 'News Feed' },
                { url: '/classifieds?role=resident', icon: 'icon messages', name: 'Clasifieds' },
                { url: '/tips?role=resident', icon: 'icon messages', name: 'Tips' },
                { url: '/FAQ?role=resident', icon: 'icon messages', name: 'FAQ' },
            ];
            dashboardUrl='/dashboard?role=resident'
        } else if (role == "inspector") {
            navLinks = [
                { url: '/residents?role=inspector', icon: 'icon user-3', name: 'Residents' },
                { url: '/schools?role=inspector', icon: 'icon school', name: 'Schools' },
                { url: '/clinics?role=inspector', icon: 'icon clinic', name: 'Clinics' },
                { url: '/businesses?role=inspector', icon: 'icon business', name: 'Businesses' },
                { url: '/flights?role=inspector', icon: 'icon flight', name: 'Flights' },
                { url: '/ferry?role=inspector', icon: 'icon ferry', name: 'Ferry' },
                { url: '/events?role=inspector', icon: 'icon event', name: 'Events' },
                { url: '/inspectorchat?role=inspector', icon: 'icon messages', name: 'Messages' },
                { url: '/moveout?role=inspector', icon: 'icon inspector', name: 'Moveouts' },
            ];
            dashboardUrl='/dashboard?role=inspector'
        }
        return (
            <aside className={this.state.style}>
                <div class="">
                    <div class="sidebar-head">
                        <a href={dashboardUrl} class="logo-wrapper" title="Home">
                            <div class="logo-text">
                                <span class="logo-title">Siremar</span>
                                <span class="logo-subtitle">Dashboard</span>
                            </div>
                        </a>
                        <button class="sidebar-toggle transparent-btn" title="Menu" type="button" onClick={this.handleClick}>
                            <span class="icon menu-toggle"  ></span>
                        </button>
                    </div>
                    <div class="sidebar-body">
                        <div class="sidebar-body-menu">

                            <li>
                                <a class="active" href={dashboardUrl}><span class="icon home" aria-hidden="true"></span>Dashboard</a>
                            </li>
                  
                                {navLinks.map(({ url, icon, name }) => (
                                    <li>
                                        <a href={url}>
                                            <span class={icon} ></span>{name}

                                        </a>
                                    </li>
                                ))}
                       

                        </div>
                    </div>
                </div>
                <div class="sidebar-footer">
                    <a href="##" class="sidebar-user">
                        <span class="sidebar-user-img">

                        </span>
                        <div class="sidebar-user-info">
                            <span class="sidebar-user__title">{loggedUser.Name}</span>
                            {/* <span class="sidebar-user__subtitle">Admin</span> */}
                        </div>
                    </a>
                </div>
            </aside>

        )
    }
}


export default Sidebar;  