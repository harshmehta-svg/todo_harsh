import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

/**
 * Custom hook for copying text to the clipboard.
 *
 * @returns {[boolean, (text: string) => Promise<void>]} A tuple where:
 * - The first element (`isCopied`) is a boolean indicating if the text was recently copied.
 * - The second element is a function to call with the text to copy.
 */
const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  // Reset the isCopied status after a certain period
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 3000); // Reset after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      toast.error('Clipboard API not supported by your browser.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success('Copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy text: ', error);
      toast.error('Failed to copy text.');
    }
  };

  return [isCopied, copy];
};

export default useClipboard;