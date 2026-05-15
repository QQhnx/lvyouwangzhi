import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = ({ children, className = '', hover = true }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-card ${
        hover ? 'hover:shadow-card-hover hover:-translate-y-1' : ''
      } transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
