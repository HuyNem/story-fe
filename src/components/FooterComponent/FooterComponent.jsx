import React from "react";
import "./style.css";

function FooterComponent() {
  return (
    <footer className="main-footer">
      <p>
        Trang web này được tạo ra với mục đích học tập rèn luyện kỹ năng lập trình. 
        Chúng tôi không có bất kỳ hoạt động kinh doanh nào trên trang web này. 
        Mọi nội dung đều tham khảo trên trang web . 
        Cảm ơn bạn đã ghé thăm và hy vọng bạn sẽ tìm thấy những thông tin hữu ích!
      </p>

      <ul className="ul-footer">
        <li>Duyệt theo</li>
        <li>Truyện hot</li>
        <li>Tag</li>
        <li>Tác giả</li>
        <li>Tìm kiếm</li>
      </ul>

      <ul className="ul-footer">
        <li>Phân Loại</li>
        <li>Kiếm Hiệp</li>
        <li>Huyền Huyễn</li>
        <li>Ngôn Tình</li>
        <li>Truyện Ma</li>
        <li>Trinh Thám</li>
      </ul>

      <ul className="ul-footer">
        <li>Mạng xã hội</li>
        <li>Facebook</li>
        <li>Instagram</li>
        <li>Tiktok</li>
      </ul>
    </footer>
  );
}

export default FooterComponent;
