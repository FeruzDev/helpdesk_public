import react, {Component, useEffect, useMemo} from 'react'
import ReactApexChart from 'react-apexcharts'
import {connect} from "react-redux";
import {prHigh, prLow, prMedium, prUrgent, prVeryLow} from "../../redux/action/TicketsAction";

import React from 'react';

const RadialBars = (props) => {

    const totalValue = props.UrgentCount + props.HighCount   +  props.MediumCount + props.LowCount + props.VeryLowCount



        const   series = [
                props.UrgentCount,
                props.HighCount,
                props.MediumCount,
                props.LowCount,
                props.VeryLowCount,
            ]


    const  options = {
        chart: {
            height: 280,
            type: 'radialBar',
        },
        labels: ['Urgent', 'High', 'Medium', 'Low', 'Very low'],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: false,
                        label: 'Total',
                        formatter: function () {
                            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                            return totalValue
                        }
                    }
                }
            }
        },

    }



    useEffect(()=> {
        props.prUrgent()
        props.prHigh()
        props.prMedium()
        props.prLow()
        props.prVeryLow()


    }, )



    return (

        <div className="my-radial-bars  ">
            <div id="chart">


                <h3 className="d-flex justify-content-between">
                    <span>Tickets priority</span>
                    <span> Total: {totalValue}</span>
                </h3>
             <div className="bar-part">
                 <ReactApexChart options={options} series={series} type="radialBar" className ={{ width:'80%'}} height={280} />


             </div>


            </div>

            <ul className="counts">
                <li> <span>{ props.UrgentCount}</span> <span> - Urgent</span></li>
                <li> <span>{ props.HighCount}</span> <span> - High</span></li>
                <li> <span>{ props.MediumCount}</span> <span> - Medium</span></li>
                <li> <span>{ props.LowCount}</span> <span> - Low</span></li>
                <li> <span>{ props.VeryLowCount}</span> <span> - Very low</span></li>

            </ul>

        </div>


    )
}


    const mapStateToProps =(state)=> {
        return {

            UrgentCount: state.ticketData.UrgentCount,
            HighCount: state.ticketData.HighCount,
            MediumCount: state.ticketData.MediumCount,
            LowCount: state.ticketData.LowCount,
            VeryLowCount: state.ticketData.VeryLowCount,
        }
    }




export default connect(mapStateToProps, {prVeryLow, prLow, prMedium, prHigh, prUrgent})(RadialBars);