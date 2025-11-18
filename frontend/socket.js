// import { io } from "socket.io-client";

// const socket = io("ws://localhost:4000");

// export default socket;


// socket.js
import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
  "http://localhost:4000"; // fallback for dev

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
});

export default socket;
