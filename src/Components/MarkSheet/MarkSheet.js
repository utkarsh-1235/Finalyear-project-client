import React from 'react';

const MarkSheet = (props) => {

    const { isCtOne, students, handleChange } = props;
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
    
      return (
        <>
            {students?.length ? (<table className="table-auto w-full">
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
                  {isCtOne ? ( 
                    <>
                  <th rowSpan="4">TOTAL MARKS (60)</th>
                  <th rowSpan="4">CO1 attempt</th>
                  <th rowSpan="4">CO1 Marks Obt.</th>
                  <th rowSpan="4">CO2 attempt</th>
                  <th rowSpan="4">CO2 Marks Obt.</th>
                  <th rowSpan="4">Attainment</th>
                  </>)
                   : (<><th rowSpan="4">TOTAL MARKS (60)</th>
                  <th rowSpan="4">CO3 attempt</th>
                  <th rowSpan="4">CO3 Marks Obt.</th>
                  <th rowSpan="4">CO4 attempt</th>
                  <th rowSpan="4">CO4 Marks Obt.</th>
                  <th rowSpan="4">CO5 attempt</th>
                  <th rowSpan="4">CO5 Marks Obt.</th>
                  <th rowSpan="4">Attainment</th></>)}
               
                </tr>
                <tr>
                  <th scope="col" colSpan="5">
                    (5 * 2 = 10)
                  </th>
                  <th scope="col" colSpan="5">
                    (4 * 5 = 20)
                  </th>
                  <th scope="col" colSpan="6">
                    (3 * 10 = 30)
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
                {isCtOne ? (  <tr>
                  <th scope="col">CO1</th>
                  <th scope="col">CO1</th>
                  <th scope="col">CO1</th>
                  <th scope="col">CO2</th>
                  <th scope="col">CO2</th>
                  <th scope="col">CO1</th>
                  <th scope="col">CO1</th>
                  <th scope="col">CO1</th>
                  <th scope="col">CO2</th>
                  <th scope="col">CO2</th>
                  <th scope="col">CO1</th>
                  <th scope="col">CO1</th>
                  <th scope="col">CO2</th>
                  <th scope="col">CO2</th>
                  <th scope="col">CO1</th>
                  <th scope="col">CO2</th>
                </tr>) : (          <tr>
              <th scope="col">CO3</th>
              <th scope="col">CO3</th>
              <th scope="col">CO3</th>
              <th scope="col">CO4</th>
              <th scope="col">CO5</th>
              <th scope="col">CO3</th>
              <th scope="col">CO4</th>
              <th scope="col">CO4</th>
              <th scope="col">CO5</th>
              <th scope="col">CO5</th>
              <th scope="col">CO3</th>
              <th scope="col">CO3</th>
              <th scope="col">CO4</th>
              <th scope="col">CO4</th>
              <th scope="col">CO5</th>
              <th scope="col">CO5</th>
            </tr>)}
              
              </thead>
              <tbody>
                {students.map((item) => {
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
                    ques5B
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

                    let CO1Attempt = null;
                    let CO1Marks = null;
                    let CO2Attempt = null;
                    let CO2Marks = null;
                    let CO3Attempt = null;
                    let CO3Marks = null;

                    let CO4Attempt = null;
                    let CO4Marks = null;
                    let CO5Attempt = null;
                    let CO5Marks = null;
                    if (isCtOne) {
                        CO1Attempt = (ques1A ? 2 : 0) +
                        (ques1B ? 2 : 0) +
                        (ques1C ? 2 : 0) +
                        (ques2A ? 5 : 0) +
                        (ques2B ? 2 : 0) +
                        (ques3A ? 10 : 0) +
                        (ques3B ? 10 : 0) +
                        (ques5A ? 10 : 0)

                        CO1Marks = (ques1A || 0) +
                                        (ques1B || 0) +
                                        (ques1C || 0) +                 
                                        (ques2A || 0) +
                                        (ques2B || 0) +
                                        (ques3A || 0) +
                                        (ques3B || 0) +
                                        (ques5A || 0)
                        
                        CO2Attempt = (ques1D ? 2 : 0) +
                                            (ques1E ? 2 : 0) +
                                            (ques2D ? 5 : 0) +
                                            (ques2E ? 2 : 0) +
                                            (ques4A ? 10 : 0) +
                                            (ques4B ? 10 : 0) +
                                            (ques5B ? 10 : 0)

                        CO2Marks = (ques1D || 0) +
                                        (ques1E || 0) +
                                        (ques2D || 0) +
                                        (ques2E || 0) +
                                        (ques4A || 0) +
                                        (ques4B || 0) +
                                        (ques5B || 0)

                      
                    } else {
                        // Need to write logic for CT2

                        CO3Attempt = (ques1A ? 2 : 0) + 
                                     (ques1B ? 2 : 0) +
                                     (ques1C ? 2 : 0) + 
                                     (ques2A ? 5 : 0) +
                                     (ques3A ? 10 : 0) +
                                     (ques3B ? 10 : 0)
                                     
                         CO3Marks = (ques1A || 0) +
                                    (ques1B || 0) +
                                    (ques1C || 0) +
                                    (ques2A || 0) +
                                    (ques3A || 0) +
                                    (ques3B || 0)

                         CO4Attempt = (ques1D ? 2 : 0) +
                                     (ques2B? 5 : 0) +
                                     (ques2C? 5 : 0) +
                                     (ques4A ? 10 : 0) +
                                     (ques4B ? 10 : 0)

                         CO4Marks = (ques1D || 0) +
                                    (ques2B || 0) +
                                    (ques2C || 0) +
                                    (ques4A || 0) +
                                    (ques4B || 0)
                         
                         CO5Attempt = (ques1E ? 2 : 0) +
                                    (ques2D ? 5 : 0) +
                                    (ques2E ? 5 : 0) +
                                    (ques5A ? 10 : 0) +
                                    (ques5B ? 10 : 0)

                         CO5Marks = (ques1E || 0) +
                                    (ques2D || 0) +
                                    (ques2E || 0) +
                                    (ques5A || 0) +
                                    (ques5B || 0)
                    }               
    
                  return (
                  
                    <tr key={item.universityRollno}>
                      <td className="text-center">{item.universityRollno}</td>
                      <td>{item.name}</td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques1A"]}
                          value={ques1A}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques1A")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques1B"]}
                          value={ques1B}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques1B")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques1C"]}
                          value={ques1C}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques1C")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques1D"]}
                          value={ques1D}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques1D")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques1E"]}
                          value={ques1E}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques1E")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques2A"]}
                          value={ques2A}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques2A")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques2B"]}
                          value={ques2B}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques2B")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques2C"]}
                          value={ques2C}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques2C")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques2D"]}
                          value={ques2D}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques2D")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques2E"]}
                          value={ques2E}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques2E")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques3A"]}
                          value={ques3A}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques3A")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques3B"]}
                          value={ques3B}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques3B")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques4A"]}
                          value={ques4A}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques4A")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques4B"]}
                          value={ques4B}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques4B")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques5A"]}
                          value={ques5A}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques5A")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={attemptedMarks["ques5B"]}
                          value={ques5B}
                          onChange={(e) =>
                            handleChange(e.target.value, item.universityRollno, "ques5B")
                          }
                        />
                      </td>
                      <td>{totalMarks}</td>
                      {isCtOne ? (<><td>{CO1Attempt}</td>
                      <td>{CO1Marks}</td>
                      <td>{CO2Attempt}</td>
                      <td>{CO2Marks}</td>
                      <td>{CO3Attempt}</td>
                      <td>{CO3Marks}</td></>) : (<><td>{CO3Attempt}</td>
                      <td>{CO3Marks}</td>
                      <td>{CO4Attempt}</td>
                      <td>{CO4Marks}</td>
                      <td>{CO5Attempt}</td>
                      <td>{CO5Marks}</td></>)}
                    
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>) : null}</>
      )

};


export default MarkSheet;