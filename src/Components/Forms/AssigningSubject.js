import React, {useContext, useEffect, useState } from 'react'
import axios from '../../config/api/axios'
import { toast } from 'react-toastify';
import UserContext from '../../Hooks/UserContext';


function AssigningSubject() {
     const [subjectId, setSubjectId] = useState('');
    const [studentIds, setStudentIds] = useState([]);
    const [students, setStudents] = useState([]);
    const [subject, setSubjects] = useState([]);
    const { user } = useContext(UserContext);
    useEffect(()=>{
        const fetchSubjectAndStudents = async()=>{
            try{
               const studentsResponse = await axios.get('student/')
                const subjectResponse = await axios.get("paper/teacher/" + user?.teacher?._id)
                setStudents(studentsResponse);
                setSubjects(subjectResponse);
            }
            catch(err){
                toast.error("Error",err);
            }
        }
        fetchSubjectAndStudents();
    },[])

    const handleSubmit = async(e)=>{
       e.preventDefault();
       try {
      
        const response = await axios.post('/paper/teacher', {
          subjectId ,
          studentIds,
        });
        toast.success(response.data);
        // Optionally, show a success message to the user
      } catch (error) {
        toast.error('Error assigning subjects:', error);
        // Optionally, show an error message to the user
      }
    }
  return (
    <div className="container mx-auto ">
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center items-center gap-6'>
                    <div className='w-full sm:w-80'>
                        <label htmlFor="subject" className="block font-bold mb-2">Select Subject:</label>
                        <select id="subject" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500">
                            <option value="">Select a subject</option>
                            {subject?.data?.map((subject) => (
                                <option key={subject._id} value={subject._id}>{subject.subject}</option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full sm:w-80'>
                        <label className="block font-bold mb-2">Assign to Students:</label>
                        {students.data?.map((student) => (
                            <div key={student._id} className="flex items-center">
                                <input type="checkbox" id={student._id} checked={studentIds.includes(student._id)} onChange={(e) => {
                                    const studentId = e.target.id;
                                    setStudentIds((prevStudentIds) => (
                                        e.target.checked ? [...prevStudentIds, studentId] : prevStudentIds.filter(id => id !== studentId)
                                    ));
                                }} className="mr-2"/>
                                <label htmlFor={student._id}>{student.name}</label>
                            </div>
                        ))}
                    </div>

                    <button className="block w-full sm:w-auto bg-violet-600 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-400" type="submit">Assign Subjects</button>
                </div>
            </form>
        </div>  )
}

export default AssigningSubject
