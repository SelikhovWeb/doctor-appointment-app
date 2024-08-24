import Image from "next/image";
import React from "react";
import moment from "moment";
import { Calendar, Clock2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CancelAppointment from "./CancelAppointment";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

function BookingList({ bookings, isPast, updateList }) {
  const onBookingCancel = (id) => {
    console.log("Cancel Appointment", id);
    GlobalApi.deleteBooking(id).then(() => {
      toast.success("Appointment cancelled successfully");
      updateList();
    });
  };

  if (!bookings.length) return null;
  return (
    <div>
      {bookings?.map((booking) => {
        return (
          <div
            key={booking.id}
            className="flex items-center gap-4 p-4 border-b border-gray-200 bg-gray-50"
          >
            <div className="flex items-center gap-6">
              <Image
                src={
                  booking?.attributes?.doctor?.data?.attributes?.image?.data
                    ?.attributes?.url
                }
                width={48}
                height={48}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {booking?.attributes?.doctor?.data?.attributes?.name}
                </h3>
                <p className="text-gray-500">
                  {booking?.attributes?.doctor?.data?.attributes?.speciality}
                </p>
              </div>
              <div className="text-gray-500 flex items-center gap-2">
                <Calendar size={16} />
                {moment(booking?.attributes?.date).format("DD-MMM-YYYY")}
              </div>
              <div className="text-gray-500 flex items-center gap-2">
                <Clock2 size={16} />
                {booking?.attributes?.time}
              </div>
              {!isPast && (
                <CancelAppointment
                  onActionClick={() => onBookingCancel(booking?.id)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookingList;
