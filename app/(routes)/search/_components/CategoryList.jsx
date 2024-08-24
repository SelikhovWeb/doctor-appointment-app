"use client";
import React from "react";
import { useEffect, useState } from "react";
import GlobalApi from "../../../_utils/GlobalApi";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

function CategoryList() {
  const params = useParams();
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = () => {
    GlobalApi.getAllCategories().then((resp) => {
      setCategoryList(resp.data);
    });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="">
      <Command>
        <CommandInput placeholder="Search for a speciality" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Specialities" className="">
            {categoryList.map((category) => (
              <Link
                href={`
                /search/${category.attributes?.name.toLowerCase().replace(" ", "-")}
              `}
                className="h-8"
                key={category.id}
              >
                <CommandItem
                  key={category.id}
                  className={`h-8 cursor-pointer flex items-center gap-2 hover:bg-gray-100
                    ${params?.category.toLowerCase() === category.attributes?.name.toLowerCase() ? "bg-gray-100" : ""}
                  `}
                >
                  <Image
                    src={category.attributes?.icon?.data?.attributes?.url}
                    alt={category.attributes?.name}
                    width={20}
                    height={20}
                  />
                  {category.attributes.name}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default CategoryList;
