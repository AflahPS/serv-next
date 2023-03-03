import React, { useCallback, useEffect, useState } from "react";
import { FeedCard } from "../../ui";
import { Post } from "../../types/Posts";
import { getPosts, getPostsOfUser, getSavedPost } from "../../APIs";
import InfiniteScroll from "react-infinite-scroll-component";
import { AxiosError } from "axios";
import { LinearProgress, Typography } from "@mui/material";
import { COLOR } from "../../constants";
import { useStore } from "../../customHooks";

interface Props {
  user?: string;
  savedPost?: boolean;
}

export const Feed: React.FC<Props> = (props) => {
  const { user, savedPost } = props;
  const { token } = useStore();

  const [pageNum, setPageNum] = useState(0);
  const [totalPosts, setTotalPosts] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);

  const getAndSetPosts = async () => {
    try {
      const newPageNum = pageNum + 1;
      setPageNum(newPageNum);
      const data = user
        ? await getPostsOfUser(user, newPageNum)
        : savedPost
        ? await getSavedPost(token, pageNum)
        : await getPosts(token, newPageNum);
      if (data?.posts?.length > 0) {
        const newData = posts.concat(data.posts);
        setPosts(newData);
        setTotalPosts(data?.totalPosts);
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        if (err?.response?.data?.message == "Post not found !!") {
          console.warn(err?.response?.data?.message);
          setPosts([]);
          setTotalPosts(0);
          return;
        }
      }
      console.error(err);
    }
  };

  useEffect(() => {
    getAndSetPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasMore = posts.length < totalPosts;

  const handleRefresh = useCallback(() => {
    setPageNum(0);
    setPosts([]);
    getAndSetPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={getAndSetPosts}
      hasMore={hasMore}
      loader={<LinearProgress sx={{ width: "80%", marginX: "auto" }} />}
      endMessage={
        <Typography variant="h6" align="center" color={COLOR["H1d-ui-primary"]}>
          {posts.length === 0
            ? "No posts found !"
            : "You have seen all posts !"}
        </Typography>
      }
      // below props only if you need pull down functionality
      refreshFunction={handleRefresh}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <Typography variant="h6" align="center" color={COLOR["H1d-ui-primary"]}>
          &#8595; Pull down to refresh
        </Typography>
      }
      releaseToRefreshContent={
        <Typography variant="h6" align="center" color={COLOR["H1d-ui-primary"]}>
          &#8593; Release to refresh
        </Typography>
      }
    >
      {posts?.map((post) => (
        <FeedCard key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};
