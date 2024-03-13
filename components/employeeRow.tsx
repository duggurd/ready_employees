import React, { useState } from "react";
import Employee from "../src/models";


function titleCase(str: String): String {

    const parts = str.split(" ");

    parts.map((part => {
        part.charAt(0).toUpperCase() + part.substring(1)
    }));

    return parts.join(" ");
}


export default function EmployeeRow(employee: Employee) {

    const [toggleCard, setToggleCard] = useState(false);

    function handleViewClick() {
        setToggleCard(!toggleCard);
    }


    return (  
        <tr key={employee.firstName + employee.lastName} className=" shadow-pink-950 shadow-lg rounded-xl ">
            <td> <b> { (employee.daysToBirthday == 0? "🎂 " :"").concat(titleCase(employee.firstName).toString()) } </b> </td>
            <td> <b> { titleCase(employee.lastName) } </b> </td>
            <td> { new Date(employee.birthday).toLocaleDateString() } </td>
            <td> { String(employee.ageYears) } </td>
            <td> { new Date(employee.nextBirthday).toLocaleDateString() } </td>
            <td> { String(employee.daysToBirthday) } </td>
            <td> 
                <button onClick={handleViewClick} className="border p-3 rounded-xl border-pink-950 hover:bg-pink-950">
                    Details
                </button> 
            </td>

            
            <td>{toggleCard? "Testing": ""}</td>
            
        </tr>
    )
}