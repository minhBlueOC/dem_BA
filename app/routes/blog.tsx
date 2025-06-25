import React, { useState } from "react";
import MDEditor, { type ICommand, commands } from "@uiw/react-md-editor";
import Header from "~/components/Header";
import "../styles/blog.css";
import Button from "~/components/Button";
import PopUp from "~/components/PopUp";
import { marked } from "marked";

const Blog: React.FC = () => {
    
    return (
        <div data-color-mode="blog-wrapper">
            <p>Đang phát triển ...</p>
        </div>
    );
};

export default Blog;