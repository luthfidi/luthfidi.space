"use client";

import { useState } from "react";
import { IoPlay as PlayIcon } from "react-icons/io5";

import Image from "@/common/components/elements/Image";

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

const VideoPlayer = ({ videoId, title }: VideoPlayerProps) => {
  const [isActivated, setIsActivated] = useState(false);

  if (isActivated) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={`${title} demo video`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsActivated(true)}
      className="group relative block w-full overflow-hidden rounded-xl"
      aria-label={`Play ${title} demo video`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={`${title} demo video thumbnail`}
        width={1280}
        height={720}
        className="w-full transition duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/50">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
          <PlayIcon size={28} className="translate-x-[2px]" />
        </span>
      </div>
      <div className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
        Watch demo video
      </div>
    </button>
  );
};

export default VideoPlayer;
