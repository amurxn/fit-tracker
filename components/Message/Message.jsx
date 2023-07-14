function Message({ message }) {
  return message ? <p className="text-white mt-4">{message}</p> : null;
}

export default Message