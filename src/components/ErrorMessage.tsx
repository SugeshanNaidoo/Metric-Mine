import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
      <AlertCircle className="h-5 w-5 text-red-500" />
      <p className="text-red-700">{message}</p>
    </div>
  );
};