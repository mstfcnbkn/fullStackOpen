const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const className =
    message.type === "error" ? "notification error" : "notification success";

  return <div className={className}>{message.content}</div>;
};

export default Notification;
