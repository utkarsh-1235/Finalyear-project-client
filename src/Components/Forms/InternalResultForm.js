import { useState, useContext, React, useEffect } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import ErrorStrip from "../ErrorStrip";
import "./style.css";


// const InternalResultForm = () => {
//   const { paperList } = useContext(UserContext);
//   const [paper, setPaper] = useState("");
//   const [disabled, setDisabled] = useState(true);
//   const [internal, setInternal] = useState([]);
//   const [id, setId] = useState([]);
//   const [error, setError] = useState("");

//   const fetchInternal = async (e) => {
//     setInternal([]);
//     setError("");
//     e.preventDefault();
//     try {
//       // fetching internal record
//       const response = await axios.get("/internal/" + paper);
//       // saving record id for updating/deleting record
//       setId(response.data._id);
//       setInternal(response.data.marks);
//       setDisabled(true);
//       setError("");
//     } catch (err) {
//       setError(err);
//       // incase no record exists
//       if (err.response.status === 404) {
//         // fetching students list and mapping to add fields
//         const response = await axios.get("paper/" + paper);
//         const students = response.data.students;
//         students.forEach((student) => {
//           Object.assign(student, {
//             test: 0,
//             seminar: 0,
//             assignment: 0,
//             attendance: 0,
//             total: 0,
//           });
//         });
//         setInternal(students);
//         setDisabled(false);
//       }
//     }
//   };

//   const addInternalMark = async (e) => {
//     e.preventDefault();
//     const marks = { id, paper, marks: internal };
//     try {
//       // adding new internal mark record
//       const response = await axios.post("internal/" + paper, marks);
//       toast.success(response.data.message);
//       setDisabled(true);
//       setError("");
//       fetchInternal(e);
//     } catch (err) {
//       // conflict, record already exists
//       if (err.response.status === 409) {
//         try {
//           // updating internal record
//           const response = await axios.patch("internal/" + paper, marks);
//           toast.success(response.data.message);
//           setDisabled(true);
//           setError("");
//         } catch (err) {
//           setError(err);
//         }
//       } else setError(err);
//     }
//   };

//   const deleteInternalMark = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.delete("internal/" + id);
//       toast.success(response.data.message, {
//         icon: ({ theme, type }) => <FaTrash />,
//       });
//       setInternal([]);
//     } catch (err) {
//       setError(err);
//     }
//   };

//   // updating internal state on "onChange" event.
//   const handleFormChange = (e) => {
//     // the whole thing is a convoluted mess, but it works.
//     // if you have an alternative, DM ;).
//     const index = parseInt(e.target.id);
//     const value = e.target.value;
//     const key = e.target.name;
//     const newStudent = internal[index];
//     newStudent[key] = value;
//     const newInternal = internal.map((student, index) => {
//       if (index === e.target.id) {
//         return newStudent;
//       } else return student;
//     });
//     setInternal(newInternal);
//   };

