
import { useEffect, useState } from "react";
import {  Link, useParams, useNavigate } from "react-router-dom";
import Button from "~/components/Button";

import "../styles/login.css";
import "../styles/Responsive/login.css";

export default function Login() {
    const navigate = useNavigate(); 

    const isEmailValid = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
      
    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const input = event.target;
        const formErr = input.parentElement?.querySelector(".login-text") as HTMLElement | null;
      
        if (formErr) {
            if (input.name === "email") {
                formErr.style.opacity = isEmailValid(input.value.trim()) ? "0" : "1";
            } else {
                formErr.style.opacity = input.value.trim() ? "0" : "1";
            }
        }
    };

    return (
        <div className="login-wrapper">
        
            <div className="login-inner">
                <h1 className="login-title">Đăng nhập</h1>

                <form action="" className="login-form">
                    {/* Email */}
                    <div className="login-group">
                        <label htmlFor="email" className="login-label">Email</label>
                        <input name="email" type="text" className="login-input" onBlur={handleBlur}/>
                        <span className="login-text">Email không hợp lệ</span>
                    </div>
                    {/* Mật khẩu */}
                    <div className="login-group">
                        <label htmlFor="password" className="login-label">Mật khẩu</label>
                        <input name="password" type="password" className="login-input" onBlur={handleBlur}/>
                        <span className="login-text">Mật khẩu không được để trống</span>
                    </div>

                    <Button className="login-btn" type="submit" to="">Đăng nhập</Button>
                    <Button
                        className="login-btn login-google">
                        <img className="login-icon" src="./icons/Google.svg" alt="" />
                        Đăng nhập bằng Google
                    </Button>

                    <Link to="/register" className="login-btnSignUp">Đăng ký</Link>
                </form>
            </div>
        </div>
    );
}
