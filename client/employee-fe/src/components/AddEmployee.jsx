import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const AddEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("")
    const [age, setAge] = useState()
    const [profession, setProfession] = useState("")

    const saveEmployee = (e) => {
        e.preventDefault();
        const employee = { name, profession, age }

        //Same component used for adding and editing employee's. 
        //Will execute update function if employee id is passed else will add new employee

        if (id) {
            EmployeeService.updateEmployee(id, employee)
                .then((res) => {

                    toast.success('Employee Updated !', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000
                    });

                    navigate("/employees")

                }).catch((err) => {
                    console.log(err)
                }
                )

        } else {
            EmployeeService.createEmployee(employee)
                .then((res) => {
                    toast.success('Employee Added !', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000
                    });
                    navigate("/employees")

                }).catch((err) => {
                    console.log(err)
                })

        }

    }

    useEffect(() => {
        EmployeeService.getEmployeeById(id)
            .then((res) => {
                setName(res.data.name)
                setProfession(res.data.profession)
                setAge(res.data.age)
            }).catch((err) => {
                console.log(err)
            })

    }, [])

    //Title will be set dynamically to Update or Add employee
    //based on if employee id is passed or not

    const title = () => {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        {title()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className='form-label'><b>Employee Name :</b></label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder='Name'
                                        className='form-control'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'><b>Employee Profession :</b></label>
                                    <input
                                        type="text"
                                        name="profession"
                                        placeholder='Profession'
                                        className='form-control'
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                    />

                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'><b>Employee Age :</b></label>
                                    <input
                                        type="text"
                                        name="age"
                                        placeholder='Age'
                                        className='form-control'
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />

                                </div>
                                <button
                                    className='btn btn-success'
                                    onClick={(e) => saveEmployee(e)}>
                                    Submit
                                </button>
                                <Link
                                    to="/employees"
                                    className='btn btn-danger ms-2'
                                >
                                    Cancel
                                </Link>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AddEmployee