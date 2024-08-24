"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import { GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import DoctorSuggeestionList from "../_components/DoctorSuggeestionList";
import BookAppointment from "../_components/BookAppointment";

const DoctorDetail = ({ doctor }) => (
  <div className="border-[1px] p-5 rounded-xl">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <Image
          src={doctor?.attributes?.image?.data?.attributes?.url}
          alt="doctor-image"
          width={200}
          height={200}
          className="rounded-lg w-full"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2 items-baseline">
        <h2 className="text-2xl font-bold">{doctor?.attributes?.name}</h2>
        <h3 className="flex items-center gap-2">
          <GraduationCap size={16} />
          <span>{doctor?.attributes?.experience} of experience</span>
        </h3>
        <h3 className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} />
          <span>{doctor?.attributes?.address}</span>
        </h3>
        <h3 className="text-sm bg-blue-100 p-1 rounded-full px-2 text-primary mb-2">
          {doctor?.attributes?.categories.data[0].attributes?.name}
        </h3>

        <BookAppointment doctor={doctor} />
      </div>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-4">About</h2>
      <BlocksRenderer content={doctor?.attributes?.about} />
    </div>
  </div>
);

function Details({ params }) {
  const [doctor, setDoctor] = useState({});

  const getDoctorById = async (id) => {
    const doctorData = await GlobalApi.getDoctorById(id);
    setDoctor(doctorData.data);
  };

  useEffect(() => {
    getDoctorById(params.recordId);
  }, [params.recordId]);

  if (!doctor.attributes) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-5 md:px-20">
      <h2 className="text-2xl font-bold mb-8">Doctor Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-3">
          <DoctorDetail doctor={doctor} />
        </div>

        <div className="col-span-1">
          <DoctorSuggeestionList />
        </div>
      </div>
    </div>
  );
}

export default Details;
