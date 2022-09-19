import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

const ListEmployees = () => {

    const [employees, setEmployees] = useState([])
    const [isChecked, setisChecked] = useState([]);

    const navigate = useNavigate();


//Loads all the employee details on page render
    useEffect(() => {
        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees()
            .then((res) => {
                setEmployees(res.data)

            }).catch(err => {
                console.log(err)
            })

    }

    //delete employees by id
    const deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId)
            .then((res) => {
                getAllEmployees();
                toast.error('Employee Deleted!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose:2000
                });
            }).catch((err) => {
                console.log(err)
            })
    }

    //all the checked employee id's are stored in an array
    const handlecheckbox = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setisChecked([...isChecked, value]);
        } else {
            setisChecked(isChecked.filter((e) => e !== value));
        }

    }

   //function to handle multiple deletes 
    const handleDelete = () => {
        for(let i=0;i<isChecked.length;i++){
            EmployeeService.deleteEmployee(parseInt(isChecked[i]))
            .then((res) => {
                getAllEmployees();
                toast.error('Employee(s) Deleted!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose:2000
                });
                
            }).catch((err) => {
                console.log(err)
            })

        }
       
    }

    return (
        <div className="container emp pt-2">
           

            <div className="buttonGroup">

                <Link to="/add-employee" className="btn btn-primary">Add Employee<i className="fas fa-user-plus ms-2"></i></Link>

                
                <button
                    className="btn btn-success"
                    onClick={() => navigate("/employee-details", { state: isChecked })}
                >Get Details
                    <i className="fas fa-info-circle ms-2"></i>
                </button>
                <button
                    className='btn btn-danger'
                    onClick={()=>handleDelete()}
                >Delete Selected
                    <i className="fas fa-trash-alt ms-2"></i>
                </button>
            </div>
            <table className='table table-bordered table-striped employeeTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Profession</th>
                        <th>Age</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        employees.map(
                            employee =>
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.profession}</td>
                                    <td>{employee.age}</td>
                                    <td className='actions'>
                                        <Link
                                            className='btn btn-warning'
                                            to={`/edit-employee/${employee.id}`}
                                        >
                                            Update<i className="fas fa-edit ps-2"></i>
                                        </Link>
                                        <button
                                            className="btn btn-danger ms-3 text-white"
                                            onClick={() => { deleteEmployee(employee.id) }}>
                                            Delete<i className="fas fa-trash-alt ps-2 text-white"></i>
                                        </button>
                                        <input 
                                        type='checkbox' 
                                        value={employee.id} 
                                        onChange={(e) => handlecheckbox(e)} />
                                    </td>
                                </tr>
                        )
                    }

                </tbody>

            </table>
        </div>
    )
}

export default ListEmployees