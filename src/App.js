import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./utilities/axios";
import Loading from "./components/Loading";
import RootContainer from "./careers/globals/Root";
import { RecoilRoot } from "recoil";

const Header = lazy(() => import("./components/Header"));
const Onboarding = lazy(() => import("./pages/Operations/Onbording/Onboarding"));
const Home = lazy(() => import("./pages/Home"));
const JobListingHome = lazy(() => import("./pages/JobListing/JobListingHome"));
const ReceivedApp = lazy(() => import("./pages/ReceivedApp/ReceivedApp"));
const ShowMoreHome = lazy(() => import("./pages/ReceivedApp/ShowMoreHome"));
const SendOfferHome = lazy(() =>
  import("./pages/ReceivedApp/Steps/sendOfferHome")
);
const DeptHome = lazy(() => import("./pages/Departments/DeptHome"));
const InterviewHome = lazy(() => import("./pages/Interview/interviewHome"));
const EditHome = lazy(() => import("./pages/JobListing/EditHome"));
const OfferHome = lazy(() => import("./pages/ReceivedApp/Steps/OfferHome"));
const AgreementHome = lazy(() =>
  import("./pages/ReceivedApp/Steps/agreements/AgreementHome")
);
const NoticeHome = lazy(() => import("./pages/NoticeBoard/NoticeHome"));
const Apps = lazy(() => import("./pages/Apps"));
const EmployeeHome = lazy(() => import("./pages/Employee/EmployeeHome"));
const PerformanceHome = lazy(() => import("./pages/Employee/PerformanceHome"));
const EmpDetailsHome = lazy(() =>
  import("./pages/Employee/EmployeeDetails/EmpDetailsHome")
);
const AttendHome = lazy(() => import("./pages/Attendance/AttendHome"));
const AttendViewHome = lazy(() =>
  import("./pages/Attendance/AttendView/AttendViewHome")
);

const Schedule = lazy(()=> import("./pages/Schedule/ShiftManagement"));



