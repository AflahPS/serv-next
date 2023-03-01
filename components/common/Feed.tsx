import React, { useCallback, useEffect, useState } from "react";
import { FeedCard } from "../../ui";
import { Post } from "../../types/Posts";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { getPosts, getPostsOfUser, getSavedPost } from "../../APIs";
import InfiniteScroll from "react-infinite-scroll-component";
import { AxiosError } from "axios";
import { LinearProgress, Typography } from "@mui/material";
import { COLOR } from "../../constants";

export const Feed: React.FC<{ user?: string; savedPost?: boolean }> = ({
  user,
  savedPost,
}) => {
  const role = useSelector((state: StoreState) => state.role.currentUser);
  const token = useSelector((state: StoreState) => state.jwt.token);

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
          console.log(err?.response?.data?.message);
          setPosts([]);
          setTotalPosts(0);
          return;
        }
      }
      console.log(err);
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
        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      }
    >
      {posts?.map((post) => (
        <FeedCard key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};
