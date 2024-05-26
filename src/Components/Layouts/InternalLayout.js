import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "./Loading";

const InternalLayout = () => {
  const InternalResultForm = React.lazy(() =>
    import("../Forms/InternalResultForm")
  );
  const InternalStudent = React.lazy(() =>
    import("../Queries/InternalStudent")
  );
  const { user } = React.useContext(UserContext);
  return (
    <>
      
        <React.Suspense fallback={<Loading />}>
          <InternalResultForm />
        </React.Suspense>
      
    </>
  );
};

export default InternalLayout;
