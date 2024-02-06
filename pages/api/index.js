import { httpServer } from "./socket";

httpServer.listen(3000, () => {
  console.log("Socket.IO server listening on port 3000");
});

export default (req, res) => {
  res.status(200).json({ name: "John Doe" });
};
