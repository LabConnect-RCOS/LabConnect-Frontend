import React from "react";

interface GroupedComponentsProps {
  children?: React.ReactNode[];
  gap: string;
}

const GroupedComponents = ({ children, gap }: GroupedComponentsProps) => {
  return <div className={`flex gap-${gap}`}>{children}</div>;
};

export default GroupedComponents;
