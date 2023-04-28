import { useState, useEffect } from "react";

const GlobalMessage = ({ children, onMessageClosed }) => {
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    if (children) {
      setIsShown(true);
      setTimeout(() => {
        setIsShown(false);
        onMessageClosed();
      }, 5000);
    }
  }, [children]);

  if (!children || !isShown) {
    return null;
  }
  return (
    <div>{children}
    </div>

  )
}

export default GlobalMessage

