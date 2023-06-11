import "./nav_style.css";
import {NavLink, Routes, Route, Link } from "react-router-dom";
import search from "./nav_page/search/search_page.js";
import Trade from "./nav_page/blockchain_page/Trade_page.js";
import Login from "./nav_page/login/Login_page.js";
import money from"./nav_page/money/Money.js";
function Navbor(){
    return <>
    <header>
    <div class="container">
        <h1 class="logo">NKUST</h1>
    <nav class="navigation">
        <NavLink className="link" to="/search" activeClassName="active">查詢</NavLink>
        <NavLink className="link" to="/trade" activeClassName="active">交易</NavLink>
        <NavLink to="/login">
            <button className="btnLogin">登入</button>
        </NavLink>

    </nav>
    
    </div>
    </header>
    <div className="page">

    <Routes>
        <Route path="/search" Component={search}/>
        <Route path="/trade" Component={Trade}/>
        <Route path="/login" Component={Login}/>
        <Route path="/money"Component={money}/>
    </Routes>
    </div>
    </>
}
export default Navbor;