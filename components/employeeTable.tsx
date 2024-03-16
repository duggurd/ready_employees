"use client";

import { Suspense, useEffect, useState } from "react";
import React from "react";

import Employee from "../src/models";
import EmployeeCard from "./employeeCard";
import EmployeeRow from "./employeeRow";
import LoadingIcon from "./loadingIcon";

// export default async function EmployeeTable({employees}: {employees: Employee[]}) {

export default function EmployeeTable() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [ageSort, setAgeSort] = useState(false);
  const [todayBdFilter, setTodayBdFilter] = useState(false);
  //   const [toggleCard, setToggleCard] = useState(false);
  const [totalCount, setTotalCount] = useState(-1);

  let dummy: Employee = {
    firstName: "loading...",
    lastName: "laoding...",
    profileImage: "http://somewhere.com/someimage.png",
    birthday: new Date(0, 0, 0).toISOString(),
    ageYears: 0,
    nextBirthday: new Date(0, 0, 0).toISOString(),
    daysToBirthday: 0,
  };

  async function fetchEmployees() {
    setLoading(true);

    try {
      let arcEp = process.env.NEXT_PUBLIC_ARCHITECT_ENDPOINT;

      const response = await fetch(arcEp + "/birthdays", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
          ageSort: ageSort ? "asc" : "desc",
          bdToday: todayBdFilter,
        }),
      });

      if (!response.ok) {
        throw new Error("Api call failed");
      }

      const responseData: Employee[] = await response.json();

      setEmployees(responseData);

      // Setting the total number of records available on first exec only
      if (totalCount == -1) {
        setTotalCount(responseData.length);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, [ageSort, todayBdFilter]);

  return (
    <div className="">
      {loading ? <LoadingIcon /> : null}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10">Employee Birthdays</h1>
        <div className="">
          <button
            onClick={() => setAgeSort(!ageSort)}
            className="p-5 m-2 min-w-60 rounded-xl shadow-sm shadow-pink-200 hover:bg-pink-950 hover:bg-opacity-40"
          >
            Sort Age: {ageSort ? "Asc" : "Desc"}
          </button>

          <button
            onClick={() => setTodayBdFilter(!todayBdFilter)}
            className="p-5 m-2 min-w-60 rounded-xl shadow-sm shadow-pink-200 hover:bg-pink-950 hover:bg-opacity-40"
          >
            Todays Birthdays: {String(todayBdFilter)}
          </button>
        </div>
        <div className="text-left w-full">
          <div className="text-center m-3">
            {loading ? (
              <div>Showing 0/0 records</div>
            ) : (
              <div>
                Showing {employees.length}/{totalCount} records
              </div>
            )}
          </div>
          <table className="w-full border-spacing-5 border-separate ">
            <thead className="">
              <tr className="border-pink-950  border-solid">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Birthdate</th>
                <th>Age</th>
                <th>Next Birthday</th>
                <th>Days left to birthday</th>
              </tr>
            </thead>
            <tbody>
              <Suspense fallback={<EmployeeRow {...dummy}> </EmployeeRow>}>
                {employees.map((employee) => (
                  <EmployeeRow
                    // need unique id/key here...
                    key={`${employee.firstName}${employee.lastName}`}
                    {...employee}
                  ></EmployeeRow>
                ))}
              </Suspense>
            </tbody>
            {/* {employee && (
                            <EmployeeCard {...employee}/>
                        )}  */}
          </table>
        </div>
      </div>
    </div>
  );
}
