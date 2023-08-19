import { io } from "socket.io-client";
import { useEffect, useCallback } from "react";
export const useSocket = () => {
  const socket = io();
  const socketInit = useCallback(async () => {
    await fetch("http://localhost:3000/api/socket");
    socket.on("connect", () => {
      console.log("connected");
    });
  }, [socket]);

  useEffect(() => {
    socketInit();
  }, [socketInit]);
  return { socket, socketInit };
};
