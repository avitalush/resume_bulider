import { createContext,  useState } from "react";


const ResumesContext = createContext()

const Provider = ({children})=>{

    const [resumes, setResumes] = useState([]);

    
    const addResume =  (data) => {
        console.log(data)
        setResumes(...resumes,data);
    };

  const shared = {resumes, addResume }
  return (
    <ResumesContext.Provider value={shared}>
        {children}
    </ResumesContext.Provider>
  )
}

export {Provider}
export default ResumesContext
