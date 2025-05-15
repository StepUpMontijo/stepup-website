"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if a media query matches
 * @param query The media query to check (ex: "(max-width: 768px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // By default, assume we're not on mobile when on the server
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a MediaQueryList object
    const media = window.matchMedia(query);

    // Set the initial state
    setMatches(media.matches);

    // Define callback for media query changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener to detect media query changes
    // Use addListener for compatibility with older browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      media.addListener(listener);
    }

    // Clean up the listener when the component unmounts
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}
