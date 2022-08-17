// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)


/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import "../../pages/County/CountyList.css"

class Graph extends Component {
    render() {
        return (
            <div class="graph-container">

                <div class="box">

                    <div class="skill">

                        <div class="graph" style={{ height: "20%" }}>
                            <div class="percent">
                                20%
                            </div>
                        </div>
                        <div class="name">2020</div>


                    </div>

                    <div class="skill">
                        <div class="graph" style={{ height: "30%" }}>
                            <div class="percent">
                                30%
                            </div>
                        </div>
                        <div class="name">2021</div>


                    </div>

                    <div class="skill">
                        <div class="graph" style={{ height: "50%" }}>
                            <div class="percent">
                                50%
                            </div>
                        </div>
                        <div class="name">2022</div>


                    </div>
                </div>
            </div>
        );
    }
}

export default Graph;