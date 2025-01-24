import React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional class names if you are using Tailwind CSS

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "relative overflow-y-auto h-full scrollbar-thin scrollbar-thumb-[#FFA726] scrollbar-track-[#FFECB3]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
