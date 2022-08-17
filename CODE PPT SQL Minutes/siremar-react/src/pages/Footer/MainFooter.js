// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)


/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import './MainFooter.css';

class MainFooter extends Component {
    render() {
        return (
            <footer class="footer">
                <div class=" footer--flex">
                    <div class="footer-end">
                        <p><a href="/">SIREMAR</a></p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default MainFooter;