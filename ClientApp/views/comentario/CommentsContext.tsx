// ClientApp/contexts/CommentsContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface CommentsContextProps {
  unreadComments: number;
  setUnreadComments: React.Dispatch<React.SetStateAction<number>>;
}

const CommentsContext = createContext<CommentsContextProps | undefined>(undefined);

export const CommentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unreadComments, setUnreadComments] = useState(0);

  useEffect(() => {
    const handleNewComment = () => setUnreadComments((n) => n + 1);
    window.addEventListener("comments:new", handleNewComment);
    return () => window.removeEventListener("comments:new", handleNewComment);
  }, []);

  return (
    <CommentsContext.Provider value={{ unreadComments, setUnreadComments }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const ctx = useContext(CommentsContext);
  if (!ctx) throw new Error("useComments debe usarse dentro de CommentsProvider");
  return ctx;
};
