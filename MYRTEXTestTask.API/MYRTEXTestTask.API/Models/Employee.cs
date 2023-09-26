using System;

namespace MYRTEXTestTask.API.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Department { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfEmployment { get; set; }
        public decimal Salary { get; set; }
    }
}