//   return (
//     <main className="internal">
//       <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
//         Internal Mark
//       </h2>
//       <section className="form__head">
//         <form className="w-full gap-4 accent-violet-900 md:flex">
//           <select
//             className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 md:w-1/3"
//             placeholder="select paper"
//             name="paper"
//             id="paper"
//             value={paper}
//             required
//             onChange={(e) => setPaper(e.target.value)}
//           >
//             <option defaultValue hidden>
//               Select Paper
//             </option>
//             {paperList?.map((paper) => (
//               <option key={paper._id} value={paper._id}>
//                 {paper.subject}
//               </option>
//             ))}
//           </select>
//           <button
//             className="mb-4 h-10 w-auto rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
//             type="submit"
//             onClick={(e) => fetchInternal(e)}
//           >
//             Fetch
//           </button>
//         </form>
//       </section>
//       <div>{error ? <ErrorStrip error={error} /> : ""}</div>
//       <section className="internal__body">
//         <form className="internal__body__form">
//           {internal.length ? (
//             <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
//               <table className="w-full">
//                 <TableHeader
//                   AdditionalHeaderClasses={"text-left"}
//                   Headers={[
//                     "Student",
//                     "Test",
//                     "Seminar",
//                     "Assignment",
//                     "Attendance",
//                     "Total",
//                   ]}
//                 />
//                 <tbody>
//                   {internal?.map((student, index) => (
//                     <tr
//                       key={index}
//                       className={
//                         // checking whether the student passed (total mark is above 7), bgcolor to represent it.
//                         parseInt(student?.test) +
//                           parseInt(student?.seminar) +
//                           parseInt(student?.assignment) +
//                           parseInt(student?.attendance) >
//                         7
//                           ? "border-t-[1px] border-slate-400 bg-violet-900/50 first:border-none"
//                           : "border-t-[1px] border-slate-400 first:border-none"
//                       }
//                     >
//                       <td className="p-2 ">{student.name}</td>
//                       <td className="p-2 ">
//                         <input
//                           className="w-full pl-3 "
//                           type="number"
//                           required
//                           min="0"
//                           max="3"
//                           disabled={disabled}
//                           id={index}
//                           name="test"
//                           value={student.test}
//                           onChange={(e) => handleFormChange(e)}
//                         />
//                       </td>
//                       <td className="p-2 ">
//                         <input
//                           className="w-full pl-3 "
//                           type="number"
//                           required
//                           min="0"
//                           max="3"
//                           disabled={disabled}
//                           id={index}
//                           name="seminar"
//                           value={student.seminar}
//                           onChange={(e) => handleFormChange(e)}
//                         />
//                       </td>
//                       <td className="p-2 ">
//                         <input
//                           className="w-full pl-3 "
//                           type="number"
//                           required
//                           min="0"
//                           max="3"
//                           disabled={disabled}
//                           id={index}
//                           name="assignment"
//                           value={student.assignment}
//                           onChange={(e) => handleFormChange(e)}
//                         />
//                       </td>
//                       <td className="p-2 ">
//                         <input
//                           className="w-full pl-3 "
//                           type="number"
//                           required
//                           min="0"
//                           max="3"
//                           disabled={disabled}
//                           id={index}
//                           name="attendance"
//                           value={student.attendance}
//                           onChange={(e) => handleFormChange(e)}
//                         />
//                       </td>
//                       <td className="p-2 ">
//                         <input
//                           className="w-full pl-3 "
//                           type="number"
//                           required
//                           min="0"
//                           max="3"
//                           disabled
//                           id={index}
//                           name="total"
//                           value={
//                             parseInt(student?.test) +
//                             parseInt(student?.seminar) +
//                             parseInt(student?.assignment) +
//                             parseInt(student?.attendance)
//                           }
//                           onChange={(e) => handleFormChange(e)}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             ""
//           )}
//           {internal.length && disabled ? (
//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
//                 onClick={(e) => setDisabled(false)}
//               >
//                 <FaEdit /> Edit
//               </button>
//               <button
//                 type="submit"
//                 className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-red-700 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-red-700"
//                 onClick={(e) => deleteInternalMark(e)}
//               >
//                 <FaTrash /> Delete
//               </button>
//             </div>
//           ) : (
//             ""
//           )}
//           {internal.length && !disabled ? (
//             <button
//               type="submit"
//               className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
//               onClick={(e) => addInternalMark(e)}
//             >
//               <FaPlus /> Save
//             </button>
//           ) : (
//             ""
//           )}
//         </form>
//       </section>
//     </main>
//   );
// };

// export default InternalResultForm;




