import { io } from "socket.io-client";
import { useEffect } from "react";
export const useSocket = (serverPath) => {
  let socket;
  const socketInit = async () => {
    await fetch("http://localhost:3000/api/socket");
    socket = io();
    socket.on("connect", () => {
      console.log("connected");
    });
  };

  useEffect(() => {
    socketInit();
  },[])
  return { socket, socketInit };

};
