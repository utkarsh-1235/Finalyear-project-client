import { useContext, lazy, Suspense } from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "./Loading";
import GetAttandanceStudent from "../Queries/GetAttandanceStudent";

const AttendanceLayout = () => {
  const AttendanceStudent = lazy(() => import("../Queries/AttendanceStudent"));
  const Attendance = lazy(() => import("../Queries/Attendance"));
  const { user } = useContext(UserContext);
  return (
    <>
      {user.userType === "Student" ? (
        <Suspense fallback={<Loading />}>
          <AttendanceStudent />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading />}>
          <GetAttandanceStudent />
        </Suspense>
      )}
    </>
  );
};

export default AttendanceLayout;
