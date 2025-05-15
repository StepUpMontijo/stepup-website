"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X } from "lucide-react";
import HandwrittenUnderline from "@/components/handwritten-underline";
import { useIsMounted } from "@/hooks/useIsMounted";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
  clickPosition?: { x: number; y: number };
}

const ImageModal = ({ src, alt, onClose, clickPosition }: ImageModalProps) => (
  <div
    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    onClick={onClose}
    style={{
      animation: "fadeIn 0.3s ease-out",
    }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div
      className="relative max-w-7xl w-full mx-auto"
      style={{
        animation: clickPosition
          ? "zoomFromPoint 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          : "scaleIn 0.3s ease-out",
        transformOrigin: clickPosition
          ? `${clickPosition.x}px ${clickPosition.y}px`
          : "center",
      }}
    >
      <button
        onClick={onClose}
        className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-all duration-300 hover:scale-110 hover:rotate-90 transform"
        aria-label="Close modal"
      >
        <X className="w-8 h-8" />
      </button>
      <div
        className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/30"
        onClick={(e) => e.stopPropagation()}
      >
        <span id="modal-title" className="sr-only">
          {alt}
        </span>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>
    </div>
  </div>
);

const ImageCard = ({
  src,
  alt,
  title,
  description,
  onImageClick,
  className = "",
  roundedCorners = "all", // "all" | "left" | "right"
  priority = false,
}: {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  onImageClick: (e: React.MouseEvent) => void;
  className?: string;
  roundedCorners?: "all" | "left" | "right";
  priority?: boolean;
}) => {
  const t = useTranslations("HomePage.gallery");

  const getRoundedClass = () => {
    switch (roundedCorners) {
      case "left":
        return "rounded-l-2xl";
      case "right":
        return "rounded-r-2xl";
      default:
        return "rounded-2xl";
    }
  };

  return (
    <div
      className={`bg-white shadow-md overflow-hidden ${getRoundedClass()} ${className}`}
    >
      <div
        className="relative h-72 cursor-pointer group"
        onClick={onImageClick}
        role="button"
        tabIndex={0}
        aria-label={`${t("viewFullSize")} ${alt}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onImageClick(e as unknown as React.MouseEvent);
          }
        }}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center transform">
          <span className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
            {t("clickToEnlarge")}
          </span>
        </div>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-500 group-hover:scale-105"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      {(title || description) && (
        <div className="p-6">
          {title && (
            <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
          )}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}
    </div>
  );
};

export default function SchoolImages() {
  const t = useTranslations("HomePage.gallery");
  const isMounted = useIsMounted();
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    clickPosition?: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes scaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes zoomFromPoint {
        0% {
          transform: scale(0.1);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleImageClick =
    (image: string, alt: string) => (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      setSelectedImage({
        src: image,
        alt,
        clickPosition: { x: clickX, y: clickY },
      });
    };

  if (!isMounted) return null;

  return (
    <>
      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
          clickPosition={selectedImage.clickPosition}
        />
      )}
      <section className="py-16 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              <HandwrittenUnderline
                text={t("title")}
                highlightText={t("title")}
                delay={0.5}
                color="#3b82f6"
              />
            </h2>
            <p className="text-xl text-gray-600">{t("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            {/* Room and exterior images - primary images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageCard
                src="/images/school-images/room.webp"
                alt={t("room.alt")}
                title={t("room.title")}
                description={t("room.description")}
                onImageClick={handleImageClick(
                  "/images/school-images/room.webp",
                  t("room.alt")
                )}
                priority={true}
              />
              <ImageCard
                src="/images/school-images/exterior.webp"
                alt={t("exterior.alt")}
                title={t("exterior.title")}
                description={t("exterior.description")}
                onImageClick={handleImageClick(
                  "/images/school-images/exterior.webp",
                  t("exterior.alt")
                )}
                priority={true}
              />
            </div>

            {/* Activity images - secondary images that can be lazy loaded */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <ImageCard
                  src="/images/school-images/act1.webp"
                  alt={t("studentActivity.alt")}
                  onImageClick={handleImageClick(
                    "/images/school-images/act1.webp",
                    t("studentActivity.alt")
                  )}
                  className="shadow-none"
                  roundedCorners="left"
                  priority={false}
                />
                <ImageCard
                  src="/images/school-images/act2.webp"
                  alt={t("studentActivity.alt2")}
                  onImageClick={handleImageClick(
                    "/images/school-images/act2.webp",
                    t("studentActivity.alt2")
                  )}
                  className="shadow-none"
                  roundedCorners="right"
                  priority={false}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {t("studentActivity.title")}
                </h3>
                <p className="text-gray-600">
                  {t("studentActivity.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
