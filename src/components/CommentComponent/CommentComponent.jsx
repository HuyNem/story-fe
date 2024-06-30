import React, { useState } from "react";
import { Avatar, Empty, List } from "antd";
import { Wrapper } from "./style";
import { useLocation, useParams } from "react-router-dom";
import * as CommentService from "../../services/CommentService";
import { useQuery } from "@tanstack/react-query";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useNavigate } from "react-router-dom";

function CommentComponent(props) {
  const { TextArea } = Input;
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { state } = useLocation();
  const [stateComment, setStateComment] = useState({
    storyId: state?.id,
    userId: user?.id,
    nameUser: user?.name,
    content: "",
  });

  const handleOnChangeComment = (e) => {
    setStateComment({
      storyId: state?.id,
      userId: user?.id,
      nameUser: user?.name,
      content: e.target.value,
    });
  };

  //api comment
  //mutation
  const mutationComment = useMutationHooks((data) => {
    const { userId, storyId, nameUser, content } = data;
    return CommentService.comment({ userId, storyId, nameUser, content });
  });
  // const { data, isSuccess, isError } = mutationComment;

  const send = () => {
    if (user.id === "") {
      navigate("/dang-nhap");
    }
    mutationComment.mutate(stateComment, {
      onSettled: () => {
        queryComment.refetch();
      },
    });
  };

  //api get comment
  const fetchGetComment = async () => {
    const res = await CommentService.getComment(state.id);
    return res.data;
  };
  const queryComment = useQuery({
    queryKey: ["comment"],
    queryFn: fetchGetComment,
    enabled: !!state.id,
  });
  const { isPending, data: comments } = queryComment;
  const dataWithKeys = comments?.map((item) => ({ ...item, key: item._id }));

  return (
    <Wrapper>
      <h3 className="h3-comment">NHẬN XÉT CỦA BẠN VỀ TRUYỆN NÀY</h3>
      <hr />

      <div className="input-cmt">
        <TextArea
          showCount
          maxLength={200}
          className="text-area"
          name="comment"
          onChange={handleOnChangeComment}
        ></TextArea>

        <div className="btn-send">
          <button onClick={send}>
            Gửi <IoIosSend />
          </button>
        </div>
      </div>

      <List
        className="list-cmt"
        itemLayout="horizontal"
        style={{ marginTop: "30px" }}
        dataSource={dataWithKeys}
        locale={{
          emptyText: "Chưa có bình luận",
        }}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              key={index}
              title={item.nameUser}
              description={
                <div style={{ textAlign: "justify", paddingRight: 20 }}>
                  {item.content}
                </div>
              }
            />
            <div>{item.createdDate}</div>
          </List.Item>
        )}
      />
    </Wrapper>
  );
}

export default CommentComponent;
