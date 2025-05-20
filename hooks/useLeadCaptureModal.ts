import { useState, useEffect } from "react";

export function useLeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown before
    const hasModalBeenShown = localStorage.getItem("leadCaptureModalShown");

    if (!hasModalBeenShown) {
      // Show the modal after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("leadCaptureModalShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    closeModal,
  };
}
