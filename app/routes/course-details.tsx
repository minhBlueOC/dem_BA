import { useEffect, useState } from "react";
import {  Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "~/components/Navbar";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Button from "~/components/Button";

import "../styles/course-details.css";
import "../styles/Responsive/course-details.css";
import PopUp from "~/components/PopUp";

interface UserInfo {
    maNguoiDung: string;
    email: string;
};

const mockCourseData = [
  {
    maChuongHoc: "CH001",
    tenChuongHoc: "Giới thiệu về khóa học",
    danhSachBaiHoc: [
      {
        maBaiHoc: "BH001",
        tenBaiHoc: "Lời khuyên trước khóa học",
        moTaBaiHoc: "Tổng quan về JavaScript và cách sử dụng.",
        // video: "https://www.youtube.com/embed/-jV06pqjUUc",
        maChuongHoc: "CH001"
      },
      {
        maBaiHoc: "BH002",
        tenBaiHoc: "Cài đặt môi trường",
        moTaBaiHoc: "Hướng dẫn thiết lập môi trường lập trình JS.",
        // video: "https://www.youtube.com/embed/efI98nT8Ffo",
        maChuongHoc: "CH001"
      }
    ]
  },
  {
    maChuongHoc: "CH002",
    tenChuongHoc: "Biến, comments, build-in",
    danhSachBaiHoc: [
      {
        maBaiHoc: "BH003",
        tenBaiHoc: "Sử dụng Javascript với HTML",
        moTaBaiHoc: "Cách sử dụng Javascript trong file HTML",
        // video: "https://www.youtube.com/embed/W0vEUmyvthQ",
        maChuongHoc: "CH002"
      },
      {
        maBaiHoc: "BH004",
        tenBaiHoc: "Khái niệm biến và cách sử dụng",
        moTaBaiHoc: "Cách khai báo các biến trong Javascript và cách sử dụng chúng",
        // video: "https://www.youtube.com/embed/CLbx37dqYEI",
        maChuongHoc: "CH002"
      },
      {
        maBaiHoc: "BH005",
        tenBaiHoc: "Comments trong Javascript",
        moTaBaiHoc: "Sử dụng comments trong Javascript",
        // video: "https://www.youtube.com/embed/xRpXBEq6TOY",
        maChuongHoc: "CH002"
      },
      {
        maBaiHoc: "BH006",
        tenBaiHoc: "Thuật ngữ Built-in",
        moTaBaiHoc: "Hàm Built-in trong Javascript",
        // video: "https://www.youtube.com/embed/rSV33HGotgE",
        maChuongHoc: "CH002"
      },
      {
        maBaiHoc: "BH007",
        tenBaiHoc: "Toán tử nối chuỗi",
        moTaBaiHoc: "Toán tử nối chuỗi",
        // video: "https://www.youtube.com/embed/QCLVU6cZU_E",
        maChuongHoc: "CH002"
      }
    ]
  },
  // ...
  {
    maChuongHoc: "CH011",
    tenChuongHoc: "Vòng lặp",
    danhSachBaiHoc: [
      {
        maBaiHoc: "BH034",
        tenBaiHoc: "Vòng lặp trong JavaScript",
        moTaBaiHoc: "Vòng lặp trong JavaScript | JavaScript Loop",
        // video: "https://www.youtube.com/embed/1zeMUJeBkeA",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH035",
        tenBaiHoc: "Vòng lặp For",
        moTaBaiHoc: "Vòng lặp For trong JavaScript | For loop",
        // video: "https://www.youtube.com/embed/tzaq2ay3Q0w",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH036",
        tenBaiHoc: "Vòng lặp For phần 2",
        moTaBaiHoc: "Vòng lặp For trong JavaScript | For loop phần 2",
        // video: "https://www.youtube.com/embed/L0a9ZgIEjW8",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH037",
        tenBaiHoc: "Vòng lặp For phần 3",
        moTaBaiHoc: "Vòng lặp For trong JavaScript | For loop phần 3",
        // video: "https://www.youtube.com/embed/LAlvupZV5iU",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH038",
        tenBaiHoc: "Vòng lặp For/in",
        moTaBaiHoc: "Vòng lặp For/in trong JavaScript | For...in loop",
        // video: "https://www.youtube.com/embed/stbbeMsgldc",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH039",
        tenBaiHoc: "Vòng lặp For/of",
        moTaBaiHoc: "Vòng lặp For/of trong JavaScript | For...of loop",
        // video: "https://www.youtube.com/embed/qhShGK5Y10U",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH040",
        tenBaiHoc: "Vòng lặp While",
        moTaBaiHoc: "Vòng lặp While trong JavaScript | JavaScript while loop",
        // video: "https://www.youtube.com/embed/rdH9Dm7IVxU",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH041",
        tenBaiHoc: "Vòng lặp Do/while",
        moTaBaiHoc: "Vòng lặp Do/while trong JavaScript | Do...while loop",
        // video: "https://www.youtube.com/embed/Or48jZzowUk",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH042",
        tenBaiHoc: "Break và Continue",
        moTaBaiHoc: "Break và Continue trong vòng lặp | JavaScript Break and Continue",
        // video: "https://www.youtube.com/embed/zSHt_S7W2a8",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH043",
        tenBaiHoc: "Vòng lặp lồng nhau",
        moTaBaiHoc: "Vòng lặp lồng nhau (Nested loop) | JavaScript nested loop",
        // video: "https://www.youtube.com/embed/hRaSotOvTjY",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH044",
        tenBaiHoc: "Ví dụ mở rộng về vòng lặp",
        moTaBaiHoc: "Ví dụ mở rộng về vòng lặp | JavaScript Loops",
        // video: "https://www.youtube.com/embed/MY-eJLzbSZc",
        maChuongHoc: "CH011"
      }
    ]
  },
  {
    maChuongHoc: "CH020",
    tenChuongHoc: "Tham khảo thêm",
    danhSachBaiHoc: [
      {
        maBaiHoc: "BH045",
        tenBaiHoc: "Polyfill là gì ?",
        moTaBaiHoc: "Polyfill là gì ?",
        // video: "https://www.youtube.com/embed/zFO-sSfReFs",
        maChuongHoc: "CH020"
      }
    ]
  }
];


export default function CourseDetails() {
    const navigate = useNavigate();

    const { maKhoaHoc } = useParams();
    const [tenKhoaHoc, setTenKhoaHoc] = useState("");
    const [moTaKhoaHoc, setMoTaKhoaHoc] = useState("");
    const [doKho, setDoKho] = useState("");
    const [giaBan, setGiaBan] = useState("");
    const [hinhAnh, setHinhAnh] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [soDu, setSoDu] = useState(0);
    
    // Accordion
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    // Hàm xử lý mở/đóng accordion
    const toggleAccordion = (index: number) => {
        setOpenIndexes((prevIndexes) =>
        prevIndexes.includes(index)
            ? prevIndexes.filter((i) => i !== index) // Nếu đã mở thì xóa khỏi danh sách (đóng lại)
            : [...prevIndexes, index] // Nếu chưa mở thì thêm vào danh sách (mở ra)
        );
    };

    // Lấy số dư của người dùng
    // const handleBalanceFromChild = (balance: number) => { setSoDu(balance); };

    // Đăng ký khóa học
    

    // Ẩn hiện popup
    const [isClosedPay, setIsClosedPay] = useState(true);
    const handleOpenPay = () => { 
        const userInfoStr = localStorage.getItem("userInfo");
        if (!userInfoStr) {
            navigate("/login");
            return;
        }
        setIsClosedPay(false)
    };
    const handleClosePay = () => { setIsClosedPay(true)};
    
    const [isClosedNoBalance, setIsClosedNoBalance] = useState(true);
    const handleOpenNoBalance = () => { setIsClosedNoBalance(false)};
    const handleCloseNoBalance = () => { setIsClosedNoBalance(true)};

    return (
        <div className="course-details__wrapper">
            <Navbar></Navbar>
            <Header
                
                title="Thông tin khóa học"></Header>
        
            <div className="course-details__inner">
                <div className="course-container">
                    <div className="course-info">
                        <h1 className="course-info__name">{tenKhoaHoc || "Javascriot cơ bản"}</h1>
                        <p className="course-info__desc">
                            {moTaKhoaHoc || "Khóa học giúp người dùng thành thạo Javascript căn bản"} 
                        </p>
                        
                        {/* Danh sách chương. bài học */}
                        <div className="course-accordion">
                            <h2 className="course-accordion__title">Nội dung khóa học</h2>
                            <div className="course-accordion__inner">
                                {mockCourseData.map((chuong, index) => (
                                    <div className="course-accordion__item" key={chuong.maChuongHoc}>
                                        <div className="course-accordion__head">
                                            <button type="button" className="course-accordion__lesson" onClick={() => toggleAccordion(index)}>
                                                {chuong.tenChuongHoc} 
                                            </button>
                                        </div>

                                        <div className={`course-accordion__content ${openIndexes.includes(index) ? "open" : ""}`}>
                                            <ul className="course-accordion__list">
                                                {chuong.danhSachBaiHoc.map((baiHoc) => (
                                                    <li key={baiHoc.maBaiHoc} className="course-accordion__list--item">
                                                        <Link to="" className="course-accordion__list--link">
                                                            {baiHoc.tenBaiHoc}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="course-video__thumb">
                        <iframe
                            className="course-video__iframe"
                            // src={firstLecture}
                            title="YouTube Video"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        >
                        </iframe>

                        <h3 className="course-details__cost">
                            {Number(giaBan) === 0 ? "Miễn phí" : `${Number(giaBan).toLocaleString("vi-VN")} VNĐ`}
                        </h3>

                        <Button
                            className="thumb-btn"
                            children="Đăng ký ngay"
                            type="button"
                            onClick={() => {
                                if (parseFloat(giaBan) <= 0) {
                                    console.log("Khoá học free");
                                    
                                } else {
                                    console.log("Khoá học mất tiền");
                                    handleOpenPay();
                                }
                            }}
                            />

                        <ul className="thumb-list">
                            <li className="thumb-item">
                                <img src="./icons/Code.svg" alt="" className="thumb-icon" />
                                <span>Độ khó: {doKho}</span>
                            </li>

                            <li className="thumb-item">
                                <img src="./icons/Article.svg" alt="" className="thumb-icon" />
                                <span>Tổng số 100 bài học</span>
                            </li>

                            <li className="thumb-item">
                                <img src="./icons/Clock.svg" alt="" className="thumb-icon" />
                                <span>Học mọi lúc mọi nơi</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
{/* 
            <PopUp 
                icon={"Question.svg"} 
                secondOption={"Hủy bỏ"} 
                title={"Thanh toán"} 
                desc={"Xác nhận thanh toán ?"} 
                onOpen={handleClosePay}
                isClosed={isClosedPay}
                className="popup-update"
                // timeCount={3}
            >
                <Button type="button">Thanh toán</Button>
            </PopUp>

            <PopUp 
                icon={"Question.svg"} 
                secondOption={"Hủy bỏ"} 
                title={"Thanh toán"} 
                desc={"Số dư không đủ, nạp tiền ?"} 
                onOpen={handleCloseNoBalance}
                isClosed={isClosedNoBalance}
                className="popup-update"
                // timeCount={3}
            > */}
                {/* <Button type="button" to="/payment">Nạp tiền</Button> */}
            {/* </PopUp> */}
            {/* <Footer></Footer> */}
        </div>
    );
}