const LeaveSettingsHome = lazy(() =>
  import("./pages/Attendance/AttendView/LeaveSetting/LeaveSettingHome")
);
const LeaveAppHome = lazy(() =>
  import("./pages/Attendance/AttendView/LeaveAppPage.jsx/LeaveAppHome")
);
const LeaveViewHome = lazy(() =>
  import("./pages/Attendance/AttendView/LeaveAppPage.jsx/LeaveViewHome")
);
const ExpensesHome = lazy(() => import("./pages/Expenses/ExpensesHome"));
const AwardHome = lazy(() => import("./pages/Award/AwardHome"));
const HolidayHome = lazy(() => import("./pages/Holiday/HolidayHome"));
const AddPayrollHome = lazy(() => import("./pages/Payrolls/AddPayHome"));
const MorePayrollHome = lazy(() => import("./pages/Payrolls/MorePayHome"));
const Footer = lazy(() => import("./pages/Footer"));
const EditPayrollHome = lazy(() => import("./pages/Payrolls/EditPayHome"));
const MoreEditPayrollHome = lazy(() => import("./pages/Payrolls/MoreEPayHome"));
const SalaryHome = lazy(() => import("./pages/Payrolls/SalaryHome"));
const JobApplicationDetail = lazy(() => import("./pages/JobApplicationDetail"));
const Agreements = lazy(() => import("./pages/Agreements"));
const OfferLetter = lazy(() => import("./pages/OfferLatter"));
const RuleAndRegulations = lazy(() => import("./pages/Rules&Regulations"));
const WalkoverHeader = lazy(() => import("./pages/Walkover/Walkover"));
const Dashboard = lazy(() => import("./pages/Projects/Dashboard"));
const NewProject = lazy(() => import("./pages/Projects/NewProject"));
const OverTime = lazy(() => import("./pages/Projects/OverTimeCalender"));
const ProjectList = lazy(() => import("./pages/Projects/ProjectList"));
const OverViewCalender = lazy(() => import("./pages/Projects/Calender"));
const DashBoard = lazy(() =>
  import("./pages/Support_System/UserPage/Dashboard/DashBoard")
);
const TicketList = lazy(() =>
  import("./pages/Support_System/UserPage/Tikects/TicketList")
);
const Profile = lazy(() =>
  import("./pages/Support_System/UserPage/profile/Profile")
);
const Knowledgepage = lazy(() =>
  import("./pages/Support_System/LandingPages/Knowledgepage")
);
const Knowledgeview = lazy(() =>
  import("./pages/Support_System/LandingPages/Knowledgeview")
);
const Memo = lazy(() => import("./pages/Memo/Memo"));
const MemoEdit = lazy(() => import("./pages/Memo/MemoEdit"));
const LandingPage = lazy(() =>
  import("./pages/Support_System/LandingPages/LandingPage")
);
const ActiveList = lazy(() =>
  import("./pages/Support_System/UserPage/Tikects/ActiveTicket")
);
const CreateTicket = lazy(() =>
  import("./pages/Support_System/UserPage/Tikects/CreateTicket")
);
const CloseTicket = lazy(() =>
  import("./pages/Support_System/UserPage/Tikects/CloseTickt")
);
const AuthorizationProvider = lazy(() => import("./hooks/Authorize"));
const ThemeContextProvider = lazy(() => import("./style/theme"));
const CreateOrganization = lazy(() =>
  import("./pages/Organization/CreateOrganization")
);
const ListOrganization = lazy(() =>
  import("./pages/Organization/ListOrganization")
);
const EditOrganization=lazy(()=>import("./pages/Organization/EditOrganization"))
const OnBoarding = lazy(() => import("./pages/OnBoarding/OnBoarding"));
const Theme = lazy(() => import("./pages/admin/Theme"));
const Ticket = lazy(() => import("./pages/admin/Ticket"));
const ChatSetting = lazy(() => import("./pages/admin/Chat"));
const Emailsetting = lazy(() => import("./pages/admin/Emailsetting"));
const Fileupload = lazy(() => import("./pages/admin/Fileupload"));
const Customcssjs = lazy(() => import("./pages/admin/Customcssjs"));
const Captcha = lazy(() => import("./pages/admin/Captcha"));
const Notifications = lazy(() => import("./pages/admin/Notifications"));
const Generalsettings = lazy(() => import("./pages/admin/Generalsettings"));
const Paymentsetting = lazy(() => import("./pages/admin/Paymentsetting"));
const Othersetting = lazy(() => import("./pages/admin/Othersetting"));
const Apisetting = lazy(() => import("./pages/admin/Apisetting"));
const Generalsettinghome = lazy(() =>
  import("./pages/admin/Generalsettinghome")
);
const Rollaccess = lazy(() => import("./pages/admin/Rollaccess"));
const ViewProject = lazy(() => import("./pages/Projects/ViewProject"));
const Newreceivedapplication = lazy(() =>
  import("./pages/ReceivedApp/Newreceivedapplication")
);
const Newawardpage = lazy(() => import("./pages/Award/Newawardpage"));
const CareerHome = lazy(() => import("./careers/pages/home"));
const ApplyForJob = lazy(() => import("./careers/pages/ApplyForJob"));
const JobDetails = lazy(() => import("./careers/jobRolepages/jobs"));
const ErrorPage = lazy(() => import("./careers/erropage/ErrorPage"));
const Docs = lazy(() => import("./pages/Docs/Docs"));
const Layout = lazy(() => import("./Layout"));
const ChatPage = lazy(() => import("./pages/Chat/ChatPage"));
const RecentAttendence =lazy(()=> import("./pages/DashComponents/attend"));
const DeptPage=lazy(()=>import("./pages/Departments/DeptHome"))
const Employeelist=lazy(()=>import("./pages/Employee/EmployeeHome"))

const Operations = lazy(() =>
  import("./pages/Operations/Operations")
);

