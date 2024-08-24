"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import GlobalApi from "../../../_utils/GlobalApi";
import DoctorCard, { SkeletonCard } from "@/app/_components/DoctorCard";

function Search({ params }) {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctors();
  }, [params]);

  const getDoctors = () => {
    GlobalApi.getDoctorsByCategory(params.category).then((resp) => {
      setDoctorList(resp.data);
    });
  };

  return (
    <div>
      <div
        className="grid md:grid-cols-3 sm:grid-cols-2 gap-7 mt-5 w-full justify-center overflow-x-auto overflow-y-hidden
"
      >
        {doctorList?.length ? (
          doctorList.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <>
            <SkeletonCard />
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
