import React from "react";
import { Card as PiCard } from "primereact/card";
import { CardProps } from "./Card.types";

const Card: React.FC<CardProps> = ({ title, children, header, footer, className}) => {
  return (
    <PiCard className={className} title={title} header={header} footer={footer}>
      {children}
    </PiCard>
  );
};

export default Card;
