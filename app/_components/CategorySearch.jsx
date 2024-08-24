"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";

const CategorySkeleton = () => (
  <div className="flex flex-col text-center items-center p-5 m-2 gap-2 rounded-lg bg-gray-100 animate-pulse h-[100px]" />
);

function CategorySearch() {
  const getCategoryList = () => {
    GlobalApi.getAllCategories().then((resp) => {
      setCategoryList(resp.data);
    });
  };

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="mb-10 flex flex-col items-center gap-2">
      <h2 className="font-bold text-4xl">
        Search <span className="primary">Doctors</span>
      </h2>
      <h5 className="text-gray-400 text-xl">
        Find the right doctor for you and book an appointment in minutes.
      </h5>
      <div className="flex items-center gap-4 md:w-1/2 w-full">
        <Input placeholder="Search for doctors" type="text" />
        <Button>
          <SearchIcon size={16} className="mr-2" />
          Search
        </Button>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-5 w-full justify-center overflow-x-auto overflow-y-hidden">
        {categoryList?.length ? (
          categoryList.map((category) => (
            <Link
              href={`/search/${category.attributes?.name.toLowerCase().replace(" ", "-")}`}
              key={category.id}
              className="flex flex-col text-center items-center p-5 m-2 gap-2 rounded-lg bg-gray-100
           hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out
            "
            >
              <Image
                src={category.attributes?.icon?.data?.attributes?.url}
                alt={category.attributes?.name}
                width={50}
                height={50}
              />
              <label className="text-primary text-sm cursor-pointer">
                {category.attributes?.name}
              </label>
            </Link>
          ))
        ) : (
          <>
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
          </>
        )}
      </div>
    </div>
  );
}

export default CategorySearch;
