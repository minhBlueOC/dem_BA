import { useEffect, useState } from "react";
import {  Link, useParams, useNavigate } from "react-router-dom";
import Header from "~/components/Header";
import AdminNav from "~/components/Admin/AdminNav";
import Button from "~/components/Button";
import PopUp from "~/components/PopUp";


import "../styles/Admin/add-course.css";
import "../styles/Admin/adm-course-details.css";

const mockCourseData = [
  {
    maChuongHoc: "CH001",
    tenChuongHoc: "Giới thiệu về khóa học",
    danhSachBaiHoc: [
      {
        maBaiHoc: "BH001",
        tenBaiHoc: "Lời khuyên trước khóa học",
        moTaBaiHoc: "Tổng quan về JavaScript và cách sử dụng.",
        daHoanThanh: {
            type: "Buffer",
            data: [1], // hoặc [0] nếu chưa hoàn thành
        },
        // video: "https://www.youtube.com/embed/-jV06pqjUUc",
        maChuongHoc: "CH001"
      },
      {
        maBaiHoc: "BH002",
        tenBaiHoc: "Cài đặt môi trường",
        moTaBaiHoc: "Hướng dẫn thiết lập môi trường lập trình JS.",
        daHoanThanh: {
            type: "Buffer",
            data: [1], // hoặc [0] nếu chưa hoàn thành
        },
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
        daHoanThanh: {
            type: "Buffer",
            data: [1], // hoặc [0] nếu chưa hoàn thành
        },
        // video: "https://www.youtube.com/embed/W0vEUmyvthQ",
        maChuongHoc: "CH002"
      },
      {
        maBaiHoc: "BH004",
        tenBaiHoc: "Khái niệm biến và cách sử dụng",
        moTaBaiHoc: "Cách khai báo các biến trong Javascript và cách sử dụng chúng",
        daHoanThanh: {
            type: "Buffer",
            data: [1], // hoặc [0] nếu chưa hoàn thành
        },
        // video: "https://www.youtube.com/embed/CLbx37dqYEI",
        maChuongHoc: "CH002"
      },
      {
        maBaiHoc: "BH005",
        tenBaiHoc: "Comments trong Javascript",
        moTaBaiHoc: "Sử dụng comments trong Javascript",
        daHoanThanh: {
            type: "Buffer",
            data: [1], // hoặc [0] nếu chưa hoàn thành
        },
        // video: "https://www.youtube.com/embed/xRpXBEq6TOY",
        maChuongHoc: "CH002"
      },
      {
        maBaiHoc: "BH006",
        tenBaiHoc: "Thuật ngữ Built-in",
        moTaBaiHoc: "Hàm Built-in trong Javascript",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/rSV33HGotgE",
        maChuongHoc: "CH002"
      },
      {
        maBaiHoc: "BH007",
        tenBaiHoc: "Toán tử nối chuỗi",
        moTaBaiHoc: "Toán tử nối chuỗi",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
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
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/1zeMUJeBkeA",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH035",
        tenBaiHoc: "Vòng lặp For",
        moTaBaiHoc: "Vòng lặp For trong JavaScript | For loop",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/tzaq2ay3Q0w",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH036",
        tenBaiHoc: "Vòng lặp For phần 2",
        moTaBaiHoc: "Vòng lặp For trong JavaScript | For loop phần 2",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/L0a9ZgIEjW8",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH037",
        tenBaiHoc: "Vòng lặp For phần 3",
        moTaBaiHoc: "Vòng lặp For trong JavaScript | For loop phần 3",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/LAlvupZV5iU",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH038",
        tenBaiHoc: "Vòng lặp For/in",
        moTaBaiHoc: "Vòng lặp For/in trong JavaScript | For...in loop",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/stbbeMsgldc",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH039",
        tenBaiHoc: "Vòng lặp For/of",
        moTaBaiHoc: "Vòng lặp For/of trong JavaScript | For...of loop",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/qhShGK5Y10U",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH040",
        tenBaiHoc: "Vòng lặp While",
        moTaBaiHoc: "Vòng lặp While trong JavaScript | JavaScript while loop",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/rdH9Dm7IVxU",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH041",
        tenBaiHoc: "Vòng lặp Do/while",
        moTaBaiHoc: "Vòng lặp Do/while trong JavaScript | Do...while loop",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/Or48jZzowUk",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH042",
        tenBaiHoc: "Break và Continue",
        moTaBaiHoc: "Break và Continue trong vòng lặp | JavaScript Break and Continue",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/zSHt_S7W2a8",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH043",
        tenBaiHoc: "Vòng lặp lồng nhau",
        moTaBaiHoc: "Vòng lặp lồng nhau (Nested loop) | JavaScript nested loop",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/hRaSotOvTjY",
        maChuongHoc: "CH011"
      },
      {
        maBaiHoc: "BH044",
        tenBaiHoc: "Ví dụ mở rộng về vòng lặp",
        moTaBaiHoc: "Ví dụ mở rộng về vòng lặp | JavaScript Loops",
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
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
        daHoanThanh: {
  type: "Buffer",
  data: [1], // hoặc [0] nếu chưa hoàn thành
},
        // video: "https://www.youtube.com/embed/zFO-sSfReFs",
        maChuongHoc: "CH020"
      }
    ]
  }
];

