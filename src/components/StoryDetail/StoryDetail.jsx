import { React, useEffect, useState } from "react";
import { Col, Row, Typography, Button } from "antd";
import { WrapperStoryDetail, WrappterChapter } from "./style";
import { useLocation, useParams } from "react-router-dom";
import * as StoryService from "../../services/StoryService";
import * as ChapterService from "../../services/ChapterService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/LoadingComponent/Loading";
import { useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";
import BreadCrumbComponent from "../BreadCrumbComponent/BreadCrumbComponent";
import "./StoryDetail.css";

//hàm sử lý "xem thêm"
const paragrapStyles = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

function StoryDetail(props) {
  const navigate = useNavigate();
  const [isOpent, setIsOpent] = useState(false);
  // const { id } = useParams();
  const { state } = useLocation();

  //call api get detail story
  const fetchGetDetailStory = async () => {
    const res = await StoryService.getDetailStory(state.name);
    return res.data;
  };
  const { isPending, data: storyDetail } = useQuery({
    queryKey: ["story"],
    queryFn: fetchGetDetailStory,
    enabled: !!state.name,
  });

  //call api chapter
  const fetchGetChapter = async () => {
    const res = await ChapterService.getAllChapter(state.id);
    return res.data;
  };
  const { data: chapter } = useQuery({
    queryKey: ["chapter"],
    queryFn: fetchGetChapter,
  });

  return (
    <div>
      <WrapperStoryDetail>
        <Loading isLoading={isPending}>
          <div className="detail-top">
            <div className="story-detail-left">
              <img src={storyDetail?.image} width="230px" />
            </div>
            <div className="story-detail-right">
              <table>
                <tr>
                  <td>
                    <h3>Tên truyện:</h3>
                  </td>
                  <td>
                    <h3>{storyDetail?.name}</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Tác giả:</h5>
                  </td>
                  <td>
                    <h4>{storyDetail?.author}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Thể loại:</p>
                  </td>
                  <td>
                    <p>{storyDetail?.category}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Lượt xem:</p>
                  </td>
                  <td>
                    <p>{storyDetail?.view}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Tình trạng:</p>
                  </td>
                  <td>
                    <p>
                      {storyDetail?.isCompleted
                        ? "Đã hoàn thành"
                        : "Chưa hoàn thành"}
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <Typography
            style={{
              textAlign: "justify",
              padding: "10px 30px 0px 0px",
              ...(isOpent ? null : paragrapStyles),
            }}
          >
            {storyDetail?.description}
          </Typography>
          <a onClick={() => setIsOpent(!isOpent)}>
            <i>{isOpent ? "Rút gọn" : "Xem thêm"}</i>
          </a>
          <hr />

          <WrappterChapter>
            <h3>Danh sách chương:</h3>
            {chapter &&
              chapter.map((chap) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p
                    onClick={() =>
                      navigate(`truyenhay`, {
                        state: {
                          id: storyDetail._id,
                          name: storyDetail.name,
                          chapNum: chap.chapNum,
                          totalChap: chapter.length,
                        },
                      })
                    }
                    key={chap._id}
                  >
                    Chương {chap.chapNum}: {chap.title}
                  </p>
                  <p className="date">{chap.createdDate}</p>
                </div>
              ))}
          </WrappterChapter>
          {/* <Button type="primary" block>Đọc truyện</Button> */}
        </Loading>
      </WrapperStoryDetail>
    </div>
  );
}

export default StoryDetail;
