import { createPortal } from "react-dom";

export function ImageOverlay({ src, onClose }: { src: string; onClose: () => void }) {
  if (!src) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 cursor-zoom-out"
      onClick={onClose}
    >
      <img
        src={src}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        alt=""
      />
    </div>,
    document.getElementById("overlay-root")!
  );
}
