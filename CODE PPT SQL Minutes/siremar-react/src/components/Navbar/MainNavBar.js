// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)


/* Developed by K S Pavan Krishna */
import React, { useState, useEffect, Component } from 'react';
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import { backgroundColors } from "../../contexts/BackgroundColorContext";
import Badge from 'react-bootstrap/Badge'
import axios from 'axios';
import "./MainNavBar.css"

function MainNavBar() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode')?localStorage.getItem('darkMode'):"dark");
    const setMode = (changeTheme) => {
        if (darkMode == "dark") {
            localStorage.setItem('darkMode', "light")
            setDarkMode("light")
            changeTheme("light")

        } else {
            localStorage.setItem('darkMode', "dark")
            setDarkMode("dark")
            changeTheme("dark")
        }
    }
    return (
        <nav class="navbar">
            <div class="navbar-content">
                <a href="#">
                </a>
                <a data-toggle="toggle-nav" data-target="#nav-items" href="#"
                >
                </a>
            </div>
            {/* Menus on the main website */}
            {/* Blogs will be developed in next phase */}
            <div id="nav-items" class="navbar-menu">
                <a href="/#home" class="navbar-menu-item">Home</a>
                <a href="/#about" class="navbar-menu-item">About</a>
                <a href="/#services" class="navbar-menu-item">Services</a>
                <a href="https://ngg1756.uta.cloud/blog/siremar/" class="navbar-menu-item">Blog</a>
                <a href="/#contact-us" class="navbar-menu-item">Contact</a>
                <a href="/login" class="navbar-menu-item">Login</a>
                <a href="/register" class="navbar-menu-item">Register</a>








                <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                        <>


                            <div class="theme">
                                <input type="checkbox" id="theme-toggle"
                                    defaultChecked={darkMode == "dark" ? false : true}
                                    onClick={() => setMode(changeTheme)} />
                                <label for="theme-toggle"></label>
                            </div>
                        </>
                    )}
                </ThemeContext.Consumer>

            </div>
        </nav>
    )

}

export default MainNavBar;