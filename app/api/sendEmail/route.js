import { Resend } from "resend";
import { NextResponse } from "next/server";
import { BookAppointmentEmail } from "@/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json();
  console.log("Response", response);

  try {
    const data = await resend.emails.send({
      from: "info@selikhov.site",
      to: [response.data.email],
      subject: "Booking Appointment Info",
      react: BookAppointmentEmail({ response }),
    });

    console.log("Email sent", data);

    return NextResponse.json(data);
  } catch (error) {
    console.log("Failed to", error);
    return NextResponse.error("Failed to send email", error);
  }
}
