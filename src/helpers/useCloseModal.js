import { useEffect, useRef } from "react";

const useCloseModal = (open, setOpen) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [open, setOpen]);
  return ref;
};

export default useCloseModal;
