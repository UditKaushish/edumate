import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  onClick: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (newValue: string) => {
    onValueChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
        onClick={toggleDropdown}
      >
        <span>{value || "Select an option"}</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement, {
              onClick: handleSelect,
            })
          )}
        </div>
      )}
    </div>
  );
};

export const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <>{children}</>;

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="py-1">{children}</div>
);

export const SelectItem: React.FC<SelectItemProps> = ({ value, children, onClick }) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button
      className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => (
  <span>{placeholder}</span>
);
