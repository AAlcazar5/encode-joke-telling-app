import React from 'react';
import { ChatMessagesProps } from '../types/types';

export function ChatMessages({ filteredMessages }: ChatMessagesProps) {
  return (
    <div className="max-w-5xl w-full mx-auto">
      {filteredMessages.map((message, index) => (
        <div
          key={index}
          className="bg-opacity-75 bg-gray-800 text-white rounded-lg p-4 mt-4"
        >
          {message.content}
        </div>
      ))}
    </div>
  );
}
