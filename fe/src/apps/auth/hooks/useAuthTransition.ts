import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const TRANSITION_MS = 360;

const useAuthTransition = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const navigateWithTransition = (to: string) => {
    setIsExiting(true);
    timeoutRef.current = window.setTimeout(() => {
      navigate({ to });
    }, TRANSITION_MS);
  };

  return {
    isExiting,
    navigateWithTransition,
    transitionMs: TRANSITION_MS,
  };
};

export default useAuthTransition;
