import type { CSSProperties, ReactNode } from "react";

type HoverCardProps = {
  children: ReactNode;
  className?: string;
  imageScale?: number;
  as?: "article" | "figure";
};

export default function HoverCard({
  children,
  className = "",
  imageScale = 1.05,
  as: Tag = "article",
}: HoverCardProps) {
  return (
    <Tag
      className={`hover-card group ${className}`}
      style={{ "--hover-scale": imageScale } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
