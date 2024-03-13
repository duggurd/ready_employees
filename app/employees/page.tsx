// import { useEffect, useState } from "react"
import Employee from "../../src/models"

import { Suspense } from "react"
import React from "react"

import EmployeeTable from "../../components/employeeTable"
import Loading from "./loading"


export default function Page() {    

    return (
        <div className="h-full">
            <Suspense fallback={ <Loading/> }>
 
                <EmployeeTable></EmployeeTable>
            </Suspense>
        </div>
    )
}