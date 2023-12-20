import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useState } from "react";
import { app, database } from "../firebaseconfig";


const ResumesContext = createContext();
const Provider = ({ children }) => {
    const auth = getAuth();
    const collectionRefUsers = collection(database, "users");
    const collectionRefResumse = collection(database, "resumes");
    const [userLogin, setUserLogin] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [user, setUser] = useState({});

    const getUserByEmail = async (email) => {
        const q = query(collection(database, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);

        const filteredData = querySnapshot.docs.map((doc) => doc.data());

        setUser(filteredData[0]);
      
        return filteredData[0];

    }

    // onAuth

    const logInUser = async (data) => {
        debugger
        let res=null;
        console.log(data)
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((response) => {
                console.log("response.user")
               getUserByEmail(response.user.email).then(()=>{
                getAllResumes();
               })
                // res= true
            })
            .catch((err) => {
                console.log(err.message);
                res= false
            });
            return res;
    }

    const register = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password).
            then((response) => {
                getUserByEmail(response.user.email)
                
                addUser(data)

            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    const addUser = (data) => {
        debugger
        addDoc(collectionRefUsers, {
            email: data.email,
            password: data.password,
            role: data.role
        }).
            then((response) => {
                console.log(response.user);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    const getAllResumes = async() => {
        console.log(user); 
  await getUserByEmail(userLogin.email).then((e)=>{
      
 

        getDocs(collectionRefResumse).
            then((response) => {
                
                const temp = []; 

                response.docs.forEach((d) => {
                    let ddd = d.data();
                    if (ddd.ownerId === userLogin?.uid || e?.role === "admin") {
                        let obj = {
                            fullName: ddd.fullName,
                            ownerId: ddd.ownerId,
                            imageUrl: ddd.imageUrl,
                            companies: ddd.companies,
                            educations: ddd.educations,
                        };
                        temp.push(obj)
                    }
                })
                setResumes([...temp])
            })
            .catch((err) => {
                console.log(err.message);
            });
        })
    }
    const addBNewResume = (formData) => {
        console.log(formData, userLogin);
        addDoc(collectionRefResumse, {
            fullName: formData.fullName,
            companies: formData.companies,
            educations: formData.educations,
            imageUrl: formData.imageUrl,
            ownerId: userLogin.uid
        }).
            then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserLogin(user)
        }
        else {
            console.log("user is not connected");
            setUserLogin(null)
        }
    })
    // console.log({ userLogin });

    const shared = { resumes, getAllResumes, userLogin, auth, addUser, user, logInUser, register, addBNewResume,getUserByEmail }
    return (
        <ResumesContext.Provider value={shared}>
            {children}
        </ResumesContext.Provider>
    )
}
export { Provider }
export default ResumesContext