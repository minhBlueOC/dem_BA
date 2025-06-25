import React, { useState } from "react";
import MDEditor, { type ICommand, commands } from "@uiw/react-md-editor";
import Header from "~/components/Header";
import "../styles/blog.css";
import Button from "~/components/Button";
import PopUp from "~/components/PopUp";
import { marked } from "marked";

const Blog: React.FC = () => {
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const [isClosedDelete, setIsClosedDelete] = useState(true);
    const handleOpenDelete = () => { setIsClosedDelete(false)};
    const handleCloseDelete = () => { setIsClosedDelete(true)};

    const [isClosedReWrite, setIsClosedReWrite] = useState(true);
    const handleOpenReWrite = () => { setIsClosedReWrite(false)};
    const handleCloseReWrite = () => { setIsClosedReWrite(true)};

    // ⚙️ Cấu hình thêm class vào các thẻ
    marked.use({
        renderer: {
            paragraph(token) {
                return `<p class="my-paragraph">${token.text}</p>`;
            },
            image(token) {
                return `<img src="${token.href}" alt="${token.text || ''}" class="blog-image" />`;
            },
            heading(token) {
                return `<h${token.depth} class="my-heading h${token.depth}">${token.text}</h${token.depth}>`;
            }
        }
    });

    // Ẩn hiện PopUp
    const [isClosedAddDone, setIsClosedAddDone] = useState(true);
    const handleOpenAddDone = () => { setIsClosedAddDone(false)};
    const handleCloseAddDone = () => { setIsClosedAddDone(true)};

    // Cần thực hiến nếu người dùng huỷ thêm thì xoá ảnh ở cloudinary
    // cần thêm chức năng lưu bản nháp
    return (
        <div data-color-mode="blog-wrapper">
            <Header className="header-admin" title="Viết blog" />

            <div className="blog-container">
                <input 
                    className="blog-input" 
                    placeholder="Tiêu đề của blog.." 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <MDEditor
                    data-color-mode="light"
                    className="mdediter"
                    value={content}
                    onChange={(val) => setContent(val || "")}
                    commands={[
                        commands.bold,
                        commands.italic,
                        commands.strikethrough,
                        commands.hr,
                        commands.title,
                        commands.divider,
                        commands.quote,
                        commands.code,
                        commands.link,
                        // customImageCommand,
                        commands.unorderedListCommand,
                        commands.orderedListCommand,
                        commands.checkedListCommand,
                    ]}
                />
                
            </div>

            <div className="blog-actions">
                <Button type="button" className="btn-add">Thêm bài viết</Button>
                <Button className="btn-new button-secondary button" onClick={handleOpenReWrite}>Viết lại</Button>
                <Button className="btn-cancle button-third button" onClick={handleOpenDelete}>Hủy bỏ</Button>
            </div>

            <PopUp 
                icon={"Question.svg"} 
                secondOption={"Viết tiếp"} 
                title={"Huỷ viết blog"} 
                desc={"Bạn có chắc chắc muốn huỷ viết blog không?"} 
                onOpen={handleCloseDelete}
                isClosed={isClosedDelete}
                className="popup-delete"
                timeCount={5}
            >
                <Button type="button" className="popup-delete_btn">Huỷ viết</Button>
            </PopUp>

            <PopUp 
                icon={"Question.svg"} 
                secondOption={"Viết tiếp"} 
                title={"Viết lại bài viết"} 
                desc={"Bạn có chắc chắn muốn viết lại bài viết không?"} 
                onOpen={handleCloseReWrite}
                isClosed={isClosedReWrite}
                className="popup-update"
                timeCount={3}
            >
                <Button type="submit">Viết lại</Button>
            </PopUp>

            <PopUp 
                icon={"Successful.svg"} 
                // secondOption={"Hủy bỏ"} 
                title={"Thêm bài viết"} 
                desc={"Thêm bài viết thành công!"} 
                onOpen={handleCloseAddDone}
                isClosed={isClosedAddDone}
                className="popup-done"
                // timeCount={5}
                >
                {/* <Button type="button" onClick={handleCloseUpdateDone}>OK</Button> */}
            </PopUp>
        </div>
    );
};

export default Blog;