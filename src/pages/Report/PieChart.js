
import React, {  useMemo, useState} from 'react';
import ReactApexChart from 'react-apexcharts'
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {updateState} from "../../redux/action/TicketsAction";

const PieChart = () => {


    const [s1, setS1] = useState(0)
    const [s2, setS2] = useState(0)
    const [series, setseries] = useState([])
    const [s3, setS3] = useState(0)


    const op = useMemo(() => {

        axios.get(API_PATH + 'ticket/v1/list?status=Open' , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                setS1(res.data?.count)

            })
            .catch(err =>{

            })


        axios.get(API_PATH + 'ticket/v1/list?status=Closed' , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})


            .then(res =>{
                setS2(res.data?.count)
            })
            .catch(err =>{

            })



        axios.get(API_PATH + 'ticket/v1/list?status=Pending' , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})


            .then(res =>{
                setS3(res.data?.count)

            })
            .catch(err =>{

            })



    }, [ ])



    let totalValue



    const options = {
        chart: {
            width: 380,

        },
        labels: [' ' + s1 + ' - Open', ' ' + s2 +  ' - Pending', ' ' + s3 +  ' - Closed'],

        dataLabels: {
            enabled: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false
                }
            }
        }],
        legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
        }
    }



    //
    // axios.get(API_PATH + 'ticket/v1/list?status=Open' , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
    //
    //     .then(res =>{
    //         setS1(res.data?.count)
    //
    //     })
    //     .catch(err =>{
    //
    //     })




    return (
        <div>



            <div className="chart-wrap">
                <div id="chart" >
                    <h3 className="d-flex justify-content-between pb-5 ">

                        <span>Tickets status</span>

                        <span> Total: {s1 + s2 + s3}</span>
                    </h3>
                    <ReactApexChart className="pl-5" options={options} type="donut" series={[s1, s2, s3]} width={380}/>
                </div>
            </div>
        </div>
    );
};

export default PieChart;
