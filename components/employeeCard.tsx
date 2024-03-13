import Employee from "../src/models"
import React from "react"

export default function EmployeeCard(employee: Employee) {
    return employee? (
        <div className="fixed inset-24 bg-black bg-opacity-30">
            <button className="border p-4 w-16 h-16 font-bold text-xl rounded-xl">X</button>
            <p>
                { employee.firstName + " "  + employee.lastName }
            </p>
            <p>
                {employee.birthday}
            </p>
        </div>
    ): <p>Banan</p>
}