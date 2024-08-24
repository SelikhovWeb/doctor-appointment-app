import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

function BookAppointment({ doctor }) {
  const userData = useKindeBrowserClient();
  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
  ];
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [note, setNote] = useState("");

  const isPastDate = (date) => {
    return date <= new Date();
  };

  const submitAppointment = () => {
    const data = {
      data: {
        username: `${userData.user.given_name} ${userData.user.family_name}`,
        email: userData.user.email,
        doctor: doctor.id,
        date: selectedDate,
        time: selectedTimeSlot,
        note: note,
      },
    };
    GlobalApi.createAppointment(data)
      .then((resp) => {
        console.log("Response1", resp);

        if (resp) {
          GlobalApi.sendEmail(data)
            .then((resp) => {
              console.log("Response2", resp);
              toast.success(
                "Appointment submitted. Check your email for confirmation."
              );
            })
            .catch((err) => {
              console.log("Error:", err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        setNote("");
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-[300px] rounded-full">Book Now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Book Appointment</DialogTitle>
          <DialogDescription>
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarDays size={24} />
                    <h3>Select Date</h3>
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={isPastDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="flex flex-col gap-4 md:pl-4">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock size={24} />
                      <h3>Select Time Slot</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {timeSlots.map((timeSlot) => (
                        <Button
                          key={timeSlot}
                          onClick={() => setSelectedTimeSlot(timeSlot)}
                          className={`
                            w-full
                            rounded-full
                            hover:text-white
                            ${
                              selectedTimeSlot === timeSlot
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-600"
                            }
                          `}
                        >
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Textarea
              placeholder="Add a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full"
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            disabled={!(selectedTimeSlot && selectedDate)}
            onClick={() => submitAppointment()}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
