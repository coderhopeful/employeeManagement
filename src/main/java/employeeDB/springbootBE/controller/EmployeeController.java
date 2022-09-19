package employeeDB.springbootBE.controller;


import employeeDB.springbootBE.exception.ResourceNotFoundException;
import employeeDB.springbootBE.model.Employee;
import employeeDB.springbootBE.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:3000/"})
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }
    //build create employee API
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }
    //build get employee by ID
    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee ID:"+id+"does not exist!"));
        return ResponseEntity.ok(employee);
    }

    //build update employee by ID
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployeeById(@PathVariable long id,@RequestBody Employee employeeDetails){
        Employee updateEmployee = employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee ID:"+id+"does not exist!"));
        updateEmployee.setName(employeeDetails.getName());
        updateEmployee.setProfession(employeeDetails.getProfession());
        updateEmployee.setAge(employeeDetails.getAge());

        employeeRepository.save(updateEmployee);
        return ResponseEntity.ok(updateEmployee);
    }

    //build delete employee by ID
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id){
        Employee employee=employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee ID:"+id+"does not exist!"));
        employeeRepository.delete(employee);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
