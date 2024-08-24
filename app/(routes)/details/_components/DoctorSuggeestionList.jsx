import React, { useEffect } from "react";
import { useState } from "react";
import GlobalApi from "../../../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

function DoctorSuggeestionList() {
  const params = useParams();

  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((resp) => {
      const filteredList = resp.data.filter(
        (doctor) => doctor.id != params?.recordId
      );

      setDoctorList(filteredList);
    });
  };

  return (
    <div className="p-4 border-[1px] rounded-xl">
      <h2 className="text-lg font-bold">Suggestions</h2>
      {doctorList.map((doctor) => (
        <Link href={`/details/${doctor.id}`}>
          <div
            key={doctor.id}
            className="flex items-center gap-3 mb-4 p-3  cursor-pointer hover:bg-slate-50 rounded-lg"
          >
            <Image
              width={48}
              height={48}
              src={doctor?.attributes?.image?.data?.attributes?.url}
              alt="doctor-suggestion-image"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold">{doctor?.attributes?.name}</h2>
              <h3 className="text-sm bg-blue-100 p-1 rounded-full px-2 text-primary mb-2 w-fit">
                {doctor?.attributes?.categories.data[0].attributes?.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DoctorSuggeestionList;
