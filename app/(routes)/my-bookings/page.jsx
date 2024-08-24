"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function MyBookings() {
  const { user } = useKindeBrowserClient();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) getUserBookings();
  }, [user]);

  const getUserBookings = async () => {
    GlobalApi.getUserBookings(user?.email).then((data) => {
      setBookings(data.data);
    });
  };

  const filterBookingsByDate = (bookings, type) => {
    const result = bookings.filter((booking) => {
      const bookingDate = new Date(booking?.attributes?.date);
      const currentDate = new Date();
      if (type === "upcoming") {
        return bookingDate > currentDate;
      } else {
        return bookingDate < currentDate;
      }
    });
    return result;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">My Bookings</h2>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList
            bookings={filterBookingsByDate(bookings, "upcoming")}
            updateList={getUserBookings}
            isPast={false}
          />
        </TabsContent>
        <TabsContent value="past">
          <BookingList
            bookings={filterBookingsByDate(bookings, "past")}
            isPast
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBookings;
