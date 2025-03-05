import React from "react";
import {
  Favorites,
  NewHires,
  Birthday,
  QuickLinks,
  EmployeeEngagement,
  WorkAnniversary,
  WeddingAnniversary,
  Announcements,
  LeaveReport,
  UpcomingHolidays,
  MyPendingTasks,
  LeaveOnToday,
} from "../../../components";

export default function MySpaceDashboard() {
  return (
    <div className="w-full h-full grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
      <Favorites />
      <NewHires />
      <Birthday />
      <QuickLinks />
      <EmployeeEngagement />
      <WorkAnniversary />
      <WeddingAnniversary />
      <Announcements />
      <LeaveReport />
      <UpcomingHolidays />
      <MyPendingTasks />
      <LeaveOnToday />
    </div>
  );
}
