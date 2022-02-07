import React, {useState} from 'react';

import {Link, NavLink} from "react-router-dom";

const SideBar = () => {


    return (


        <div className="side-bar">
          <div className="left-colums">

               <NavLink to='/tickets' className="side-bar-imgs  " activeClassName="active-link">

                   <img src="/img/side-bar-first.png"   alt="side-bar"/>
                </NavLink>

              <NavLink to='/agents' className="side-bar-imgs" activeClassName="active-link">

           <img src="/img/side-bar-second.png"     alt="side-bar"/>

              </NavLink>
              <NavLink to='/report' className="side-bar-imgs" activeClassName="active-link">

                <img src="/img/side-bar-thrid.png" alt="side-bar"/>

              </NavLink>
          </div>




        </div>
    );
};

export default SideBar;