import React, { useContext, useEffect, useState } from 'react';
import axios from '../../config/api/axios';
import UserContext from '../../Hooks/UserContext';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

function GetAttendanceStudent() {
  const [students, setStudents] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [attandance, setAttendance] = useState([]);
  const [error, setError] = useState("")
  const { paperList, setPaperList } = useContext(UserContext);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [id, setId] = useState("");
  const [isSaving, setIsSaving] = useState(false); // Track saving state

  const fetchAttendance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/student/subject/${subjectId}`);
      console.log(response);
      setStudents(response.data.students);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCheckboxChange = (index) => {
    setStudents(prevStudents => {
      const updatedStudents = [...prevStudents];
      updatedStudents[index] = {
        ...updatedStudents[index],
        present: !updatedStudents[index].present
      };
      return updatedStudents;
    });
  };
  

  const saveAttendance = async () => {
    setIsSaving(true);
    try {
      // Prepare data to be sent to the server
      const dataToSend = students.map(student => ({
        student: student._id,
        present: student.present
      }));
      // Make POST request to save attendance
      const response = await axios.post(`/attandance/${subjectId}/${date}/${hour}`, {
        subjectId,
        attandance: dataToSend
      });
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };
  const deleteAttendance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("attandance/" + id);
      toast.success(response.data.message, {
        icon: ({ theme, type }) => <FaTrash/>,
      });
      setAttendance([]);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
    <div className="flex justify-center">
  <div className="flex mr-4">
    <label className="m-1 text-xl font-bold" htmlFor="subject">
      Select Subject
    </label>
    <select
      className="mb-4 block h-10 rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400 "
      name="subject"
      id="subject"
      value={subjectId}
      required
      onChange={(e) => setSubjectId(e.target.value)}
    >
      <option defaultValue hidden>
        ---
      </option>
      {paperList &&
        paperList.map((paper, index) => (
          <option key={index} value={paper._id}>
            {paper.subject}
          </option>
        ))}
    </select>
  </div>

  <div className="flex mr-4">
    <label className="m-1 text-xl font-bold" htmlFor="date">
      Select Date
    </label>
    <input
      className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
      id="date"
      type="date"
      name="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  </div>

  <div className="flex mr-4">
    <label className="m-1 text-xl font-bold" htmlFor="hour">
      Select Hour
    </label>

    <select
      className="mb-4 h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
      name="hour"
      id="hour"
      value={hour}
      required
      onChange={(e) => setHour(e.target.value)}
    >
      <option defaultValue hidden>
        ---
      </option>
      <option value="1">I</option>
      <option value="2">II</option>
      <option value="3">III</option>
      <option value="4">IV</option>
      <option value="5">V</option>
      <option value="6">VI</option>
      <option value="7">VII</option>
      <option value="8">VIII</option>
    </select>
  </div>
</div>

      <button
        className="mb-4 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"
        type="submit"
        onClick={(e) => fetchAttendance(e)}
      >
        Fetch
      </button>

      <div>
        <h2 className='text-2xl font-bold'>Students:</h2>
        <ul>
          {students.map((student, index) => (
            <li className="text-xl border" key={index}>
              <label htmlFor={`student_${index}`} className='flex flex-row gap-10 items-center'>
                <input
                  type="checkbox"
                  id={`student_${index}`}
                  checked={student.present}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span>{student.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="mb-4 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"
        onClick={saveAttendance}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}

export default GetAttendanceStudent;
