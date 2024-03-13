"use client"

import { useEffect, useState } from "react"
import React from "react"

import Employee from "../src/models"
import EmployeeCard from "./employeeCard"
import EmployeeRow from "./employeeRow";


// export default async function EmployeeTable({employees}: {employees: Employee[]}) {

export default function EmployeeTable() {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [ageSort, setAgeSort] = useState(false);
    const [todayBdFilter, setTodayBdFilter] = useState(false);
    const [toggleCard, setToggleCard] = useState(false);

    async function fetchEmployees () {
        setLoading(true);
        try {
            let arcEp = process.env.NEXT_PUBLIC_ARCHITECT_ENDPOINT;

            // console.log(arcEp);
            
            // const response = await fetch(arcEp + "/birthdays");

            const response = await fetch(arcEp + "/birthdays", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                },
                body: JSON.stringify({
                    "ageSort": ageSort? "asc": "desc",
                    "bdToday": todayBdFilter
                })
            });


            
            if (!response.ok) {
                throw new Error('Api call failed')
            }

            const responseData: Employee[] = await response.json();

            setEmployees(responseData);
            setLoading(false);

        } catch(error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    function handleAgeFilter() {
        setAgeSort(!ageSort);
        // fetchEmployees();
    }
    
    function handleBdTodayFilter() {
        setTodayBdFilter(!todayBdFilter);
        // fetchEmployees();
    }


    useEffect(() => {
        fetchEmployees();    
    }, [ageSort, todayBdFilter])

    if (loading == true) {
        return <p>loading ...</p>
    }

    return (
        <div className="">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-10">Employee Birthdays</h1>
                <div className="">
                    <button  onClick={handleAgeFilter} className="p-5 m-2 min-w-60 rounded-xl shadow-sm shadow-pink-200 hover:bg-pink-950 hover:bg-opacity-40">
                        Sort Age: { ageSort? "Asc": "Desc" }
                    </button>
                    
                    <button  onClick={handleBdTodayFilter} className="p-5 m-2 min-w-60 rounded-xl shadow-sm shadow-pink-200 hover:bg-pink-950 hover:bg-opacity-40">
                        Todays Birthdays: { String(todayBdFilter) }
                    </button>
                </div>
                <div className="text-left w-full">
                    <table className="w-full border-spacing-5 border-separate ">
                        <thead className="">
                            <tr className="border-pink-950  border-solid">
                                <th className="">First Name</th>
                                <th className="">Last Name</th>
                                <th>Birthdate</th>
                                <th>Age</th>
                                <th>Next Birthday</th>
                                <th>Days left to birthday</th>
                            </tr>
                        </thead>
                        <tbody>
                        {employees.map((employee) => (
                            <EmployeeRow key={employee.firstName + employee.lastName} {...employee}></EmployeeRow>
                        ))}
                        </tbody>
                        {/* {employee && (
                            <EmployeeCard {...employee}/>
                        )}  */}
                    </table>


                </div>
            </div> 
        </div>
    )
}
