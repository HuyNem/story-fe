import React from "react";
import VerticalStory from "./VerticalStory";
import { WrapperStory, WrapperNewStory, WrapperPagination } from "./style";
import { useQuery } from "@tanstack/react-query";
import * as StoryService from "../../services/StoryService";
import Loading from "../../components/LoadingComponent/Loading";
import SkeletonNewStories from "../Skeleton/SkeletonNewStories";

function NewStoryComponent() {
  const fetchStoryAll = async () => {
    const res = await StoryService.getNewStory();
    return res;
  };
  const { isPending, data: stories } = useQuery({
    queryKey: ["storiesNew"],
    queryFn: fetchStoryAll,
    retry: 3,
    retryDelay: 1000,
  });
  return (
    <WrapperNewStory>
      <h3 style={{ marginLeft: "10px" }}>Truyện Mới nhất</h3>
      <hr />
      <SkeletonNewStories loading={isPending} />
      <WrapperStory>
        {stories &&
          stories.data.map((story) => {
            return (
              <VerticalStory
                key={story._id}
                image={story.image}
                name={story.name}
                id={story._id}
              />
            );
          })}
      </WrapperStory>
    </WrapperNewStory>
  );
}

export default NewStoryComponent;