const Table = (props) => {
  const { data = [] } = props;
  const [state, setState] = useState(data);
  const { paperList } = useContext(UserContext);
  const [paper, setPaper] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [internal, setInternal] = useState([]);
  const [id, setId] = useState([]);
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);

  const getStudents = async (e) => {
    e.preventDefault();
    setStudents([]);
    setError("");
    try {
      const response = await axios.get("/paper/students/" + paper);
      setStudents(response.data);
      setDisabled(true);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchInternal = async (e) => {
    setInternal([]);
    setError("");
    e.preventDefault();
    try {
      const response = await axios.get("/internal/" + paper);
      setId(response.data._id);
      setInternal(response.data.marks);
      setDisabled(true);
      setError("");
    } catch (err) {
      setError(err.message);
      if (err.response.status === 404) {
        const response = await axios.get("paper/" + paper);
        const students = response.data.students;
        students.forEach((student) => {
          Object.assign(student, {
            test: 0,
            seminar: 0,
            assignment: 0,
            attendance: 0,
            total: 0,
          });
        });
        setInternal(students);
        setDisabled(false);
      }
    }
  };

  const handleChange = (value, rollNo, ques) => {
    setState((prev) => {
      const updatedData = prev.map((student) => {
        if (student.rollNo === rollNo) {
          return {
            ...student,
            [ques]: parseInt(value) ? parseInt(value) : null,
          };
        }
        return student;
      });

      return updatedData;
    });
  };

  const attemptedMarks = {
    ques1A: 2,
    ques1B: 2,
    ques1C: 2,
    ques1D: 2,
    ques1E: 2,
    ques2A: 5,
    ques2B: 5,
    ques2C: 5,
    ques2D: 5,
    ques2E: 5,
    ques3A: 10,
    ques3B: 10,
    ques4A: 10,
    ques4B: 10,
    ques5A: 10,
    ques5B: 10,
  };

  useEffect(() => {
    setState(students);
  }, [students]);

  return (
    <>
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Internal Mark
      </h2>
      <section className="form__head">
        <form className="w-full gap-4 accent-violet-900 md:flex" onSubmit={getStudents}>
          <select
            className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 md:w-1/3"
            placeholder="select paper"
            name="paper"
            id="paper"
            value={paper}
            required
            onChange={(e) => setPaper(e.target.value)}
          >
            <option defaultValue hidden>
              Select Paper
            </option>
            {paperList?.map((paper) => (
              <option key={paper._id} value={paper._id}>
                {paper.subject}
              </option>
            ))}
          </select>
          <button
            className="mb-4 h-10 w-auto rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
            type="submit"
          >
            Fetch
          </button>
        </form>
      </section>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>

      {students.length ? (
        <table className="table-auto w-full">
          <colgroup>
            <col style={{ width: '60px' }} />
            <col />
            <col span="5" />
            <col span="5" />
            <col span="6" />
          </colgroup>
          <thead>
            <tr>
              <th rowSpan="4">Roll No.</th>
              <th rowSpan="4">Name</th>
              <th colSpan="5" scope="colgroup">
                Part A (ATTEMPT ALL)
              </th>
              <th colSpan="5" scope="colgroup">
                Part B (ATTEMPT ANY FOUR)
              </th>
              <th colSpan="6" scope="colgroup">
                Part C (Attempt any one part of the following Question)
              </th>
              <th rowSpan="4">TOTAL MARKS (60)</th>
              <th rowSpan="4">CO1 attempt</th>
              <th rowSpan="4">CO1 Marks Obt.</th>
              <th rowSpan="4">CO2 attempt</th>
              <th rowSpan="4">CO2 Marks Obt.</th>
              <th rowSpan="4">CO3 attempt</th>
              <th rowSpan="4">CO3 Marks Obt.</th>
              <th rowSpan="4">Attainment</th>
            </tr>
            <tr>
              <th scope="col" colSpan="5">
                (5 * 2 = 10)
              </th>
              <th scope="col" colSpan="5">
                (4 * 5 = 20)
              </th>
              <th scope="col" colSpan="6">
                (3 * 10 = 0)
              </th>
            </tr>
            <tr>
              <th scope="col">1A</th>
              <th scope="col">1B</th>
              <th scope="col">1C</th>
              <th scope="col">1D</th>
              <th scope="col">1E</th>
              <th scope="col">2(a)</th>
              <th scope="col">2(b)</th>
              <th scope="col">2(c)</th>
              <th scope="col">2(d)</th>
              <th scope="col">2(e)</th>
              <th scope="col">3(a)</th>
              <th scope="col">3(b)</th>
              <th scope="col">4(a)</th>
              <th scope="col">4(b)</th>
              <th scope="col">5(a)</th>
              <th scope="col">5(b)</th>
            </tr>
            <tr>
              <th scope="col">CO1</th>
              <th scope="col">CO1</th>
              <th scope="col">CO1</th>
              <th scope="col">CO2</th>
              <th scope="col">CO2</th>
              <th scope="col">CO1</th>
              <th scope="col">CO1</th>
              <th scope="col">CO3</th>
              <th scope="col">CO2</th>
              <th scope="col">CO2</th>
              <th scope="col">CO1</th>
              <th scope="col">CO1</th>
              <th scope="col">CO2</th>
              <th scope="col">CO2</th>
              <th scope="col">CO1</th>
              <th scope="col">CO2</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item) => {
              const {
                ques1A,
                ques1B,
                ques1C,
                ques1D,
                ques1E,
                ques2A,
                ques2B,
                ques2C,
                ques2D,
                ques2E,
                ques3A,
                ques3B,
                ques4A,
                ques4B,
                ques5A,
                ques5B,
              } = item;

              const totalMarks =
                (ques1A || 0) +
                (ques1B || 0) +
                (ques1C || 0) +
                (ques1D || 0) +
                (ques1E || 0) +
                (ques2A || 0) +
                (ques2B || 0) +
                (ques2C || 0) +
                (ques2D || 0) +
                (ques2E || 0) +
                (ques3A || 0) +
                (ques3B || 0) +
                (ques4A || 0) +
                (ques4B || 0) +
                (ques5A || 0) +
                (ques5B || 0);

              return (
              
                <tr key={item.rollNo}>
                  {console.log(item.rollNo)}
                  <td className="text-center">{item.universityRollno}</td>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques1A"]}
                      value={ques1A}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques1A")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques1B"]}
                      value={ques1B}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques1B")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques1C"]}
                      value={ques1C}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques1C")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques1D"]}
                      value={ques1D}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques1D")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques1E"]}
                      value={ques1E}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques1E")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques2A"]}
                      value={ques2A}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques2A")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques2B"]}
                      value={ques2B}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques2B")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques2C"]}
                      value={ques2C}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques2C")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques2D"]}
                      value={ques2D}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques2D")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques2E"]}
                      value={ques2E}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques2E")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques3A"]}
                      value={ques3A}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques3A")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques3B"]}
                      value={ques3B}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques3B")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques4A"]}
                      value={ques4A}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques4A")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques4B"]}
                      value={ques4B}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques4B")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques5A"]}
                      value={ques5A}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques5A")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      max={attemptedMarks["ques5B"]}
                      value={ques5B}
                      onChange={(e) =>
                        handleChange(e.target.value, item.rollNo, "ques5B")
                      }
                    />
                  </td>
                  <td>{totalMarks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default Table;

