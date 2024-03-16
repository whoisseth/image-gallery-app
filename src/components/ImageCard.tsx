"use client";
import { Photo } from "@/type";
import React from "react";
import { TbCloudDownload } from "react-icons/tb";
import { useState } from "react";
import { saveAs } from "file-saver";
import Loading from "./Loading";
type Props = {
  photo: Photo;
};

export default function ImageCard({ photo }: Props) {
  return (
    <div className="relative mb-4   transition-all overflow-hidden break-inside-avoid group hover:brightness-95 ">
      <DownloadBtn photo={photo} />
      <img
        className="w-auto h-auto max-w-full max-h-full object-contain "
        height={500}
        width={500}
        src={photo.urls.regular}
        alt="img"
      />
    </div>
  );
}

function DownloadBtn({ photo }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function downloadImage(imageUrl: string, imageName: string) {
    try {
      setIsDownloading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      saveAs(blob, `${imageName}.png`);
    } catch {
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <button
      onClick={() => downloadImage(photo.urls.regular, photo.id)}
      className="bg-black/80  top-5 rounded-full hover:bg-black/50 right-5 absolute p-2 border"
    >
      {isDownloading ? (
        <Loading className="h-6 w-6" />
      ) : (
        <TbCloudDownload className="text-xl text-white " />
      )}
    </button>
  );
}
