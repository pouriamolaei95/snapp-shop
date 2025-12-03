import { useEffect, useState } from "react";
import { CUSTOM_EVENTS } from "../const";

export function useEventPoweredModalOpener(
  eventKey: keyof typeof CUSTOM_EVENTS
) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function showModal() {
      setIsOpen(true);
    }

    window.addEventListener(
      CUSTOM_EVENTS[eventKey],
      showModal as EventListener
    );
    return () => {
      window.removeEventListener(
        CUSTOM_EVENTS[eventKey],
        showModal as EventListener
      );
    };
  }, []);

  return [isOpen, setIsOpen] as const;
}
