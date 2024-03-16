"use client";
import EmployeeTable from "../../components/employeeTable";
import React from "react";
import Employee from "../../src/models";

export default function Loading() {
  let dummy: Employee[] = [
    {
      firstName: "loading...",
      lastName: "laoding...",
      profileImage: "http://somewhere.com/someimage.png",
      birthday: new Date(1111, 1, 1).toISOString(),
      ageYears: 0,
      nextBirthday: new Date(1111, 1, 1).toISOString(),
      daysToBirthday: 0,
    },
  ];

  return (
    <div>
      <EmployeeTable />
    </div>
  );
}
