import { Link, useParams, useNavigate, useLocation  } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import LearningHeader from "~/components/Learning-header";
import Button from "~/components/Button";
import ChatBot from "~/components/ChatBot";

import "../styles/learning.css";
import "../styles/Responsive/learning.css";

export default function Learning() {
    const { maKhoaHoc } = useParams();

    const [chuongHocList, setChuongHocList] = useState<
        { maChuongHoc: string; tenChuongHoc: string; danhSachBaiHoc: any[] }[]
    >([]);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Accordion
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const [baiHoc, setBaiHoc] = useState<any>(null);

    // Câu hỏi
    const [listCauHoi, setListCauHoi] = useState<
        { maCauHoi: string; noiDung: string; danhSachDapAn: any[]} []
    >([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

    
    
    // Hàm xử lý mở/đóng accordion
    const toggleAccordion = (index: number) => {
        setOpenIndexes((prevIndexes) =>
        prevIndexes.includes(index)
            ? prevIndexes.filter((i) => i !== index) // Nếu đã mở thì xóa khỏi danh sách (đóng lại)
            : [...prevIndexes, index] // Nếu chưa mở thì thêm vào danh sách (mở ra)
        );
    };

    // Đóng mở chat AI
    const handleOpenChat = () => setIsChatOpen(true);
    const handleCloseChat = () => setIsChatOpen(false);

    // Đóng mở sidebar (mobile)
    const handleOpenMenu = () => setIsSidebarOpen(true); 
    const handleCloseMenu = () => setIsSidebarOpen(false); 

    

    
        
    return (
        <div className="learning-wrapper">
            <LearningHeader title="Học bài" className="learning-header"></LearningHeader>
            
            {/* Nội dung bài học */}
            <div className="learning-inner">
                <div className="learning-container">
                    {/* Video */}
                    {baiHoc && (
                        <>
                            <iframe
                                className="learning-iframe"
                                src={baiHoc ? baiHoc.video : "Đang tải video bài học ..."}
                                title="YouTube Video"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            >
                            </iframe>

                            <h2 className="learning-name">{baiHoc.tenBaiHoc}</h2>
                            <p className="learning-desc">{baiHoc.moTaBaiHoc}</p>
                        </>
                    )}

                    {/* Câu hỏi ôn tập */}
                    <div className="learning-listQuesion">
                        <h2 className="learning-title">Câu hỏi ôn tập</h2>
                        { isLoadingQuestions ? (
                            <p>Đang tải câu hỏi</p>
                        ) : (
                            listCauHoi.map((cauHoi, index) => (
                                <div className="listQuesion-item" key={cauHoi.maCauHoi}>
                                    <p className="listQuesion-item__ques">
                                    <strong>Câu {index + 1}: {cauHoi.noiDung}</strong>
                                    </p>
                                    <ul>
                                        {cauHoi.danhSachDapAn.map((dapAn) => {
                                            const isCorrect =
                                                typeof dapAn.laDapAnDung === 'object' &&
                                                Array.isArray(dapAn.laDapAnDung.data)
                                                    ? dapAn.laDapAnDung.data[0] === 1
                                                    : dapAn.laDapAnDung === 1;
        
                                            return (
                                                <li
                                                key={dapAn.maDapAn}
                                                className={`listQuesion-item__result
                                                `}
                                                >
                                                    <input
                                                        className={`listQuesion-item__input
                                                        `}
                                                        type="radio"
                                                        name={`cauHoi-${index}`}
                                                        id={dapAn.maDapAn}
                                                        
                                                    />
                                                    <label className="listQuesion-item__label" htmlFor={dapAn.maDapAn}>
                                                        {dapAn.noiDungDapAn}
                                                    </label>
                                                </li>
                                            );
                                        })}
        
                                    </ul>
                                </div>
                            ))
                        )}

                    </div>

                </div>


                {/* Side bar */}
                <div className="learning-sidebar ">
                    <div className="learning-accordion">
                        <div className="learning-accordion__inner">
                            {chuongHocList.map((chuong, index) => {
                                const isOpen = openIndexes.includes(index);

                                return (
                                    <div className="learning-accordion__item" key={chuong.maChuongHoc}>
                                    <div className="learning-accordion__head">
                                        <button
                                        type="button"
                                        className="learning-accordion__lesson"
                                        onClick={() => toggleAccordion(index)}
                                        >
                                        {index + 1}. {chuong.tenChuongHoc}
                                        </button>

                                        <svg
                                            onClick={() => toggleAccordion(index)}
                                            className={`learning-accordion__icon ${isOpen ? 'rotate' : ''}`}
                                            width="24px"
                                            height="24px"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512"
                                        >
                                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                                        </svg>
                                    </div>

                                    <div className={`learning-accordion__content ${isOpen ? 'open' : ''}`}>
                                        <ul className="learning-accordion__list">
                                        {chuong.danhSachBaiHoc.map((baiHoc, baiIndex) => (
                                            <li
                                                key={baiHoc.maBaiHoc}
                                                className="learning-accordion__list--item"
                                            >
                                                <svg 
                                                    className="learning-accordion__list--icon"
                                                    width="16px"
                                                    height="16px"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    viewBox="0 0 512 512">
                                                <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
                                            </svg>
                                                <button
                                                   
                                                    className="learning-accordion__list--btn"
                                                >
                                                    {index + 1}.{baiIndex + 1} {baiHoc.tenBaiHoc}
                                                    <span
                                                    className={`learning-accordion__check ${
                                                        baiHoc.daHoanThanh?.data?.[0] === 1
                                                        ? 'check-done'
                                                        : 'check-not__done'
                                                    }`}
                                                    >
                                                    <img src="/icons/Check-white.svg" alt="" />
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                    </div>
                                );
                                })}

                        </div>
                    </div>
                </div>

                {/* Side bar mobile*/}
                <div className={`learning-sidebar__mobile ${isSidebarOpen ? 'open' : ''}`}>
                    <div className="learning-sidebar__act">
                        <button onClick={handleCloseMenu} className="learning-sidebar__btn">
                            <img className="learning-sidebar__icon" src="/icons/Arrow-left.svg" alt="" />
                        </button>
                    </div>
                    <div className="learning-accordion">
                        <div className="learning-accordion__inner">
                            {chuongHocList.map((chuong, index) => (
                            <div className="learning-accordion__item" key={chuong.maChuongHoc}>
                                <div className="learning-accordion__head">
                                    <button type="button" className="learning-accordion__lesson" onClick={() => toggleAccordion(index)}>
                                        {index + 1}. {chuong.tenChuongHoc} 
                                    </button>
                                </div>

                                <div className={`learning-accordion__content ${openIndexes.includes(index) ? "open" : ""}`}>
                                    <ul className="learning-accordion__list">
                                        {chuong.danhSachBaiHoc.map((baiHoc, baiIndex) => (
                                            <li key={baiHoc.maBaiHoc} className="learning-accordion__list--item">
                                                <button
                                                    onClick={async () => {
                                                        await handleCloseMenu()
                                                    }}
                                                    className="learning-accordion__list--btn"
                                                >
                                                    {index + 1}.{baiIndex + 1} {baiHoc.tenBaiHoc}
                                                    <span className={`learning-accordion__check ${baiHoc.daHoanThanh?.data?.[0] === 1 ? 'check-done' : 'check-not__done'}`}>
                                                        <img src="/icons/Check-white.svg" alt="" />
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="learning-action">
                <div className="learning-action__discussion">
                    <Button onClick={handleOpenChat} className="learning-action__button--AI" type="button">AI</Button>

                    <button className="learning-action__button">
                        <img className="learning-action__icon" src="/icons/Question.svg" alt="" />
                    </button>

                    <button onClick={handleOpenMenu} className="learning-action__button learning-action__menu">
                        <img className="learning-action__icon" src="/icons/menu.svg" alt="" />
                    </button>
                </div>

                <div className="learning-action__timeline">
                    <Button  type="button" className="button-secondary learning-action__btn">BÀI TRƯỚC</Button>
                    <Button type="button" className="learning-action__btn">BÀI TIẾP THEO</Button>
                </div>

                <div className="learning-action__lesson">
                    <svg 
                        className="learning-action__lesson--icon"
                        width="16px"
                        height="16px"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 512 512">
                        <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                    </svg>
                    <span className="">{"30s"}</span>
                </div>
            </div>

            <ChatBot className="learning-chatbot" isOpen={isChatOpen} onClose={handleCloseChat} ></ChatBot>
        </div>
    );
}
