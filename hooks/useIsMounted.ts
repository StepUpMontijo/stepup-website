"use client";

import { useState, useEffect } from "react";

/**
 * Hook to check if the component is mounted on the client
 * Useful to avoid hydration issues with SSR
 * @returns boolean indicating if the component is mounted
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return isMounted;
}

/**
 * Hook to manage entry animations based on the mounting state
 * @param delay Optional delay in ms before showing the component
 * @returns Object with mounting state and visibility
 */
export function useAnimatedMount(delay = 100) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timer);
      setIsMounted(false);
    };
  }, [delay]);

  return { isMounted, isVisible };
}
