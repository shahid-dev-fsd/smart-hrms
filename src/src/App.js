import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./utilities/axios";
import Header from "./components/Header";
import Home from "./pages/Home";
import JobListingHome from "./pages/JobListing/JobListingHome";
import ReceivedApp from "./pages/ReceivedApp/ReceivedApp";
import ShowMoreHome from "./pages/ReceivedApp/ShowMoreHome";
import SendOfferHome from "./pages/ReceivedApp/Steps/sendOfferHome";
import DeptHome from "./pages/Departments/DeptHome";
import InterviewHome from "./pages/Interview/interviewHome";
import EditHome from "./pages/JobListing/EditHome";
import OfferHome from "./pages/ReceivedApp/Steps/OfferHome";
import AgreementHome from "./pages/ReceivedApp/Steps/agreements/AgreementHome";
import NoticeHome from "./pages/NoticeBoard/NoticeHome";
import Apps from "./pages/Apps";
import EmployeeHome from "./pages/Employee/EmployeeHome";
import PerformanceHome from "./pages/Employee/PerformanceHome";
import EmpDetailsHome from "./pages/Employee/EmployeeDetails/EmpDetailsHome";
import AttendHome from "./pages/Attendance/AttendHome";
import AttendViewHome from "./pages/Attendance/AttendView/AttendViewHome";
import LeaveSettingsHome from "./pages/Attendance/AttendView/LeaveSetting/LeaveSettingHome";
import LeaveAppHome from "./pages/Attendance/AttendView/LeaveAppPage.jsx/LeaveAppHome";
import LeaveViewHome from "./pages/Attendance/AttendView/LeaveAppPage.jsx/LeaveViewHome";
import ExpensesHome from "./pages/Expenses/ExpensesHome";
import AwardHome from "./pages/Award/AwardHome";
import HolidayHome from "./pages/Holiday/HolidayHome";
import AddPayrollHome from "./pages/Payrolls/AddPayHome";
import MorePayrollHome from "./pages/Payrolls/MorePayHome";
import Footer from "./pages/Footer";
import EditPayrollHome from "./pages/Payrolls/EditPayHome";
import MoreEditPayrollHome from "./pages/Payrolls/MoreEPayHome";
import SalaryHome from "./pages/Payrolls/SalaryHome";
import JobApplicationDetail from "./pages/JobApplicationDetail";
import Agreements from "./pages/Agreements";
import OfferLetter from "./pages/OfferLatter";
import RuleAndRegulations from "./pages/Rules&Regulations";
import WalkoverHeader from "./pages/Walkover/Walkover";
import Dashboard from "./pages/Projects/Dashboard";
import NewProject from "./pages/Projects/NewProject";
import OverTime from "./pages/Projects/OverTimeCalender";
import OverViewCalender from "./pages/Projects/OverViewCalender";
import ViewProject from "./pages/Projects/ViewProject";
import Calender from "./pages/Projects/Calender";
import TicketList from "./pages/Support_System/UserPage/Tikects/TicketList";
import Profile from "./pages/Support_System/UserPage/profile/Profile";
import DashBoard from "./pages/Support_System/UserPage/Dashboard/DashBoard";
import Knowledgepage from "./pages/Support_System/LandingPages/Knowledgepage";
import Knowledgeview from "./pages/Support_System/LandingPages/Knowledgeview";

const App = () => {
  const location = useLocation();

  const hideHeaderPaths = ["/walkover"]; // Add the paths where you want to hide the header

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  if (shouldHideHeader) {
    return (
      <Routes>
        <Route path="/walkover" element={<WalkoverHeader />} />
      </Routes>
    );
  }

  return (
    <>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/joblisting" element={<JobListingHome />} />
          <Route path="/department" element={<DeptHome />} />
          <Route path="/interviewquestions" element={<InterviewHome />} />
          <Route path="/receivedapplications" element={<ReceivedApp />} />

          <Route path="/showmore:id" element={<ShowMoreHome />} />
          <Route path="/joblisting/edit" element={<EditHome />} />
          <Route path="/jobApplicationDetail">
            <Route path=":id" element={<JobApplicationDetail />} />
            <Route path="offer-letter/:id" element={<OfferLetter />} />
            <Route path="agreements/:id" element={<Agreements />} />
          </Route>

          <Route
            path="/showmore:id/sendofferletter"
            element={<SendOfferHome />}
          />
          <Route path="/showmore:id/offerletter" element={<OfferHome />} />

          <Route
            path="/showmore:id/sendagreement"
            element={<AgreementHome />}
          />

          <Route path="/noticeboard" element={<NoticeHome />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/expenses" element={<ExpensesHome />} />
          <Route path="/award" element={<AwardHome />} />
          <Route path="/holidays" element={<HolidayHome />} />

          <Route path="/addpayroll" element={<AddPayrollHome />} />
          <Route path="/addpayrolls" element={<MorePayrollHome />} />
          <Route path="/editpayroll" element={<EditPayrollHome />} />
          <Route path="/editpayrolls" element={<MoreEditPayrollHome />} />
          <Route path="/employeesalary" element={<SalaryHome />} />

          <Route path="/employees" element={<EmployeeHome />} />
          <Route path="/performance/:id" element={<PerformanceHome />} />
          <Route path="/viewemployee/:id" element={<EmpDetailsHome />} />
          <Route path="/attendance" element={<AttendHome />} />
          <Route path="/attendanceview" element={<AttendViewHome />} />
          <Route path="/leavesettings" element={<LeaveSettingsHome />} />
          <Route path="/leaveapplication" element={<LeaveAppHome />} />
          <Route path="/leaveapplication/view" element={<LeaveViewHome />} />
          <Route path="rulesandregulations" element={<RuleAndRegulations />} />

          <Route path="/dashboardproject" element={<Dashboard />} />
          <Route path="/newProject" element={<NewProject />} />
          <Route path="/OverTime" element={<OverTime />} />
          <Route path="/OverViewCalender" element={<OverViewCalender />} />
          <Route path="/ViewProject" element={<ViewProject />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/support/ticketlist" element={<TicketList />} />
          <Route path="/support/profile" element={<Profile />} />
          <Route path="/support/Dashboard" element={<DashBoard />} />
          <Route path="/support/knowledgepage" element={<Knowledgepage />} />
          <Route path="/support/knowledgeview" element={<Knowledgeview />} />
        </Routes>
      </Header>
      <Footer />

      <Footer />
    </>
  );
};

export default App;
