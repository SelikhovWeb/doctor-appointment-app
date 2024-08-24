"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: "Home",
      url: "/",
    },
    {
      id: 2,
      name: "Explore",
      url: "/explore",
    },
    {
      id: 3,
      name: "Contact Us",
      url: "/contact",
    },
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex items-center justify-between p-4 shadow-sm ">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />
        <ul className="md:flex gap-8 hidden">
          {headerMenu.map((item) => (
            <Link href={item.url} key={item.id}>
              <li className="hover:text-primary hover:scale-105 cursor-pointer transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Image
                src={user?.picture}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <ul className="flex flex-col gap-2 ">
                <Link
                  href="/my-bookings"
                  className="p-2 hover:bg-gray-50 text-sm rounded-lg"
                >
                  <li>Bookings</li>
                </Link>
              </ul>
            </PopoverContent>
          </Popover>
          <LogoutLink>
            <Button variant="outline">Log Out</Button>
          </LogoutLink>
        </div>
      ) : (
        <LoginLink>
          <Button>Sign In</Button>
        </LoginLink>
      )}
    </div>
  );
}

export default Header;
