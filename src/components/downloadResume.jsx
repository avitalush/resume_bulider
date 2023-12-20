import React, { useContext, useRef, useEffect, useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ResumesContext  from '../context/resumes';
import { useNavigate, useParams } from 'react-router-dom';
export default function DownloadResume() {
    const { resumes } = useContext(ResumesContext);
    const { index } = useParams();
    const pdfRef = useRef();
    const [currentResume, setCurrentResume] = useState({})
    const image = "../images/2021-04-1.png"
    const navigate=useNavigate();


    useEffect(() => {
        setCurrentResume(resumes[index]);
        console.log(currentResume)
    }, [index, currentResume]);

const handleNavigate=()=>{
navigate('/list');
}


const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        pdf.save(`resume.pdf`);
    });
}


    // <pre ref={pdfRef}>{JSON.stringify(resumes, null, 2)}</pre>

    return (
        <>
            <div className=' w-100 text-center'>
                <h1>MY RESUME</h1>
                <div id="styled-content" style={{ height: "90vh" ,backgroundColor:"LightGray" }} ref={pdfRef}>
                    <div className="container mt-4 h-100">
                        <div className='row h-100 mb-5'>
                            <div className="col-4 p-5">
                                <div className="h-100 ">
                                    <div className="jumbotron h-100">
                                        <div className='row justify-content-center w-20'>
                                            <div className="rounded-circle overflow-hidden" style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: '150px', height: '150px', backgroundImage: `url(${currentResume.imageUrl})` }}> 
                                        </div> 
                                    </div>
                                    <h1 className="display-4">{currentResume.fullName}</h1>
                                 
                                    <hr />
                                </div>
                            </div>
                        </div>

                        <div className="col-8 p-5">
                            <div className="">
                                <div className="card mb-5 h-20">
                                    <div className="card-body">
                                        <h2 className="card-title">Education</h2>
                                        <ul>
                                            {currentResume.educations?.map((e, index) => (
                                                <li key={index}>
                                                    <p className="card-text">{`  ${e.learning}- ${e.timeFrame} `}</p>
                                                   
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h2 className="card-title">Work Experience</h2>
                                        <ul>
                                            {currentResume.companies?.map((c, index) => (
                                                <li key={index}>
                                                    <p className="card-text">{c.timeFrame}-{c.companyName}</p>



                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <button onClick={downloadPDF} class="btn btn-secondary btn-lg btn-block w-100 mb-5" >download PDF</button>
        </div >
        
        <button type="button" class="btn btn-secondary btn-lg btn-block w-100" onClick={handleNavigate}>My Resumes</button>

        </>
    )
}