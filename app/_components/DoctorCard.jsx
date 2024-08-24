import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SkeletonCard = () => (
  <div className="border-[1px] rounded-lg p-3 animate-pulse">
    <div className="h-[200px] bg-gray-200 rounded-lg"></div>
    <div className="mt-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

function DoctorCard({ doctor }) {
  return (
    <div
      key={doctor.id}
      className="border-[1px] rounded-lg p-3 cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-300 ease-in-out"
    >
      <Image
        src={doctor.attributes?.image?.data?.attributes?.url}
        alt={doctor.attributes?.name}
        width={500}
        height={200}
        className="height-[200px] object-cover rounded-lg"
      />
      <div className="mt-3 items-baseline flex flex-col">
        <h3 className="text-sm bg-blue-100 p-1 rounded-full px-2 text-primary mb-2">
          {doctor.attributes?.categories.data[0].attributes?.name}
        </h3>
        <h3 className="font-bold">{doctor.attributes?.name}</h3>
        <h3 className="text-primary text-md">
          {doctor.attributes?.experience} of experience
        </h3>
        <h3 className="text-gray-500 text-sm font-thin mb-2">
          {doctor.attributes?.address}
        </h3>
        <Link href={`/details/${doctor.id}`} className="w-full">
          <Button
            variant="outline"
            className="rounded-full w-full text-primary border-primary text-sm"
          >
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;
