import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Manager = () => {
    let ref = useRef()
    let passRef = useRef()
    let siteRef = useRef()
    let userRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArr, setpasswordArr] = useState([])  // for local storage only

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            try {
                setpasswordArr(JSON.parse(passwords));
            } catch (e) {
                console.error("Error parsing passwords from localStorage", e);
                localStorage.removeItem("passwords"); // Remove corrupted data
            }
        }
    }, []);
    

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text)
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    const savePassword = () => {
        const updatedPasswordArr = [...passwordArr, { ...form, id: uuidv4() }];
        setpasswordArr(updatedPasswordArr);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswordArr));
        toast('Password Saved', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        siteRef.current.focus();
        setform({ site: "", username: "", password: "" });
    };
    

    const deletePassword = (id) => {
        let c = confirm("Do you want to delete this password?");
        if (c) {
            const updatedPasswordArr = passwordArr.filter((i) => i.id !== id);
            setpasswordArr(updatedPasswordArr);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArr));
            toast('Password Deleted', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            siteRef.current.focus();
        }
    };
    

    const editPassword = (id) => {
        setform(passwordArr.filter((i) => i.id === id)[0])



        setpasswordArr(passwordArr.filter((i) => i.id !== id))


        siteRef.current.focus()



    }


    const showPassword = () => {
        //  for change see password icon
        if (ref.current.src.includes("img/eyecross.png")) {
            ref.current.src = "img/eye.png"
            passRef.current.type = 'password'
        } else {
            ref.current.src = "img/eyecross.png"
            passRef.current.type = 'text'
        }
    }

    return (
        <><ToastContainer />

            {/* this is a backgroung only , website : https://bg.ibelick.com/ */}

            <div className="absolute inset-0 -z-10  w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            {/* let start acctual code here.. */}

            <div className="md:container mt-8 md:mx-auto md:flex  md:justify-center  md:py-10">
                <div className=''>

                    <h1 className='text-4xl text-center'>
                        <span className='text-green-400'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-green-400'>OP/&gt;</span>
                    </h1>
                    <p className='text-center text-green-800 text-lg'>Your Secured Password Manager</p>


                    <div className="flex gap-4 mt-4  flex-col  ">

                        <input onChange={handleChange} ref={siteRef} type="link" value={form.site} className='rounded-full h-8 border border-green-500 w-[900px] text-center ' name="site" id="site" placeholder='Enter Link Here' />
                        <div className="flex gap-2 ">
                            <input onChange={handleChange} ref={userRef} value={form.username} type="username" className='text-center w-[65%] h-8 rounded-full border border-green-500' name="username" id="username" placeholder='Enter username' />
                            <div className='relative w-[35%]'>

                                <input onChange={handleChange} ref={passRef} type="password" value={form.password} className='text-center w-full h-8 rounded-full border border-green-500' name="password" id="password" placeholder='Enter Password' />
                                <span className='absolute right-[20px] top-[4px] cursor-pointer ' onClick={showPassword}>
                                    <img ref={ref} className='p-1' width={26} src="img/eye.png" alt="see" />
                                </span>
                            </div>
                        </div>
                        <div className="btn flex justify-end ">

                            <button onClick={savePassword} className='flex w-[120px] p-5 justify-center items-center border-1 border-green-900 rounded-full h-8  border bg-green-400 hover:bg-green-500'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                                    trigger="click"
                                    className=""
                                    style={{"width":"25px"}}
                                    >
                                </lord-icon>
                               Save
                            </button>
                        </div>
                        <div className="showData  -mt-10">
                            <h3 className='font-bold text-xl py-4'>Your Passwords</h3>
                            {passwordArr.length === 0 && <div className='text-center'>No Password , Please Add some passwords</div>}
                            {passwordArr.length != 0 &&
                                <table className="table-auto w-full rounded-xl overflow-hidden">
                                    <thead className='bg-green-800 text-white'>
                                        <tr>
                                            <th className='py-2'>Site</th>
                                            <th className='py-2'>username</th>
                                            <th className='py-2'>password</th>
                                            <th className='py-2'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-green-100'>
                                        {passwordArr.map((item, index) => {   //return keyword is very very imp
                                            return <tr key={index}>
                                                <td className='px-4 flex justify-center items-center py-2 border border-white text-center'> <a href={item.site} target='_blank'>{item.site}</a>

                                                    <div className="copy cursor-pointer mx-2" onClick={() => { copyText(item.site) }}>
                                                    <i className="fa-solid fa-copy"></i>
                                                    </div>

                                                </td>
                                                <td className='px-4 py-2 border border-white text-center'>
                                                    <div className="flex justify-center items-center">
                                                        <span>{item.username}</span>

                                                        <div className="copy cursor-pointer mx-2" onClick={() => { copyText(item.username) }}>
                                                        <i className="fa-solid fa-copy"></i>
                                                        </div></div>
                                                </td>
                                                <td className=' py-2 px-4 border border-white text-center'>
                                                    <div className="flex justify-center items-center">
                                                        <span>******</span>

                                                        <div className="copy cursor-pointer mx-2 " onClick={() => { copyText(item.password) }}>
                                                        <i className="fa-solid fa-copy"></i>
                                                        </div></div>

                                                </td>
                                                <td className=' py-2 px-4 border border-white text-center'>
                                                    <div className="flex justify-center items-center">


                                                        <div className="copy cursor-pointer "  >
                                                            <button onClick={() => { editPassword(item.id) }}><i className="fa-solid cursor-pointer mx-2 fa-pen-to-square"></i></button>

                                                            &nbsp;
                                                            <lord-icon onClick={() => { deletePassword(item.id) }}
                                                                src="https://cdn.lordicon.com/skkahier.json"
                                                                trigger="click"
                                                                style={{ "width": "20px", "height": "20px", "paddingTop": "4px", "paddingLeft": "5px" }}>
                                                            </lord-icon>
                                                        </div></div>

                                                </td>
                                            </tr>

                                        })}

                                    </tbody>
                                </table>}
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Manager
