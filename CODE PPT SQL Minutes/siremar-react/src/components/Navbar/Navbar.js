// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)



/* Developed by K S Pavan Krishna */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import "./Navbar.css"

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            menuStatus: "close",
        };
        this.handleClick = this.handleClick.bind(this);
        this.logout=this.logout.bind(this);
    };
    logout(){
        localStorage.removeItem("userId");
    }
    handleClick() {
        switch (this.state.menuStatus) {
            case "open":
                this.setState({
                    menuStatus: "close",
                    visible: true
                });
                break;
            case "close":
                this.setState({
                    menuStatus: "open",
                    visible: false
                });
                break;
        }
    }

    render() {
   
        return (

            <nav class="main-nav--bg">
                <div class=" main-nav">
                    <div class="main-nav-start">
                        <div class="search-wrapper">
                            <i data-feather="search" aria-hidden="true"></i>
                            <input type="text" placeholder="Enter keywords ..." required />
                        </div>
                    </div>
                    <div class="main-nav-end">
                        <button class="sidebar-toggle transparent-btn" title="Menu" type="button">

                            <span class="icon menu-toggle--gray" aria-hidden="true"></span>
                        </button>
                        <div class="nav-user-wrapper">
                            <button href="##" class="nav-user-btn dropdown-btn" title="My profile" type="button" onClick={this.handleClick}>
                                <span class="nav-user-img">
                                    Profile
                                </span>
                            </button>
                            <ul class="users-item-dropdown nav-user-dropdown dropdown" style={this.state.visible ? {} : { display: 'none' }}>
                                <li><a href="##">
                                    <i data-feather="user" aria-hidden="true"></i>
                                    <span>Profile</span>
                                </a></li>
                                <li><a href="##">
                                    <i data-feather="settings" aria-hidden="true"></i>
                                    <span>Account settings</span>
                                </a></li>
                                <li><a class="danger" href="/login" onClick={this.logout}>
                                    <i data-feather="log-out" aria-hidden="true"></i>
                                    <span>Log out</span>
                                </a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>

        );
    }
}

export default Navbar;