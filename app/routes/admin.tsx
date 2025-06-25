import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "~/components/Header";
import AdminNav from "~/components/Admin/AdminNav";
import AdminCourse from "~/components/Admin/Course";
import SearchEngine from "~/components/Search-engine";
import Pagination from "~/components/Pagination";

import type {courses} from "../types/courses";

import "../styles/Admin/admin.css";
import "../styles/Admin/admin_course.css";

const khoaHocMockData = [
  {
    maKhoaHoc: "KH001",
    tenKhoaHoc: "Javascript Pro",
    moTaKhoaHoc: "Khóa học JavaScript Cơ Bản giúp bạn làm quen và nắm vững nền tảng ngôn ngữ lập trình JavaScript – công cụ không thể thiếu trong phát triển web hiện đại. Thông qua các bài học trực quan, bạn sẽ từng bước hiểu được cách JavaScript hoạt động, cách viết mã hiệu quả và áp dụng vào các dự án thực tế.",
    hinhAnh: "./images/javascript_course.png",
    giaBan: "500000.00",
    doKho: "Dễ",
    tongSoBaiHoc: 45,
    soLuongDangKy: 2,
    maGiangVien: "ND001",
    tenNguoiDung: "MLearning",
    anhDaiDien: "http://localhost:1000/uploads/defaultAvatar.png"
  },
  {
    maKhoaHoc: "KH002",
    tenKhoaHoc: "HTML - CSS Pro",
    moTaKhoaHoc: "Xây dụng websites tĩnh với HTML và CSS cơ bản",
    hinhAnh: "./images/HTML_CSS.png",
    giaBan: "200000.00",
    doKho: "Dễ",
    tongSoBaiHoc: 0,
    soLuongDangKy: 0,
    maGiangVien: "ND001",
    tenNguoiDung: "MLearning",
    anhDaiDien: "http://localhost:1000/uploads/defaultAvatar.png"
  },
  {
    maKhoaHoc: "KH003",
    tenKhoaHoc: "Ngôn ngữ Sass",
    moTaKhoaHoc: "Học về ngôn ngữ Sass cơ bản",
    hinhAnh: "./images/HTML_CSS.png",
    giaBan: "100000.00",
    doKho: "Trung bình",
    tongSoBaiHoc: 7,
    soLuongDangKy: 1,
    maGiangVien: "ND001",
    tenNguoiDung: "MLearning",
    anhDaiDien: "http://localhost:1000/uploads/defaultAvatar.png"
  },
  {
    maKhoaHoc: "KH004",
    tenKhoaHoc: "Node.js",
    moTaKhoaHoc: "Học về Node.js cơ bản",
    hinhAnh: "./images/Nodejs.png",
    giaBan: "300000.00",
    doKho: "Trung bình",
    tongSoBaiHoc: 35,
    soLuongDangKy: 2,
    maGiangVien: "ND001",
    tenNguoiDung: "MLearning",
    anhDaiDien: "http://localhost:1000/uploads/defaultAvatar.png"
  },
  {
    maKhoaHoc: "KH005",
    tenKhoaHoc: "React.js",
    moTaKhoaHoc: "Học về React.js cơ bản",
    hinhAnh: "./images/Reactjs.png",
    giaBan: "300000.00",
    doKho: "Khó",
    tongSoBaiHoc: 80,
    soLuongDangKy: 2,
    maGiangVien: "ND001",
    tenNguoiDung: "MLearning",
    anhDaiDien: "http://localhost:1000/uploads/defaultAvatar.png"
  }
];


interface ApiCoursesResponse {
  data: courses[];
  pagination?: {
    totalItems?: number;
    totalPages?: number;
    currentPage?: number;
    pageSize?: number;
  };
}

export default function Admin() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<courses[]>([]);
  const [firstCall, setFirstCall] = useState(true);
  const [totalPages, setTotalPages] = useState(1);;

  
  return (
    <div className="admin-wrapper">
      <Header className="header-admin" title="Trang quản trị"></Header>
      <AdminNav></AdminNav>
      <SearchEngine
              placeholder="Tìm kiếm khóa học..."

              renderItem={(item) => (
                  <div
                      className="search-engine__item"


                  >
                      <div className="search-engine__thumb">
                          <img
                              src={"/images/COURSE.png"}
                              className="search-engine__image" />
                      </div>
                      <div>
                          <span className="search-engine__name"></span>
                      </div>
                  </div>
              )} getData={function (query: string): void {
                  throw new Error("Function not implemented.");
              } } data={[]}      />
      <Pagination totalPages={totalPages} />

      {/* Danh sách khóa học */}
      <div className="list-course">

        {/* Phần head */}
        <div className="list-course__head">
          {/* Mã khóa học */}
          <div className="course-id course-id_head">
              <span>ID</span>
          </div>

          {/* Tên khóa học */}
          <div className="course-name course-name_head">
              <span>TÊN KHÓA HỌC</span>
          </div>

          {/* Hình ảnh */}
          <div className="course-image_head">
              <span>HÌNH ẢNH</span>
          </div>

          {/* Độ khó */}
          <div className="course-level_head">
              <span>ĐỘ KHÓ</span>
          </div>

          {/* Giá */}
          <div className="course-price course-price_head">
              <span>GIÁ (VNĐ)</span>
          </div>
        </div>

        {/* Phần hiển thị các khóa học */}
        <div className="list-course__inner">
          {
            khoaHocMockData.map((course) => (
              <AdminCourse 
                key={course.maKhoaHoc}
                maKhoaHoc={course.maKhoaHoc} 
                tenKhoaHoc={course.tenKhoaHoc} 
                doKho={course.doKho} 
                hinhAnh={course.hinhAnh} 
                giaBan={course.giaBan} 
                moTaKhoaHoc={course.moTaKhoaHoc || "Không có mô tả"} 
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}
