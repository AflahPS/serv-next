import React, { useEffect, useState } from "react";
import { DataTable } from "../../ui";
import { Post } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { deletePost, getAllPosts, getAllServices } from "../../APIs";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { notifierActions } from "../../store/notifier.slice";
import { useConfirm } from "material-ui-confirm";

export const PostTable = () => {
  const dispatch = useDispatch();
  const confirmer = useConfirm();
  const [posts, setPosts] = useState<Post[]>([]);

  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetPosts = async () => {
    try {
      const postData = await getAllPosts(token);
      if (postData) setPosts(postData?.posts);
    } catch (err) {
      console.error(err);
    }
  };

  function userDataFormatter(posts: Post[]) {
    function renderAvatar(row: Post) {
      const handleAvatarClick = () => {
        // Handle ptofile click event
      };

      return (
        <>
          <IconButton onClick={handleAvatarClick}>
            <Avatar src={row?.owner?.image}>{row?.owner?.name}</Avatar>
          </IconButton>
        </>
      );
    }

    function renderDeleteButton(row: Post) {
      // Handle Delete
      const handleDelete = async () => {
        try {
          await confirmer({
            description: `Are you sure you want to delete this post ?`,
          });
          const isSuccess = await deletePost(row._id, token);
          if (!isSuccess) return dispatch(notifierActions.somethingWentWrong());
          setPosts((prev) => prev.filter((post) => post._id !== row._id));
          dispatch(notifierActions.info(`Successfully deleted the post !`));
        } catch (err) {
          if (typeof err !== "undefined")
            dispatch(notifierActions.somethingWentWrong());
          console.error(err);
        }
      };

      return (
        <Tooltip title="Remove a Service">
          <IconButton color="error" onClick={handleDelete}>
            <DeleteOutlineOutlined color="error" />
          </IconButton>
        </Tooltip>
      );
    }

    const columns: GridColDef[] = [
      {
        field: "owner.image",
        headerName: "Owner",
        width: 100,
        renderCell(params) {
          return renderAvatar(params.row);
        },
      },
      {
        field: "owner.name",
        headerName: "Owner Name",
        width: 150,
        valueGetter(params) {
          return params.row?.owner?.name;
        },
      },
      {
        field: "owner.role",
        headerName: "Owner Role",
        width: 100,
        valueGetter(params) {
          return params.row?.owner?.role;
        },
      },
      {
        field: "media",
        headerName: "Mediae",
        width: 70,
        description: "Number of media files",
        valueGetter(params) {
          return params.row?.media?.length;
        },
      },
      {
        field: "likes",
        headerName: "Likes",
        width: 100,
        description: "Number of likes",
        valueGetter(params) {
          return params.row?.likes;
        },
      },
      {
        field: "comments",
        headerName: "Comments",
        width: 100,
        description: "Number of comments",
        valueGetter(params) {
          return params.row?.comments;
        },
      },
      {
        field: "reports",
        headerName: "Reports",
        width: 100,
        description: "Number of reports",
        valueGetter(params) {
          return params.row?.reports?.length;
        },
      },
      {
        field: "_id",
        headerName: "Remove",
        width: 100,
        description: "Remove a service",
        renderCell(params) {
          return renderDeleteButton(params.row);
        },
      },
    ];

    return [posts, columns];
  }

  const [rows, columns] = userDataFormatter(posts);

  useEffect(() => {
    getAndSetPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DataTable rows={rows} columns={columns as GridColDef[]} />;
};