export default function AdminCourseDetails() {
    const navigate = useNavigate();

    // Ẩn hiện PopUp
    const [isClosedUpdate, setIsClosedUpdate] = useState(true);
    const handleOpenUpdate = () => { setIsClosedUpdate(false)};
    const handleCloseUpdate = () => { setIsClosedUpdate(true)};

    const [isClosedUpdateDone, setIsClosedUpdateDone] = useState(true);
    const handleOpenUpdateDone = () => { setIsClosedUpdateDone(false)};
    const handleCloseUpdateDone = () => { setIsClosedUpdateDone(true)};

    const [isClosedDelete, setIsClosedDelete] = useState(true);
    const handleOpenDelete = () => { setIsClosedDelete(false)};
    const handleCloseDelete = () => { setIsClosedDelete(true)};

    const [isClosedDeleteDone, setIsClosedDeleteDone] = useState(true);
    const handleOpenDeleteDone = () => { setIsClosedDeleteDone(false)};
    const handleCloseDeleteDone = () => { setIsClosedDeleteDone(true)};

    const [isClosedCheck, setIsClosedCheck] = useState(true);
    const handleOpenCheck = () => { setIsClosedCheck(false)};
    const handleCloseCheck = () => { setIsClosedCheck(true)};
    

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

  const [imagePreview, setImagePreview] = useState("./images/javascript_course.png");

  return (
    <div className="update-course__wrapper">
      <Header className="header-admin" title="Thông tin khóa học" />
      <AdminNav />
      {/* Inner */}
      <div className="update-course__inner">
        <form  className="course__form">
          <div className="form-inner">
            <div className="form-info">
              <div className="form-group">
                <label className="form-label">Mã khóa học</label>
                <input name="ID" type="text" className="form-input input-readOnly" readOnly value={"KH001"} />
              </div>
              <div className="form-group">
                <label className="form-label">Tên khóa học</label>
                <input name="name" type="text" className="form-input" required value={"Javascript cơ bản"}  />
              </div>
              <div className="form-group group-area">
                <label className="form-label label-area">Mô tả</label>
                <textarea name="desc" className="form-input form-area" required value={"Javascript cơ bản cho người mới bắt đầu"}></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Độ khó</label>
                <select name="level" className="form-input form-select" value={"Dễ"}>
                  <option value="">-- Chọn độ khó --</option>
                  <option value="Dễ">Dễ</option>
                  <option value="Trung bình">Trung bình</option>
                  <option value="Khó">Khó</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Giá bán</label>
                <input name="price" type="number" className="form-input" required value={100000} />
              </div>
            </div>
            <div className="form-group group-image">
              <div className="course_thumb">
                <label htmlFor="upload-thumb" className="thumb-box">
                  {imagePreview && <img src={imagePreview} alt="Ảnh xem trước" className="thumb-preview" />}
                </label>
                <label htmlFor="upload-thumb" className="custom-thumb-btn">Chọn ảnh</label>
                <input type="file" accept="image/*" id="upload-thumb" name="file" className="thumb-input"/>
              </div>
            </div>
          </div>

          <PopUp 
            icon={"Question.svg"} 
            secondOption={"Hủy bỏ"} 
            title={"Sửa khóa học"} 
            desc={"Bạn có chắc chắn muốn sửa khóa học không?"} 
            onOpen={handleCloseUpdate}
            isClosed={isClosedUpdate}
            className="popup-update"
            // timeCount={3}
          >
            <Button type="submit">Sửa</Button>
          </PopUp>

          <div className="accordion">
            <h2 className="accordion-title">Nội dung khóa học</h2>
            {/* Nội dung accordion */}
            <div className="accordion-inner">
              {mockCourseData.map((chuong, index) => (
                  <div className="accordion-item" key={chuong.maChuongHoc}>
                      <div className="accordion-head">
                        <button type="button" className="accordion-lesson" onClick={() => toggleAccordion(index)}>
                          {chuong.tenChuongHoc} 
                        </button>
                        <Button to={`/admin-lesson-details/${chuong.maChuongHoc}`} type="button" className=" button-third accordion-btn">
                          <img className="accordion-icon" src="../icons/Update.svg" alt="" />
                        </Button>
                      </div>

                      <div className={`accordion-content ${openIndexes.includes(index) ? "open" : ""}`}>
                        <ul className="accordion-list">
                            {chuong.danhSachBaiHoc.map((baiHoc) => (
                                <li key={baiHoc.maBaiHoc} className="accordion-list_item">
                                  <Link to={`/admin-lecture-details/${baiHoc.maBaiHoc}`} className="accordion-list__link">
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

        </form>
      </div>

      <div className="form-action update-form__action">
        <Button type="button" className="btn-save" onClick={handleOpenUpdate}>Lưu lại</Button>
        <Button type="button" className="btn-new button-secondary button">Làm mới</Button>
        <Button className="btn-cancel button-third button" onClick={handleOpenDelete}>Xóa khóa học</Button>
      </div>


      <PopUp 
        icon={"Question.svg"} 
        secondOption={"Hủy bỏ"} 
        title={"Xóa khóa học"} 
        desc={"Bạn có chắc chắn muốn xóa khóa học không?"} 
        onOpen={handleCloseDelete}
        isClosed={isClosedDelete}
        className="popup-delete"
        timeCount={5}
      >
        <Button type="submit" className="popup-delete_btn">Xóa</Button>
      </PopUp>

      <PopUp 
        icon={"Successful.svg"} 
        // secondOption={"Hủy bỏ"} 
        title={"Sửa khóa học"} 
        desc={"Cập nhật thông tin khóa học thành công!"} 
        onOpen={handleCloseUpdateDone}
        isClosed={isClosedUpdateDone}
        className="popup-done"
        // timeCount={5}
      >
        {/* <Button type="button" onClick={handleCloseUpdateDone}>OK</Button> */}
      </PopUp>

      <PopUp 
        icon={"Successful.svg"} 
        // secondOption={"Hủy bỏ"} 
        title={"Xóa khóa học"} 
        desc={"Xóa thông tin khóa học thành công!"} 
        onOpen={handleCloseDeleteDone}
        isClosed={isClosedDeleteDone}
        className="popup-done"
        // timeCount={5}
      >
        {/* <Button type="button" onClick={handleCloseUpdateDone}>OK</Button> */}
      </PopUp>

      <PopUp 
        icon={"Exclamation.svg"} 
        // secondOption={"Hủy bỏ"} 
        title={"Xóa khóa học"} 
        desc={"Khoá học đang có học viên!"} 
        onOpen={handleCloseCheck}
        isClosed={isClosedCheck}
        className="popup-delete"
        // timeCount={5}
      >
        {/* <Button type="button" onClick={handleCloseUpdateDone}>OK</Button> */}
      </PopUp>
    </div>
  );
}
