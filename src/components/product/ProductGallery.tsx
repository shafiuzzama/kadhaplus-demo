"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryImage = { src: string; alt: string };

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = images.length;

  const go = useCallback(
    (next: number) => setActive((next + total) % total),
    [total],
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-5">
        {/* Main stage */}
        <MainStage
          image={images[active]}
          index={active}
          onPrev={() => go(active - 1)}
          onNext={() => go(active + 1)}
          onOpen={() => setLightbox(true)}
          hasSiblings={total > 1}
        />

        {/* Thumbnails: horizontal on mobile, vertical rail on desktop */}
        <ul
          className="flex gap-3 overflow-x-auto pb-1 lg:w-[88px] lg:flex-col lg:overflow-visible lg:pb-0"
          aria-label="Product image thumbnails"
        >
          {images.map((img, i) => {
            const on = i === active;
            return (
              <li key={img.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}: ${img.alt}`}
                  aria-current={on}
                  className={`relative block h-[72px] w-[72px] overflow-hidden rounded-xl bg-cream-50 ring-1 transition-all lg:h-20 lg:w-20 ${
                    on
                      ? "ring-2 ring-herbal-600 ring-offset-1"
                      : "ring-herbal-100 hover:ring-herbal-300"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-contain p-1"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={images}
            index={active}
            onClose={() => setLightbox(false)}
            onIndex={setActive}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------- Main image with hover-zoom ------------- */
function MainStage({
  image,
  index,
  onPrev,
  onNext,
  onOpen,
  hasSiblings,
}: {
  image: GalleryImage;
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onOpen: () => void;
  hasSiblings: boolean;
}) {
  const [origin, setOrigin] = useState("50% 50%");
  const [zooming, setZooming] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div className="relative flex-1">
      <div
        ref={boxRef}
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={onMove}
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label="Open full-size product image"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
          if (e.key === "ArrowLeft") onPrev();
          if (e.key === "ArrowRight") onNext();
        }}
        className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-3xl border border-herbal-100 bg-gradient-to-b from-white to-cream-50 shadow-card"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-contain p-5 transition-transform duration-200 ease-out sm:p-8"
              style={{
                transformOrigin: origin,
                transform: zooming ? "scale(1.9)" : "scale(1)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* zoom hint */}
        <span className="pointer-events-none absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-herbal-700 opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100">
          <ZoomIn className="h-3.5 w-3.5" /> Hover to zoom · click to expand
        </span>
      </div>

      {/* arrows */}
      {hasSiblings &&
        (
          [
            { dir: "prev", onClick: onPrev, Icon: ChevronLeft, cls: "left-3" },
            { dir: "next", onClick: onNext, Icon: ChevronRight, cls: "right-3" },
          ] as const
        ).map(({ dir, onClick, Icon, cls }) => (
          <button
            key={dir}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            aria-label={dir === "prev" ? "Previous image" : "Next image"}
            className={`absolute top-1/2 ${cls} z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-herbal-100 bg-white/90 text-herbal-700 shadow-sm backdrop-blur transition-colors hover:bg-white`}
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
    </div>
  );
}

/* --------------------------------- Lightbox ------------------------------- */
function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const total = images.length;
  const img = images[index];

  const move = useCallback(
    (d: number) => {
      setZoomed(false);
      onIndex((index + d + total) % total);
    },
    [index, total, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, move]);

  function toggleZoom(e: React.MouseEvent) {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
    setZoomed((z) => !z);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col bg-herbal-950/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white/90 sm:px-6">
        <span className="text-sm font-medium">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {total > 1 && (
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous image"
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-5"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          className={`relative h-full max-h-[72vh] w-full max-w-4xl overflow-hidden ${
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={toggleZoom}
        >
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            className="object-contain transition-transform duration-300 ease-out"
            style={{
              transformOrigin: origin,
              transform: zoomed ? "scale(2.2)" : "scale(1)",
            }}
          />
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next image"
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      <div
        className="px-4 pb-4 pt-2 text-center sm:pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-3 text-sm text-white/70">{img.alt}</p>
        <ul className="mx-auto flex max-w-full justify-start gap-2 overflow-x-auto sm:justify-center">
          {images.map((t, i) => (
            <li key={t.src} className="shrink-0">
              <button
                type="button"
                onClick={() => {
                  setZoomed(false);
                  onIndex(i);
                }}
                aria-label={`Image ${i + 1}`}
                className={`relative block h-14 w-14 overflow-hidden rounded-lg bg-white/10 ring-1 transition-all ${
                  i === index
                    ? "ring-2 ring-white"
                    : "ring-white/20 hover:ring-white/50"
                }`}
              >
                <Image
                  src={t.src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-contain p-0.5"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
