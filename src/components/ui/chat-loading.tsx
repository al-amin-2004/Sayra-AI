const ChatLoading = () => {
  return (
    <div className="flex items-center gap-1.5">
      <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
      <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
      <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
    </div>
  );
};

export default ChatLoading;
