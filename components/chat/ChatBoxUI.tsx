import {
  DeleteOutlined,
  CallOutlined,
  VideoCallOutlined,
  MoreVertOutlined,
  SendOutlined,
  WestOutlined,
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
import React, { useContext, useEffect, useRef, useState } from "react";
import { COLOR } from "../../constants";
import { useDispatch } from "react-redux";
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
import { AxiosError } from "axios";
import { chatListActions } from "../../store/chatList.slice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useStore } from "../../customHooks";
import { ChatLi, TabHeader } from "../../ui";
import { SocketContext } from "../../utils";

export const ChatComp = () => {
  const dispatch = useDispatch();
  // const router = useRouter();
  const confirmer = useConfirm();
  const scroll = useRef<HTMLDivElement>();
  const [animeRef] = useAutoAnimate();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState<Chat>();

  const [sendMessageIo, setSendMessageIo] = useState<any>(null);
  const [recieveMessageIo, setRecieveMessageIo] = useState<any>(null);

  const { selectedChat, currentUser, token, chatList } = useStore();

  const { socket } = useContext(SocketContext);

  const getAndSetChat = async () => {
    try {
      if (!selectedChat) return;
      const chatDetails = await getSingleChat(selectedChat, token);
      setCurrentChat(chatDetails?.chat);
      const chatData = await getMessagesOfChat(selectedChat, token);
      setMessages(chatData?.messages);
    } catch (err) {
      setMessages([]);
      if (err instanceof AxiosError) {
        console.error(err?.response?.data?.message);
      }
      console.error(err);
    }
  };

  const checkIfAuthor = (author: string) => author === currentUser._id;
  const getFriendObjectFromChat = () =>
    currentChat?.user1._id === currentUser._id
      ? currentChat?.user2
      : currentChat?.user1;

  // Get chat data from server when mounting
  useEffect(() => {
    getAndSetChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get chat data from server when new chat is selected
  useEffect(() => {
    getAndSetChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  const handleSend = async () => {
    try {
      const addedMessage = await sendMessage(selectedChat, token, newMessage);
      setMessages((prev) => [...prev, addedMessage?.message]);
      setNewMessage("");

      const recieverId = getFriendObjectFromChat()?._id;
      setSendMessageIo({ ...addedMessage?.message, recieverId });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteChat = async () => {
    try {
      await confirmer({
        description: "Do you want to delete this chat?",
      });
      const isDeleted = await deleteChat(selectedChat, token);
      if (isDeleted) {
        dispatch(chatActions.removeChat());
        dispatch(chatListActions.removeFromChatList(selectedChat));
      }
    } catch (err) {
      if (err === undefined) return;
      console.error(err);
    }
  };

  const handleBackClick = () => {
    dispatch(chatActions.removeChat());
  };

  // send to socket
  useEffect(() => {
    if (sendMessageIo !== null) {
      socket?.emit("send-message", sendMessageIo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendMessageIo]);

  // reciieve
  useEffect(() => {
    socket?.on("recieve-message", (data: ChatMessage) => {
      setRecieveMessageIo(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recieveMessageIo !== null && recieveMessageIo.chat === selectedChat) {
      setMessages((prev) => [...prev, recieveMessageIo]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recieveMessageIo]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Stack height={"85vh"} width={"100%"}>
      {!selectedChat && (
        <>
          <Box
            display={{ xs: "none", lg: "flex" }}
            height={"100%"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h5">{`Please select a chat !`}</Typography>
          </Box>

          <Box
            bgcolor={"transparent"}
            maxHeight={"90vh"}
            flex={1}
            position="sticky"
            top={72}
            sx={{
              display: { xs: "block", lg: "none" },
              boxShadow: 8,
              borderRadius: 3,
            }}
          >
            <TabHeader invertColor header="Chats" />
            <Box
              overflow={"auto"}
              bgcolor={"black"}
              height={"100%"}
              width={"100%"}
              p={1}
              ref={animeRef}
              sx={{
                display: { xs: "block", lg: "none" },
                boxShadow: 8,
                borderRadius: 3,
              }}
            >
              {chatList.length > 0 &&
                chatList.map((chat) => <ChatLi key={chat._id} Chat={chat} />)}
              {chatList.length === 0 && (
                <Stack
                  marginY={2}
                  paddingX={1}
                  gap={2}
                  color={COLOR["H1d-font-primary"]}
                  sx={{
                    maxWidth: "260px",
                    backgroundColor: "transparent",
                  }}
                >
                  <Typography
                    color={COLOR["H1d-ui-primary"]}
                    align="center"
                    variant="h6"
                  >
                    Connect with...
                  </Typography>
                  <Typography variant="subtitle2">
                    It seems like you have not sent a message yet. Search and
                    find someone to chat...
                  </Typography>
                </Stack>
              )}
            </Box>
          </Box>
        </>
      )}
      {selectedChat && (
        <>
          {/* Laptop */}
          <Box
            bgcolor={COLOR["H1d-ui-bg"]}
            display={"flex"}
            flex={2.5}
            paddingX={3}
            justifyContent={"space-between"}
          >
            {/* HEAD-LEFT */}
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <IconButton
                sx={{ display: { xs: "block", lg: "none" } }}
                onClick={handleBackClick}
              >
                <WestOutlined />
              </IconButton>
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
