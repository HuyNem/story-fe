import React from 'react';
import './style.css';



function FooterComponent() {
    return (
        <div className='main-footer'>
            <div className="container">
                <p >
                    Truyện Hay Online là cộng đồng các bạn đam mê truyện tranh lớn nhất Việt Nam.
                    Website đóng vai trò kết nối nhóm dịch và các bạn yêu thích đọc truyện tranh.
                    Bản quyền truyện đăng trên TTG thuộc về nhóm dịch và tác giả
                    NgocHuy © 2024 · Version: 1
                </p>

                <ul>
                    <li>Duyệt theo</li>
                    <li>Truyện hot</li>
                    <li>Tag</li>
                    <li>Tác giả</li>
                    <li>Tìm kiếm</li>
                </ul>

                <ul>
                    <li>Phân Loại</li>
                    <li>Kiếm Hiệp</li>
                    <li>Huyền Huyễn</li>
                    <li>Ngôn Tình</li>
                    <li>Truyện Ma</li>
                    <li>Trinh Thám</li>
                </ul>

                <ul>
                    <li>Mạng xã hội</li>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Tiktok</li>
                </ul>
            </div>
        </div>
    );
}

export default FooterComponent;