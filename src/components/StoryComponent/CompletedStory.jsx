import React from "react";
import { WrapperStoryCompleted, WrapperTitle } from "./style";
import { useQuery } from "@tanstack/react-query";
import * as StoryService from "../../services/StoryService";
import Loading from "../../components/LoadingComponent/Loading";
import HorizontalStory from "./HorizontalStory";
import { Skeleton } from "antd";
import SkeletonCompletedStories from "../Skeleton/SkeletonCompletedStories";

function CompletedStory(props) {
  const fetchStoryCompleted = async () => {
    const res = await StoryService.getStoryCompleted();
    return res;
  };
  const { isPending, data: storiesCompleted } = useQuery({
    queryKey: ["storiesCompleted"],
    queryFn: fetchStoryCompleted,
    retry: 3,
    retryDelay: 1000,
  });
  return (
    <WrapperStoryCompleted>
        <WrapperTitle>Truyện FULL (Đã hoàn thành)</WrapperTitle>
        <hr />
        <SkeletonCompletedStories loading={isPending}/>
        {storiesCompleted &&
          storiesCompleted.data.map((data) => {
            return (
              <HorizontalStory
                key={data._id}
                img={data.image}
                name={data.name}
                author={data.author}
                id={data._id}
                isCompleted="Full"
              />
            );
          })}
    </WrapperStoryCompleted>
  );
}

export default CompletedStory;
