import Image from "next/image";
import React from "react";
import DoctorCard, { SkeletonCard } from "../_components/DoctorCard";

function DoctorList({ list }) {
  return (
    <div className="mb-10">
      <h2 className="font-bold text-4xl">
        Popular <span className="">Doctors</span>
      </h2>
      <div
        className="grid md:grid-cols-3 sm:grid-cols-2 gap-7 mt-5 w-full justify-center overflow-x-auto overflow-y-hidden
      "
      >
        {list?.length ? (
          list.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
        ) : (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
    </div>
  );
}

export default DoctorList;
