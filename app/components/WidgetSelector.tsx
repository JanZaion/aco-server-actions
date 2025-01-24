'use client';

import { useState } from 'react';

type WidgetSelectorProps = {
  widgets: Widget[];
};

export default function WidgetSelector({ widgets }: WidgetSelectorProps) {
  const [selectedWidget, setSelectedWidget] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleWidgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const widget = e.target.value;
    setSelectedWidget(widget);
    const color = widgets.find((w) => w.widget === widget)?.color || '';
    setSelectedColor(color);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <label htmlFor="widget-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select a Widget
      </label>
      <select
        id="widget-select"
        value={selectedWidget}
        onChange={handleWidgetChange}
        className="block w-full rounded-md border-2 border-indigo-500 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 py-2 px-3
          bg-white hover:border-indigo-600 transition-colors"
      >
        <option value="">Choose a widget...</option>
        {widgets.map((widget, index) => (
          <option key={index} value={widget.widget}>
            {widget.widget}
          </option>
        ))}
      </select>

      {selectedWidget && (
        <p className="mt-4 text-sm font-medium transition-colors" style={{ color: selectedColor }}>
          Selected widget: {selectedWidget}
        </p>
      )}
    </div>
  );
}
