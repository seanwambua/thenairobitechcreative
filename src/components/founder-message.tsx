import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function FounderMessage() {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/settings/founder-message')
      .then(res => res.json())
      .then(data => setMessage(data.value));
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/settings/founder-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: message }),
      });
      if (!response.ok) throw new Error('Failed to save message');
      toast({ title: 'Message saved', description: 'The founder\'s message has been successfully updated.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save message.' });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Founder's Message</h2>
      <textarea
        className="w-full p-2 border rounded-md"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
