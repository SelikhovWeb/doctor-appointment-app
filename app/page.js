"use client";

import { useEffect, useState } from "react";
import GlobalApi from "./_utils/GlobalApi";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import HeroSection from "./_components/HeroSection";

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((resp) => {
      setDoctorList(resp.data);
    });
  };
  return (
    <div>
      <HeroSection />
      <CategorySearch />
      <DoctorList list={doctorList} />
    </div>
  );
}
