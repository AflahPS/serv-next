import { Dispatch, SetStateAction, createContext } from "react";
import { Socket } from "socket.io-client";

interface ContextProps {
  socket: Socket | undefined;
  setSocket: Dispatch<SetStateAction<Socket<any, any> | undefined>>;
}

export const SocketContext = createContext<ContextProps>({
  socket: undefined,
  setSocket: () => undefined,
});
