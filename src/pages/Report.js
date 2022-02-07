import React from 'react';
import SubNavbarMenu from "../component/SubNavbarMenu";
import AccountNavbar from "../component/AccountNavbar";
import PieChart from "./Report/PieChart";
import RadialBars from "./Report/RadialBars";
import Permission from "./Report/Permission";
import Priority from "./Report/Priority";
import Test from "./Report/Test";


const Report = () => {



    return (







            <div className='report'>
                <div className="all-tickets-navbar">

                    <div className="all-tickets-navbar-child">
                        <h1>Report</h1>
                        <AccountNavbar />
                    </div>
                </div>

                <SubNavbarMenu/>



                <div className="row">
                    <div className="col-md-4">
                        <div className="chart-pair">
                            <PieChart />
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="chart-pair-column">
                            {/*<ColumnChart/>*/}
                            <Test/>
                        </div>
                    </div>
                </div>




                <div className="row">
                    <div className="col-md-4">
                        <div className="radial-bars">
                            <RadialBars/>
                        </div>
                    </div>
                    <div className="col-md-3">

                        <Permission/>
                    </div>
                    <div className="col-md-5">
                        <Priority/>

                    </div>
                </div>
            </div>


    );
};

export default Report;