using Microsoft.AspNetCore.Mvc;
using MYRTEXTestTask.API.Data;
using MYRTEXTestTask.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace MYRTEXTestTask.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;

        public EmployeeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployees()
        {
            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Employee>>> CreateEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Employee>>> UpdateEmployee(Employee employee)
        {
            var dbEmployee = await _context.Employees.FindAsync(employee.Id);
            if (dbEmployee == null)
                return BadRequest("Employee not found.");

            dbEmployee.Department = employee.Department;
            dbEmployee.FullName = employee.FullName;
            dbEmployee.DateOfBirth = employee.DateOfBirth;
            dbEmployee.DateOfEmployment = employee.DateOfEmployment;
            dbEmployee.Salary = employee.Salary;

            await _context.SaveChangesAsync();

            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Employee>>> DeleteEmployee(int id)
        {
            var dbEmployee = await _context.Employees.FindAsync(id);
            if (dbEmployee == null)
                return BadRequest("Employee not found.");

            _context.Employees.Remove(dbEmployee);
            await _context.SaveChangesAsync();

            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpDelete("70Years")]
        public async Task<ActionResult> DeleteEmployeesAbove70YearsOld()
        {
            var employeesAbove70 = await _context.Employees.Where(e => e.DateOfBirth <= DateTime.Now.AddYears(-70)).ToListAsync();
            _context.Employees.RemoveRange(employeesAbove70);
            await _context.SaveChangesAsync();
            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpPut("Salary<15000")]
        public async Task<ActionResult> UpdateSalaries()
        {
            var employeesToUpdate = await _context.Employees.Where(e => e.Salary < 15000).ToListAsync();
            employeesToUpdate.ForEach(e => e.Salary = 15000);
            await _context.SaveChangesAsync();
            return Ok(await _context.Employees.ToListAsync());
        }
    }
}
