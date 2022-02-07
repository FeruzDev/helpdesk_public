import react, {Component, useEffect, useState} from 'react'
import ReactApexChart from 'react-apexcharts'
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import React from "react";
import ExportToExcel from "./ExportToExcel";


const Test = () => {
    const currYear = () => {
        var year = new Date().getFullYear();
        return year;
    }

    const [data, setData] = useState([])
    const fileName = "myfile"; // here enter filename for your excel file




    const [january, setjanuary] = useState(0)
    const [february, setfebruary] = useState(0)
    const [march, setmarch] = useState(0)
    const [april, setapril] = useState(0)
    const [may, setmay] = useState(0)
    const [june, setjune] = useState(0)
    const [july, setjuly] = useState(0)
    const [august, setaugust] = useState(0)
    const [september, setseptember] = useState(0)
    const [october, setoctober] = useState(0)
    const [november, setNovember] = useState(0)
    const [december, setdecember] = useState(0)


    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false,

        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],

        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
            title: {
                text: ''
            }
        },
        fill: {
            opacity: 1,
            colors: ['#003CFF', '#D96FF8']
        },
        dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
        },
        grid: {
            row: {
                colors: ['#fff']
            },
            column: {
                colors: ['#fff']
            }
        },

        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " ticket"
                }
            }
        }
    }


    const series = [{
        name: '',
        data: [
            january,
            february?.february,
            march?.march,
            april?.april,
            may?.may,
            june?.june,
            july?.july,
            august?.august,
            september?.september,
            october?.october,
            november,
            december?.december,

        ]
    },
    ]

    let totalValue;


    useEffect(() => {







        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-01-01' + '&end_date=' + currYear() + '-01-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setjanuary({january: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-02-01' + '&end_date=' + currYear() + '-02-28', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setfebruary({february: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-03-01' + '&end_date=' + currYear() + '-03-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setmarch({march: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-04-01' + '&end_date=' + currYear() + '-04-30', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setapril({april: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-05-01' + '&end_date=' + currYear() + '-05-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setmay({may: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-06-01' + '&end_date=' + currYear() + '-06-30', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setjune({june: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-07-01' + '&end_date=' + currYear() + '-07-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setjuly({july: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-08-01' + '&end_date=' + currYear() + '-08-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setaugust({august: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-09-01' + '&end_date=' + currYear() + '-09-30', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setseptember({september: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-10-01' + '&end_date=' + currYear() + '-10-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setoctober({october: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-12-01' + '&end_date=' + currYear() + '-12-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setdecember({december: res.data?.count})
            })
            .catch(err => {
                // console.log(err)
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + currYear() + '-11-01' + '&end_date=' + currYear() + '-11-30', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {


                // setState(state.november: res.data.count)
                setNovember(res.data?.count)
            })
            .catch(err => {
                // console.log(err)
            })


    }, [])


    totalValue = (january > 0 ? january : 0) + (february > 0 ? february : 0) +
        (march > 0 ? march : 0) + (april > 0 ? april : 0) + (may > 0 ? may : 0) +
        (june > 0 ? june : 0) + (july > 0 ? july : 0) + (august > 0 ? august : 0) +
        (september > 0 ? september : 0) + (october > 0 ? october : 0) + (november > 0 ? november : 0) +
        (december > 0 ? december : 0)


    return (
        <div id="chart">


            <h3 className="d-flex justify-content-between pr-5">


                <span> Tickets statistics</span>


             <span>
                    <span> Total: {totalValue}</span>
                    <ExportToExcel  apiData={data} fileName={fileName}/>
             </span>

            </h3>
            <ReactApexChart options={options} series={series} type="bar" height={350}/>
        </div>


    );

}

export default Test