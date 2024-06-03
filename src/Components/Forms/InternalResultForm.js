import { useState, useContext, React, useEffect } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import ErrorStrip from "../ErrorStrip";
import "./style.css";
import { toast } from "react-toastify";
import { MarkSheet } from "../MarkSheet";

const Table = (props) => {
  const { paperList } = useContext(UserContext);
  const [paper, setPaper] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [internal, setInternal] = useState([]);
  const [id, setId] = useState([]);
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const [ct1, setCt1] = useState(true)
  const [ct2, setCt2] = useState(false)

  
  const getStudents = async (e) => {
    e.preventDefault();
    setStudents([]);
    setError("");
    try {
      const response = await axios.get("/paper/students/" + paper);
      setStudents(response.data);

      /** Internal Marks Fetch & Initialize logic */
     // Call API /inteuniversityRollnornal/:paperId to get the internal marks data
          const internalMarksData = await axios.get("/internal/" + paper);
          console.log(internalMarksData.data)
        // Update state with the fetched data
        setStudents((prev) => {
          if (!Array.isArray(internalMarksData.data)) {
            console.error('internalMarksData is not an array');
            return prev;
          }
          const updatedData = prev.map((student) => {
            const found = internalMarksData.data.find((internalMarks) => internalMarks.marks.universityRollno === student.universityRollno);
            if (found) {
              return {
                ...student,
                ques1A: found.marks.CO1.A1a,
                ques1B: found.marks.CO1.A1b,
                ques1C: found.marks.CO1.A1c,
                ques1D: found.marks.CO2.A1d,
                ques1E: found.marks.CO2.A1e,
                ques2A: found.marks.CO1.B2a,
                ques2B: found.marks.CO1.B2b,
                ques2C: found.marks.CO1.B2c,
                ques2D: found.marks.CO2.B2d,
                ques2E: found.marks.CO2.B2e,
                ques3A: found.marks.CO1.C3a,
                ques3B: found.marks.CO1.C3b,
                ques4A: found.marks.CO2.C4a,
                ques4B: found.marks.CO2.C4b,
                ques5A: found.marks.CO1.C5a,
                ques5B: found.marks.CO2.C5b
              }
            }
            return student;
          });
          return updatedData;
        })
        // Add internal marks data to the state





      /** *************************************** */
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
      console.log(response.data)
      setId(response.data._id); // Set the ID of the internal record
      setInternal(response.data.marks); // Set the marks data
      setDisabled(true); // Disable further edits if data is found
      setError("");
    } catch (err) {
      setError(err.message);
      if (err.response && err.response.status === 404) {
        try {
          const response = await axios.get("/paper/" + paper);
          const students = response.data.students;
          
          // Initialize each student object with default mark structure
          const initializedStudents = students.map((student) => ({
            ...student,
            marks: {
              CO1: {
                A1a: '',
                A1b: '',
                A1c: '',
                B2a: '',
                B2b: '',
                B2c: '',
                C3a: '',
                C3b: '',
                C5a: '',
              },
              CO2: {
                A1d: '',
                A1e: '',
                B2d: '',
                B2e: '',
                C4a: '',
                C4b: '',
                C5b: '',
              },
              CO3: {
                A1a: '',
                A1b: '',
                A1c: '',
                B2a: '',
                C3a: '',
                C3b: '',
              },
              CO4: {
                A1d: '',
                B2b: '',
                B2c: '',
                C4a: '',
                C4b: '',
              },
              CO5: {
                A1e: '',
                B2d: '',
                B2e: '',
                C5a: '',
                C5b: '',
              },
            },
           total: student.total,
          }));
          
          setInternal(initializedStudents);
          setDisabled(false); // Enable edits if data is not found
        } catch (err) {
          setError("Error fetching paper data: " + err.message);
        }
      }
    }
  };
  
  
  const addInternalMark = async (e) => {
        e.preventDefault();
        console.log(internal)
        const formattedInternal = students.map((student) => {
          return {
            universityRollno: student.universityRollno,
            CO1: {
              A1a: student.ques1A,
              A1b: student.ques1B,
              A1c: student.ques1C,
              B2a: student.ques2A,
              B2b: student.ques2B,
              B2c: student.ques2C,
              C3a: student.ques3A,
              C3b: student.ques3B,
              C5a: student.ques5A,
            },
            CO2: {
              A1d: student.ques1D,
              A1e: student.ques1E,
              B2d: student.ques2D,
              B2e: student.ques2E,
              C4a: student.ques4A,
              C4b: student.ques4B,
              C5b: student.ques5B,
            },
            CO3: {
              A1a: student.ques1A,
              A1b: student.ques1B,
              A1c: student.ques1C,
              B2a: student.ques2A,
              C3a: student.ques3A,
              C3b: student.ques3B,
            },
            CO4: {
              A1d: student.ques1D,
              B2b: student.ques2B,
              B2c: student.ques2C,
              C4a: student.ques4A,
              C4b: student.ques4B,
            },
            CO5: {
              A1e: student.ques1E,
              B2d: student.ques2D,
              B2e: student.ques2E,
              C5a: student.ques5A,
              C5b: student.ques5B,
            },
          };
        });
       
        const marks = { id, paper, marks: formattedInternal };
        try {
          // adding new internal mark record
          const response = await axios.post("internal/" + paper, marks);
          toast.success(response.data.message);
          setDisabled(true);
          setError("");
           fetchInternal(e);
        } catch (err) {
          // conflict, record already exists
          if (err.response.status === 409) {
            try {
              // updating internal record
              const response = await axios.patch("internal/" + paper, marks);
              toast.success(response.data.message);
              setDisabled(true);
              setError("");
            } catch (err) {
              setError(err);
            }
          } else setError(err);
        }
      };

  const handleChange = (value, universityRollno, ques) => {
    console.log(value, universityRollno)
    setStudents((prev) => {
      const updatedData = prev.map((student) => {
        if (student.universityRollno === universityRollno) {
          return {
            ...student,
            [ques]: parseInt(value) || 0,
          };
        }
        return student;
      });

      return updatedData;
    });
  };

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
          { students.length?(<button
            className="mb-4 h-10 w-auto rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
            type="submit"
             onClick={()=>{  }}
          >
           {ct1 ? ( <span onClick={()=>{setCt1(false); setCt2(true)}}>CT2</span>):(<span onClick={()=>{setCt2(false); setCt1(true)}}>CT1</span>)}
          </button>):("")}  
          

        </form>
      </section>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
     <MarkSheet students={students} handleChange={handleChange} isCtOne={ct1} />
    
     {students.length?(<button
            className="mb-4 h-10 w-auto rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
            type="submit" onClick={addInternalMark}
          >
            Submit
          </button>):("")}
              
    </>
  );
};

export default Table;
