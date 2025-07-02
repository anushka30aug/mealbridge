"use client";

import { useState } from "react";
import { Switch, Label, Slider } from "@ui";
import { Sparkles } from "lucide-react";

export default function Filters({
  onFilterChange,
}: {
  onFilterChange: (filters: { veg: boolean; minFeeds: number }) => void;
}) {
  const [veg, setVeg] = useState(false);
  const [minFeeds, setMinFeeds] = useState(3);

  const handleVegChange = (value: boolean) => {
    setVeg(value);
    onFilterChange({ veg: value, minFeeds });
  };

  const handleFeedsChange = (value: number[]) => {
    const val = value[0];
    setMinFeeds(val);
    onFilterChange({ veg, minFeeds: val });
  };

  return (
    <div className="w-full bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl shadow-sm px-6 py-5 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 flex-wrap w-full sm:w-auto">
          {/* Veg Only Switch */}
          <div className="flex items-center gap-2">
            <Switch
              id="veg-only"
              checked={veg}
              onCheckedChange={handleVegChange}
            />
            <Label
              htmlFor="veg-only"
              className="text-sm font-medium text-gray-800"
            >
              Veg Only
            </Label>
          </div>

          {/* Feeds Slider */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <Label
              htmlFor="feeds-slider"
              className="text-sm font-medium text-gray-800"
            >
              Feeds at least: <span className="font-semibold">{minFeeds}+</span>
            </Label>
            <Slider
              id="feeds-slider"
              value={[minFeeds]}
              onValueChange={handleFeedsChange}
              min={1}
              max={50}
              step={1}
              className="w-full sm:w-[200px] accent-green-600"
            />
          </div>
        </div>

        {/* Right Prompt */}
        <div className="hidden sm:flex items-center gap-2 text-sm text-green-800 font-medium whitespace-nowrap">
          <Sparkles className="w-4 h-4 text-green-500" />
          Customize to find perfect meals 🍽️
        </div>
      </div>
    </div>
  );
}
