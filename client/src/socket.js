import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

/**
 * Creates a socket connection and start listening to different
 * events.
 * @returns Socket IO instance
 */
const socketConnection = () => {
  const socket = io(window.location.origin);
  socket.on("connect", () => {
    console.log("connected to server");
    
    socket.on("add-online-user", (id) => {
      store.dispatch(addOnlineUser(id));
    });
    
    socket.on("remove-offline-user", (id) => {
      store.dispatch(removeOfflineUser(id));
    });
    socket.on("new-message", (data) => {
      store.dispatch(setNewMessage(data.message, data.sender));
    });
  });
  return socket;
}

export default socketConnection;


