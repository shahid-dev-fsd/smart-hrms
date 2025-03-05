import React, { useState } from "react";
import { TextField, Paper, List, ListItem, ListItemText } from "@mui/material";
import Loading from "../../../components/Loading";
import EmployeeAttendanceView from "./EmployeeAttendanceView";

export default function UserSpecificOperations() {
  const [isEmployeeFound, setIsEmployeeFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([
    "Clarkson Walter",
    "Alan Walter",
  ]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setShowDropdown(true);

    setTimeout(() => {
      if (query.trim() !== "") {
        const foundEmployees = employees.filter((employee) =>
          employee.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEmployees(foundEmployees);
      } else {
        setFilteredEmployees([]);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleEmployeeSelect = (employee) => {
    setSearchQuery(employee);
    setSelectedEmployee(employee);
    setShowDropdown(false); // Hide dropdown after selection
    setIsEmployeeFound(true); // Show EmployeeAttendanceView
  };

  return (
    <div className="w-full h-[42.75rem] flex flex-col items-center gap-3 py-3">
      {!isEmployeeFound ? (
        <>
          <div className="w-full relative">
            <TextField
              sx={{ width: "100%", margin: "0px" }}
              variant="outlined"
              label="Employees"
              placeholder="Employees"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {showDropdown && filteredEmployees.length > 0 && (
              <Paper className="absolute w-full mt-1 z-10">
                <List>
                  {filteredEmployees.map((employee, index) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() => handleEmployeeSelect(employee)}
                    >
                      <ListItemText primary={employee} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </div>
          {isLoading ? (
            <div className="h-full flex pl-7 justify-center items-center overflow-hidden">
              <Loading />
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {searchQuery.trim() === "" ? (
                <h1>Please begin typing to search for an employee</h1>
              ) : filteredEmployees.length === 0 ? (
                <h1>No matching employees found</h1>
              ) : null}
            </div>
          )}
        </>
      ) : (
        <>
          <EmployeeAttendanceView
            employeeName={selectedEmployee}
            back={() => {
              setIsEmployeeFound(false);
              setSearchQuery("");
              setSelectedEmployee("");
            }}
          />
        </>
      )}
    </div>
  );
}
