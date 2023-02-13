import {
  DeleteOutlined,
  CallOutlined,
  VideoCallOutlined,
  MoreVertOutlined,
  SendOutlined,
} from "@mui/icons-material";
import {
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { COLOR } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { Chat, ChatMessage } from "../../types";
import {
  deleteChat,
  getMessagesOfChat,
  getSingleChat,
  sendMessage,
} from "../../APIs";
import { ChatMessageComp } from "./ChatMessage";
import dayjs from "dayjs";
import { chatActions } from "../../store/chatId.slice";
import { useConfirm } from "material-ui-confirm";
import { chatListActions } from "../../store/chatList.slice";
import { AxiosError } from "axios";
import { Socket, io } from "socket.io-client";

export const ChatComp = () => {
  const dispatch = useDispatch();
  const confirmer = useConfirm();
  const socket = useRef();
  const scroll = useRef();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [sendMessageIo, setSendMessageIo] = useState<any>(null);
  const [recieveMessageIo, setRecieveMessageIo] = useState<any>(null);

  const chat = useSelector((state: StoreState) => state.chat.chatId);
  const currentUser = useSelector((state: StoreState) => state.user.data);
  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetChat = async () => {
    try {
      if (!chat) return;
      const chatDetails = await getSingleChat(chat, token);
      setSelectedChat(chatDetails?.chat);
      const chatData = await getMessagesOfChat(chat, token);
      setMessages(chatData?.messages);
    } catch (err) {
      setMessages([]);
      if (err instanceof AxiosError) {
        console.log(err?.response?.data?.message);
      }
      console.log(err);
    }
  };

  // const deleteChatIfNoMessages = async (chatId: string) => {
  //   try {
  //     const isDeleted = await deleteChat(chatId, token);
  //     if (isDeleted) {
  //       dispatch(chatListActions.removeFromChatList(chatId));
  //     }
  //   } catch (err) {
  //     if (err instanceof AxiosError) {
  //       console.log(err?.response?.data?.message);
  //     }
  //     console.log(err);
  //   }
  // };

  const checkIfAuthor = (author: string) => author === currentUser._id;
  const getFriendObjectFromChat = () =>
    selectedChat?.user1._id === currentUser._id
      ? selectedChat?.user2
      : selectedChat?.user1;

  useEffect(() => {
    getAndSetChat();

    // return () => {
    //   dispatch(chatActions.removeChat());
    //   if (messages.length === 0) {
    //     deleteChatIfNoMessages(chat);
    //   }
    //   setSelectedChat(undefined);
    //   setMessages([]);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAndSetChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);

  const handleSend = async () => {
    try {
      const addedMessage = await sendMessage(chat, token, newMessage);
      setMessages((prev) => [...prev, addedMessage?.message]);
      setNewMessage("");

      const recieverId = getFriendObjectFromChat()?._id;
      setSendMessageIo({ ...addedMessage?.message, recieverId });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteChat = async () => {
    try {
      const isConfirm = await confirmer({
        description: "Do you want to delete this chat?",
      });
      console.log(isConfirm);

      const isDeleted = await deleteChat(chat, token);
      if (isDeleted) {
        dispatch(chatActions.removeChat());
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Setup the socket server
  useEffect(() => {
    socket.current = io("http://localhost:5555");
    socket.current.emit("new-user-add", currentUser._id);
    socket.current.on("get-users", (users: any[]) => {
      setOnlineUsers(users);
    });
  }, [currentUser]);

  // send to socket
  useEffect(() => {
    if (sendMessageIo !== null) {
      socket.current?.emit("send-message", sendMessageIo);
    }
  }, [sendMessageIo]);

  // reciieve
  useEffect(() => {
    socket.current?.on("recieve-message", (data: ChatMessage) => {
      setRecieveMessageIo(data);
    });
  }, []);

  useEffect(() => {
    if (recieveMessageIo !== null && recieveMessageIo.chat === chat) {
      setMessages((prev) => [...prev, recieveMessageIo]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recieveMessageIo]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }),
    [messages];

  return (
    <Stack height={"85vh"}>
      {!chat && (
        <Box
          display={"flex"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h5">{`Please select a chat !`}</Typography>
        </Box>
      )}
      {chat && (
        <>
          <Box
            bgcolor={COLOR["H1d-ui-bg"]}
            display={"flex"}
            flex={2.5}
            paddingX={3}
            justifyContent={"space-between"}
          >
            {/* HEAD-LEFT */}
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Avatar src={getFriendObjectFromChat()?.image}>
                {getFriendObjectFromChat()?.name}
              </Avatar>
              <Typography variant="h6">
                {getFriendObjectFromChat()?.name}
              </Typography>
            </Box>

            {/* HEAD-RIGHT */}
            <Box display={"flex"} gap={1}>
              <IconButton disableRipple onClick={handleDeleteChat}>
                <DeleteOutlined />
              </IconButton>
              <IconButton disableRipple>
                <CallOutlined />
              </IconButton>
              <IconButton disableRipple>
                <VideoCallOutlined />
              </IconButton>
              <IconButton disableRipple>
                <MoreVertOutlined />
              </IconButton>
            </Box>
          </Box>

          <Box
            bgcolor={COLOR["H1d-ui-secondary"]}
            flex={15}
            display={"flex"}
            padding={2}
            flexDirection={"column"}
            gap={1}
            overflow={"auto"}
          >
            {messages.map((msg) => (
              <ChatMessageComp
                refer={scroll}
                key={msg._id}
                isAuthor={checkIfAuthor(msg.author)}
                text={msg.text}
                date={dayjs(msg.createdAt).format("LLL")}
              />
            ))}
          </Box>

          <Box
            bgcolor={COLOR["H1d-ui-bg"]}
            gap={1}
            padding={1}
            flex={2}
            display={"flex"}
          >
            <TextField
              placeholder="Write a message here.."
              fullWidth
              variant="outlined"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
            />
            <Button onClick={handleSend} variant="outlined">
              <Typography variant="button">Send</Typography>
              <SendOutlined />
            </Button>
          </Box>
        </>
      )}
    </Stack>
  );
};
