import React,{useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ResumesContext from '../context/resumes';

const MyPage = () => {
    const navigate=useNavigate();
    const { resumes ,getAllResumes,userLogin} = useContext(ResumesContext);

    const handleClick = (index) => {
        navigate(`/resume/${index}`);
      };
      const handleAdd = (index) => {
        navigate(`/form`);
      };
      useEffect(() => {
        getAllResumes();
        console.log(resumes.length)
    }, [])
    return (
      <div className="container-fluid bg-light">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 text-center">
            <h1 className="mb-4">הרשימה שלי</h1>
            <div className="btn-group flex flex-wrap" role="group">
              {resumes.map((r, index) => (
                <div className="card" style={{ width: "18rem",heigth:"50px" }} key={index} onClick={() => handleClick(index)} key={index}>
<img className="card-img-top h-100" src={resumes[index].imageUrl} alt="Card image cap" style={{ heigth:"100%" }}/>
                  <div className="card-body">
                    <p className="card-text">
                    resume : {resumes[index].fullName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-purple"
              onClick={handleAdd}
              class="btn btn-secondary btn-lg btn-block w-100"
            >
              יצירת קוח
            </button>
          </div>
        </div>
      </div>
    );
    
}
                                      /// <button type="button" className="btn btn-purple" onClick={() => handleClick(index)} key={index}>resume {resumes[index].fullName}</button>

export default MyPage;
