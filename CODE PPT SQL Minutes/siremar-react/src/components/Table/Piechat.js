// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)



/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import "./Piechart.css";



class Piechart extends Component {

    render() {
        let items = this.props.dataList;
        const itemNotInvolved = parseFloat(this.props.totalItems) - parseFloat(this.props.totalItemsInChart);
        const itemNotInvolvedPercentage = (itemNotInvolved / parseFloat(this.props.totalItems)) * 100;
        let color = "conic-gradient(var(--color-gray) " + itemNotInvolvedPercentage + "%,";
        let previousItemPercentage = (itemNotInvolvedPercentage) + "%";
        for (let i = 0; i < items.length; i++) {
            let newItemPercentage = ((parseFloat(items[i].no) / parseFloat(this.props.totalItems)) * 100);
            if (i == (items.length) - 1) {
                color = color + " " + items[i].color + " " + "0%" + " " +(newItemPercentage).toString() + "%)";
            } else {
                color = color + " " + items[i].color + " " + "0%" + " " + (newItemPercentage).toString() + "%,";
            }
            previousItemPercentage = newItemPercentage;


        }
        let style = {
            background: color
        }


        return (
            <div>
                <div id="pie-chart-container">
                    <div id="pie-chart" style={style}></div>
                    <div id="legenda">
                        {this.props.dataList.map((item) => (
                            <div class="entry">
                                <div style={{ backgroundColor: item.color }} class="entry-color"></div>
                                <div class="entry-text">{item.Name}</div>
                            </div>
                        ))}
                        <div class="entry">
                            <div id="color-gray" class="entry-color"></div>
                            <div class="entry-text">{this.props.message}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Piechart;