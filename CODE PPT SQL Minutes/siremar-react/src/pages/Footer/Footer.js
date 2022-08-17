// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)

/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import './Footer.css';
import ReactDOM from 'react-dom'

class Footer extends Component {
    render() {
        return (
            <footer class="footer">
                <div class=" footer--flex">

                    <div class="flex-container" >

                        {/* <p class="margin-left"> <a href="/dashboard?role=admin"
                            rel="noopener noreferrer">Admin Dashboard</a></p>
                        <p class="margin-left"> <a href="/dashboard?role=inspector"
                            rel="noopener noreferrer">Inspector Dashboard</a></p>
                        <p class="margin-left"> <a href="/dashboard?role=resident"
                            rel="noopener noreferrer">Resident Dashboard</a></p> */}
                    </div>
                    <div class="footer-end">
                        <p> <a href="/"
                            rel="noopener noreferrer">SIREMAR</a></p>

                    </div>
                    <p class="copyrights">
                        <a>© Copyright © 2022 Siremar, All Rights Reserved. A Site by Students   Privacy</a>
                    </p>
                    <ul class="footer-end">
                    </ul>
                </div>
            </footer>
        )
    }
}

export default Footer;