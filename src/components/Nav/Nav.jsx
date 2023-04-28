import { NavLink, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../features/Auth/Auth.context"
import { MdOutlineBakeryDining } from 'react-icons/md'
import { useState } from "react";



const Nav = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);


    function onLogout() {
        logout()
        navigate('/')
    }

    return (
        <nav>
            <div className="block lg:hidden bg-teal-800">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center p-8 rounded text-white hover:text-black-400 bg-teal-800" >
                    <svg
                        className={`fill-current h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                    <svg
                        className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"} flex items-center justify-between flex-wrap bg-teal-800 p-6`}>
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <MdOutlineBakeryDining className=" fill-current h-8 w-8 mr-2" width="54" height="54" />
                    <span className="font-semibold text-xl tracking-tight">My Baking Journal</span>
                </div>
                <div className="w-full flex flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        <NavLink to="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Home</NavLink>
                        <NavLink to="/recipes" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">My Recipes</NavLink>
                        <NavLink to="/addrecipe" className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>Add New Recipe</NavLink>

                    </div>
                    <div>
                        {user && (
                            <li className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>
                                Hello {user.firstname}!
                                {' '}
                                <a href="#" onClick={onLogout}>Logout</a>
                            </li>
                        )}
                        {!user && (
                            <>
                                <li className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"><NavLink to="/register">Register</NavLink></li>
                                <NavLink to="login" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Login</NavLink>
                            </>
                        )}

                    </div>
                </div>
            </div >

        </nav >
    )
}

export default Nav
