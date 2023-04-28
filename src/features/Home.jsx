import { useAuthContext } from "./Auth/Auth.context";
import { NavLink } from "react-router-dom"



const Home = () => {
    const { user, logout } = useAuthContext();
    return (
        <div className="bg-teal-500 w-screen h-[calc(100vh-136px)] bg-no-repeat bg-cover bg-right text-7xl italic font-light decoration-neutral-600">
            <div className="flex h-full items-center justify-center">
                <div className="text-white">
                    <h2 className="mb-4 text-5xl font-semibold">Welcome to My Baking Journal
                    </h2>
                    {/* <h4 className="mb-6 text-xl font-semibold">Subheading</h4> */}
                    <div className="flex justify-center">
                        {user && (
                            <>
                                <li className="text-lg block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                                    Hello {user.firstname}!
                                    {' '}
                                    <a href="#" onClick={() => logout()}>Logout</a>
                                </li>
                            </>
                        )}
                        {!user && (
                            <>
                                <NavLink to="/register" className="text-lg block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Register</NavLink>
                                <NavLink to="login" className="text-lg block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Login</NavLink>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home



