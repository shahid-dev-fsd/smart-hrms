import * as React from "react";
import ReporteesTable from "./ReporteesTable";

function createData(employee, status, designation, email, dateOfJoining) {
  return { employee, status, designation, email, dateOfJoining };
}

const rows = [
  createData(
    "Frozen yoghurt",
    "Not Yet Clocked-in",
    "Administration",
    "frozenyoghurt.com",
    "12-12-2024"
  ),
  createData(
    "Frozen yoghurt",
    "Not Yet Clocked-in",
    "Administration",
    "frozenyoghurt.com",
    "12-12-2024"
  ),
  createData(
    "Frozen yoghurt",
    "Not Yet Clocked-in",
    "Administration",
    "frozenyoghurt.com",
    "12-12-2024"
  ),
  createData(
    "Frozen yoghurt",
    "Not Yet Clocked-in",
    "Administration",
    "frozenyoghurt.com",
    "12-12-2024"
  ),
];

export default function DirectReporteesTableList() {
  return <ReporteesTable rows={rows} />;
}
