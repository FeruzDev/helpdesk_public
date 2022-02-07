import react, {Component} from 'react'
import ReactApexChart from 'react-apexcharts'
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";


class ColumnChart extends Component {
    currYear = () => {
        var year = new Date().getFullYear();
        return year;
    }





    constructor(props) {
        super(props);
        this.state = {

            january: [],
            february: [],
            march: [],
            april: [],
            may: [],
            june: [],
            july: [],
            august: [],
            september: [],
            october: [],
            november: [],
            december: [],

            series: [{
                name: 'Net Profit',
                data: [
                    this.state.january,
                    this.state.february,
                    this.state.march,
                    this.state.april,
                    this.state.may,
                    this.state.june,
                    this.state.july,
                    this.state.august,
                    this.state.september,
                    this.state.october,
                    this.state.november,
                    this.state.december,
                    2
                ]
            },
            ],
            options: {
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
                            return "$ " + val + " thousands"
                        }
                    }
                }
            },



        };
    }




    componentDidMount() {
        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '01-01' + '&end_date=' + this.currYear() + '-01-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({january: res.data.data?.length})
            })
            .catch(err => {
                
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '02-01' + '&end_date=' + this.currYear() + '-02-28', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({february: res.data.data?.length})
            })
            .catch(err => {
                
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '03-01' + '&end_date=' + this.currYear() + '-03-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({march: res.data.data?.length})
            })
            .catch(err => {
                
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '04-01' + '&end_date=' + this.currYear() + '-04-30', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({april: res.data.data?.length})
            })
            .catch(err => {
                
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '05-01' + '&end_date=' + this.currYear() + '-05-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({may: res.data.data?.length})
            })
            .catch(err => {
                
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '06-01' + '&end_date=' + this.currYear() + '-06-30', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({june: res.data.data?.length})
            })
            .catch(err => {
                
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '07-01' + '&end_date=' + this.currYear() + '-07-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({july: res.data.data?.length})
            })
            .catch(err => {
                
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '08-01' + '&end_date=' + this.currYear() + '-08-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({august: res.data.data?.length})
            })
            .catch(err => {
                
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '09-01' + '&end_date=' + this.currYear() + '-09-30', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({september: res.data.data?.length})
            })
            .catch(err => {
                
            })


        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '10-01' + '&end_date=' + this.currYear() + '-10-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({october: res.data.data?.length})
            })
            .catch(err => {
                
            })




        axios.get(API_PATH + 'ticket/v1/list?start_date=' + this.currYear() + '12-01' + '&end_date=' + this.currYear() + '-12-31', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                this.setState({december: res.data.data?.length})
            })
            .catch(err => {
                
            })


        axios.get("http://w1.citynet.uz:4440/ticket/v1/list?start_date=2021-11-01&end_date=2021-11-30", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {


                this.setState({november: res.data.data?.length})

            })
            .catch(err => {
                
            })


    }


    render() {
        return (
            <div id="chart">
 

                <h3>Tickets</h3>
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350}/>
            </div>


        );
    }
}

export default ColumnChart