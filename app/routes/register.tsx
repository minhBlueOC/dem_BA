import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/Button";

import "../styles/register.css";
import "../styles/Responsive/register.css";

export default function Register() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isEmailValid = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordMatch = (confirmPass: string): boolean => {
        return confirmPass.trim() === password;
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const input = event.target;
        const formErr = input.parentElement?.querySelector(".register-text") as HTMLElement | null;

        if (formErr) {
        if (input.type === "email") {
            formErr.style.opacity = isEmailValid(input.value.trim()) ? "0" : "1";
        } else if (input.name === "re-password") {
            const isMatch = isPasswordMatch(input.value);
            formErr.style.opacity = isMatch ? "0" : "1";
        } else {
            formErr.style.opacity = input.value.trim() ? "0" : "1";
        }
        }
    };


  return (
    <div className="register-wrapper">
      <div className="register-inner">
        <h1 className="register-title">Đăng ký</h1>

        <form action="" className="register-form">
          <div className="register-form__container">
            {/* Email */}
            <div className="register-group">
              <label htmlFor="email" className="register-label">Email</label>
              <input name="email" type="email" className="register-input" onBlur={handleBlur} />
              <span className="register-text">Email không hợp lệ</span>
            </div>

            {/* Tên người dùng */}
            <div className="register-group">
              <label htmlFor="name" className="register-label">Tên người dùng</label>
              <input name="name" type="text" className="register-input" onBlur={handleBlur} />
              <span className="register-text">Tên người dùng không được để trống!</span>
            </div>

            {/* Mật khẩu */}
            <div className="register-group">
              <label htmlFor="password" className="register-label">Mật khẩu</label>
              <input 
                name="password" 
                type="password" 
                className="register-input" 
                onBlur={handleBlur} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <span className="register-text">Mật khẩu không được để trống</span>
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="register-group">
              <label htmlFor="re-password" className="register-label">Nhập lại mật khẩu</label>
              <input 
                name="re-password" 
                type="password" 
                className="register-input" 
                onBlur={handleBlur} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
              <span className="register-text">Mật khẩu nhập lại không khớp!</span>
            </div>
          </div>

          <Button className="register-btn login-btn" type="submit" to="/login">Đăng ký</Button>

          <Link to="/login" className="register-btnSignUp">Đăng nhập</Link>
        </form>
      </div>
    </div>
  );
}
