import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import { useLocation, useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {
    const location = useLocation();
    const selArray = location.state;
    let idArray = [];
    const navigate = useNavigate();

    // Employee details will be displayed according to selected checkboxes in homepage

    for (let i = 0; i < selArray.length; i++) {
        idArray.push(parseInt(selArray[i]))
    }
    const [employees, setEmployees] = useState([])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees()
            .then((res) => {
                setEmployees(res.data)

            }).catch(err => {
                console.log(err)
            })

    }

    useEffect(() => {
        getAllEmployees();
    }, [])

    console.log(employees, idArray)


    return (
        <div className='container'>
            <h1 className='text-center text-decoration-underline'>Employee Details</h1>
            <button
                className='btn btn-primary'
                onClick={() => navigate("/employees")}
            ><i class="fas fa-home me-2"></i>
                Home
            </button>

            {employees.map(employee => {

                if (idArray.includes(employee.id) || idArray.length == 0) {
                    return (
                        <div className="card mt-3" id="emp" >
                            <ul className="list-group list-group-flush ">
                                <li className="list-group-item"><b>Employee ID</b> : {employee.id}</li>
                                <li className="list-group-item"><b>Employee Name</b> : {employee.name}</li>
                                <li className="list-group-item"><b>Employee Profession</b> :{employee.profession}</li>
                                <li className="list-group-item"><b>Employee Age</b> : {employee.age}</li>
                            </ul>
                        </div>
                    )
                }
            })
            }


        </div>
    )
}

export default EmployeeDetails