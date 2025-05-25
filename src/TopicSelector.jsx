import { useState, useEffect } from "react";

function TopicSelector({ topics, onSelect, selectedTopics, onContinue }) {
  const isAtLimit = selectedTopics.length >= 8;
  const [search, setSearch] = useState("");

  const filteredTopics = Object.keys(topics).filter((topic) =>
    topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Select 8 Topics
        </h1>
        <div className="text-center text-sm text-gray-600 mb-2">
          {selectedTopics.length}/8 topics selected
        </div>
        <div className="h-2 w-full bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${(selectedTopics.length / 8) * 100}%` }}
          />
        </div>
        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 my-4"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredTopics.map((topic) => {
            const isSelected = selectedTopics.includes(topic);
            const isDisabled = isAtLimit && !isSelected;

            return (
              <button
                key={topic}
                onClick={() => onSelect(topic)}
                disabled={isDisabled}
                className={`px-4 py-2 rounded-lg border text-sm transition 
                  ${
                    isSelected
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                  } 
                  ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-none p-4 border-t bg-white">
        <button
          onClick={onContinue}
          disabled={!isAtLimit}
          className={`w-full py-3 rounded-lg font-medium transition text-white shadow ${
            isAtLimit
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue to Survey
        </button>
      </div>
    </div>
  );
}

export default TopicSelector;
