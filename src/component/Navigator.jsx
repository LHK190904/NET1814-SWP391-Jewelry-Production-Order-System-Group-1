import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navigator() {
    return (
        <div className="container-fluid bg-dark">
            <div className="row">
                <a className="navbar-brand col-lg-2 offset-lg-1" href="#Home">
                    <img src="./assets/images/logo.jpg" className="img-thumbnail" alt="Logo" />
                </a>
                <div className="col-lg-2"></div>
                <form className="form-inline mx-auto search-bar col-lg-2 align-self-center">
                    <input className="form-control mr-sm-2" type="search" placeholder="Tìm kiếm..." aria-label="Search" />
                </form>
                <div className="col-lg-3 align-self-center">
                    <div className="row">
                        <i className="bi bi-facebook social-icons" />
                        <i className="bi bi-instagram social-icons" />
                        <a href="#Cart">GIỎ HÀNG<i className="bi bi-cart3 social-icons" /></a>
                        {/* <i className="bi bi-cart3 social-icons" /> */}
                    </div>
                </div>
            </div>
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <div className="collapse navbar-collapse justify-content-evenly">
                            <ul className="navbar-nav">
                                <li className="nav-item"><a className="nav-link" href="#Home">TRANG CHỦ</a></li>
                                <li className="nav-item"><a className="nav-link" href="#About">THÔNG TIN</a></li>
                                <li className="nav-item"><a className="nav-link" href="#Design">THIẾT KẾ</a></li>
                                <li className="nav-item"><a className="nav-link" href="#Collection">BỘ SƯU TẬP</a></li>
                                <li className="nav-item"><a className="nav-link" href="#Blog">BLOG</a></li>
                                <li className="nav-item"><a className="nav-link" href="#Login">ĐĂNG NHẬP</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default Navigator