const App = () => {
  const location = useLocation();
  const [careerUser, setCareerUser] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const data = {
      amount: queryParams.get("amount"),
      period: queryParams.get("period"),
      theme: queryParams.get("theme"),
    };

    if (data.amount !== null || data.period !== null) {
      localStorage.setItem("planData", JSON.stringify(data));
    }
  }, [location]);

  if (location.pathname.startsWith("/career")) {
    return (
      <Suspense fallback={<Loading />}>
        <RecoilRoot>
          <RootContainer careerUser={careerUser} setCareerUser={setCareerUser}>
            <Routes>
              <Route path="/career/:organization">
                <Route index element={<CareerHome />} />
                <Route
                  path="apply-for-job/:id"
                  element={<ApplyForJob setCareerUser={setCareerUser} />}
                />
                <Route path="job/:id" element={<JobDetails />} />
              </Route>
              <Route path="/career/404" element={<ErrorPage />} />
            </Routes>
          </RootContainer>
        </RecoilRoot>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Header>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard/mySpace" element={<Home />} />
            <Route path="dashboard/team" element={<Home />} />
            <Route path="dashboard/organization" element={<Home />} />
            <Route path="operations/onboarding" element={<Onboarding />} />
            <Route path="operations" element={<Operations />} />
            <Route path="joblisting" element={<JobListingHome />} />
            <Route path="department" element={<DeptHome />} />
            <Route path="interviewquestions" element={<InterviewHome />} />
            <Route
              path="receivedapplications"
              element={<Newreceivedapplication />}
            />
            <Route
              path="new/receivedapplications"
              element={<Newreceivedapplication />}
            />

            <Route path="RecentAttendence" element={<RecentAttendence/>}/>

            <Route path="showmore/:id" element={<ShowMoreHome />} />
            <Route path="joblisting/edit" element={<EditHome />} />
            <Route path="jobApplicationDetail">
              <Route path=":id" element={<JobApplicationDetail />} />
              <Route path="offer-letter/:id" element={<OfferLetter />} />
              <Route path="agreements/:id" element={<Agreements />} />
            </Route>

            <Route
              path="showmore/:id/sendofferletter"
              element={<SendOfferHome />}
            />
            <Route path="showmore/:id/offerletter" element={<OfferHome />} />

            <Route
              path="showmore/:id/sendagreement"
              element={<AgreementHome />}
            />

            <Route path="noticeboard" element={<NoticeHome />} />
            <Route path="apps" element={<Apps />} />
            <Route path="docs" element={<Docs />} />
            <Route path="expenses" element={<ExpensesHome />} />
            <Route path="award" element={<Newawardpage />} />
            <Route path="holidays" element={<HolidayHome />} />
            <Route path="Schudle" element={<Schedule/>}/>

            <Route path="addpayroll" element={<AddPayrollHome />} />
            <Route path="addpayrolls" element={<MorePayrollHome />} />
            <Route path="editpayroll" element={<EditPayrollHome />} />
            <Route path="editpayrolls" element={<MoreEditPayrollHome />} />
            <Route path="employeesalary" element={<SalaryHome />} />

            <Route path="employees" element={<EmployeeHome />} />
            <Route path="performance/:id" element={<PerformanceHome />} />
            <Route path="viewemployee/:id" element={<EmpDetailsHome />} />

            <Route path="attendance" element={<AttendHome />} />
            <Route path="attendanceview" element={<AttendViewHome />} />
            <Route path="leavesettings" element={<LeaveSettingsHome />} />
            <Route path="leaveapplication" element={<LeaveAppHome />} />
            <Route path="leaveapplication/view" element={<LeaveViewHome />} />
            <Route path="DeptHome" element={<DeptPage/>}/>
            <Route path="EmployeeHome" element={<Employeelist/>}/>
            <Route
              path="rulesandregulations"
              element={<RuleAndRegulations />}
            />

            <Route path="dashboardproject" element={<Dashboard />} />
            <Route path="projectlist" element={<ProjectList />} />
            <Route path="newproject" element={<NewProject />} />
            <Route path="overTime" element={<OverTime />} />

            <Route path="overviewcalender" element={<OverTime />} />
            <Route path="viewproject" element={<ViewProject />} />

            <Route path="support/ticketlist" element={<TicketList />} />
            <Route path="support/activeticket" element={<ActiveList />} />
            <Route path="support/createtiket" element={<CreateTicket />} />
            <Route path="support/closeticket" element={<CloseTicket />} />
            <Route path="support/profile" element={<Profile />} />
            <Route path="support/Dashboard" element={<DashBoard />} />
            <Route path="support/landing" element={<LandingPage />} />
            <Route path="support/knowledgepage" element={<Knowledgepage />} />
            <Route path="support/knowledgeview" element={<Knowledgeview />} />
            <Route path="memo" element={<Memo />} />
            <Route path="memoEdit" element={<MemoEdit />} />
            <Route path="chat" element={<ChatPage />} />
           

            <Route path="generalsetting" element={<Generalsettinghome />} />
            <Route path="rollaccess" element={<Rollaccess />} />
            <Route path="apisetting" element={<Apisetting />} />

            <Route path="walkover" element={<WalkoverHeader />} />
            <Route path="checkout" element={<OnBoarding />} />
            <Route path="createOrganization" element={<CreateOrganization />} />
            <Route path="listOrganization" element={<ListOrganization />} />
            <Route path="EditOrganization/:id"element={<EditOrganization/>}/>
          </Route>
        </Routes>
      </Header>
      {/* <Footer /> */}
    </Suspense>
  );
};

export default App;
