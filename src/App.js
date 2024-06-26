import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

// context
import { UserProvider } from "./Hooks/UserContext";

// components
import Loading from "./Components/Layouts/Loading";
// layouts
import AppLayout from "./Components/Layouts/AppLayout";
import Layout from "./Components/Layouts/Layout";
import Dash from "./Components/Layouts/Dash";
import ErrorElement from "./Components/Layouts/ErrorElement";
import AttendanceLayout from "./Components/Layouts/AttendanceLayout";
import InternalLayout from "./Components/Layouts/InternalLayout";
import RegisterLayout from "./Components/Layouts/RegisterLayout";

// queries
import Paper from "./Components/Queries/Paper";
import Notes from "./Components/Queries/Notes";
import StudentsList from "./Components/Queries/StudentsList";
import Profile from "./Components/Queries/Profile";

// forms
import TeacherForm from "./Components/Forms/TeacherForm";
import StudentForm from "./Components/Forms/StudentForm";
import NotesForm from "./Components/Forms/NotesForm";
import TimeScheduleForm from "./Components/Forms/TimeScheduleForm";
import Login from "./Components/Forms/Login";
import AssigningSubject from "./Components/Forms/AssigningSubject";
import Attendance from "./Components/Queries/Attendance";
import GetAttendanceStudent from "./Components/Queries/GetAttandanceStudent";
import AttendanceStudent from "./Components/Queries/AttendanceStudent";
//import PaperForm from "./Components/Forms/PaperForm"
// lazy loading user specific components
const TeacherApproval = lazy(() =>
  import("./Components/Queries/TeacherApproval")
);
 const PaperForm = lazy(() => import("./Components/Forms/PaperForm"));
const Getsubject = lazy(() => import("./Components/Forms/Getsubject"));


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path="/" element={<AppLayout />} errorElement={<ErrorElement />}>
        <Route index element={<Login />} /> 
        <Route path="/register" element={<RegisterLayout />}>
          <Route path="reg_teacher" element={<TeacherForm />} />
          
          {/* <Route path="reg_student" element={<StudentForm />} /> */}
        </Route>
        
        <Route
          path="/dash"
          element={<Layout />}
          errorElement={<ErrorElement />}
        >
          <Route index element={<Dash />} />
          <Route path="student" element={<StudentForm />} />
          <Route path="paper/:paper/students" element={<StudentsList />} />
          <Route path="addAttendance" element={<GetAttendanceStudent/>} />
          <Route path="getIndAttandance" element={<AttendanceStudent/>} />
          <Route path="getAttandance" element={<Attendance/>} />
          
          <Route path="internal" element={<InternalLayout />} />
          <Route path="time_schedule" element={<TimeScheduleForm />} />
          <Route path="profile" element={<Profile />} />
          
          <Route path="approveteacher" 
            element={
            <Suspense fallback={<Loading/>}>
              <TeacherApproval/>
              </Suspense>}>
              </Route>

              <Route
            path="assign"
            element={
              <Suspense fallback={<Loading />}>
                <AssigningSubject/>
              </Suspense>
            }/>
 
       <Route path="addsubjects" element={<Suspense fallback={<Loading/>}>
              <PaperForm/>
              </Suspense>}/>
              
         

              

              
          {/* <Route
            path="approve_teacher"
            element={
              <Suspense fallback={<Loading />}>
                <TeacherApproval />
              </Suspense>
            }
          /> */}
          {/* <Route
            path="add_paper"
            element={
              <Suspense fallback={<Loading />}>
                <PaperForm />
              </Suspense>
            }
          /> */}
          <Route
            path="getsubjects"
            element={
              <Suspense fallback={<Loading />}>
                <Getsubject />
              </Suspense>
            }
            
          />
          
        </Route>
      </Route>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer
        className="toast"
        toastClassName="toast-rounded"
        bodyClassName="toast-body"
        // progressClassName="toast-progress"
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        hideProgressBar={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserProvider>
  );
}

export default App;
