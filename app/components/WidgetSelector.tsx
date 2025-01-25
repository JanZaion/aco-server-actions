'use client';

import { useState, useTransition } from 'react';
import { savePickedWidget } from '../actions';

type WidgetSelectorProps = {
  widgets: Widget[];
};

export default function WidgetSelector({ widgets }: WidgetSelectorProps) {
  const [selectedWidget, setSelectedWidget] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [lastPickedId, setLastPickedId] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const handleWidgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const widget = e.target.value;
    setSelectedWidget(widget);
    const color = widgets.find((w) => w.widget === widget)?.color || '';
    setSelectedColor(color);
    console.log(
      '\x1b[32m%s\x1b[0m',
      '<--- we pick widget on the client, so we can see this in the browser console --->'
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedWidget) return;

    startTransition(async () => {
      // This action runs on the server
      const result = await savePickedWidget(selectedWidget);
      if (result.success && result.id) {
        setLastPickedId(result.id);
      }
      setSelectedWidget('');
      setSelectedColor('');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6">
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
        required
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

      {lastPickedId && <p className="mt-2 text-sm text-gray-600">Widget Picked Successfully</p>}

      <button
        type="submit"
        disabled={!selectedWidget || isPending}
        className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 
          rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 
          disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Saving...' : 'Save Selection'}
      </button>
    </form>
  );
}
