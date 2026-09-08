import type { ElementType, ReactNode } from "react";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
}: RevealProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag data-reveal className={className}>
      {children}
    </Tag>
  );
}

export function RevealStagger<T extends ElementType = "div">({
  as,
  children,
  className,
}: RevealProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag data-reveal-stagger className={className}>
      {children}
    </Tag>
  );
}

export function RevealItem<T extends ElementType = "div">({
  as,
  children,
  className,
}: RevealProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag data-reveal-item className={className}>
      {children}
    </Tag>
  );
}

export function RevealFade<T extends ElementType = "div">({
  as,
  children,
  className,
}: RevealProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag data-reveal-fade className={className}>
      {children}
    </Tag>
  );
}

export function RevealHero<T extends ElementType = "div">({
  as,
  children,
  className,
}: RevealProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag data-reveal-hero className={className}>
      {children}
    </Tag>
  );
}
