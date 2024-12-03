import React from 'react';
import { Coins } from 'lucide-react';

export const Header: React.FC = () => (
  <div className="flex items-center space-x-2 mb-8">
    <Coins className="h-8 w-8 text-blue-600" />
    <h1 className="text-3xl font-bold text-gray-900">Metric-Mine</h1>
  </div>
);