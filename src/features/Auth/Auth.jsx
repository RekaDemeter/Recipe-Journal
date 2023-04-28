import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import GlobalMessage from "../../components/globalMessage/GlobalMessage";
import { useAuthContext } from "./Auth.context";
import Button from "../Button";


const Auth = () => {

    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repassword: ''
    })


    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repassword: ''
    });

    const [globalError, setGlobalError] = useState('');
    const [globalSucces, setGlobalSucces] = useState({ message: '' })

    const { login, token } = useAuthContext();
    const { pathname } = useLocation();
    const isLogin = (pathname === '/login');


    function isFormValid() {
        let isValid = true;
        const newErrors = { ...errors }

        if (!values.email.trim()) {
            isValid = false;
            newErrors.email = 'Please type a valid email.'
        }
        if (!values.password.trim()) {
            isValid = false;
            newErrors.password = 'Please type a valid password.'
        }

        if (!isLogin) {

            if (values.repassword !== values.password) {
                isValid = false;
                newErrors.repassword = 'The two passwords did not match'
            }
            if (!values.lastname.trim()) {
                isValid = false;
                newErrors.lastname = 'Please type a valid first name.'
            }
            if (!values.firstname.trim()) {
                isValid = false;
                newErrors.firstname = 'Please type a valid last name.'
            }
        }

        setErrors(newErrors);

        return isValid;
    }


    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!isFormValid()) {
            return;
        }

        let userData;
        if (isLogin) {
            userData = {
                email: values.email,
                password: values.password
            }
        } else {
            userData = { ...values }
            delete userData.repassword;
        }

        userData = { ...values }
        delete userData.repassword;

        const res = await fetch(`http://localhost:3000/${isLogin ? 'login' : 'register'}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (res.ok === false) {
            const errorMessage = await res.json();
            setGlobalError(errorMessage)
            return;
        }
        setGlobalSucces({ message: isLogin ? 'You logged in successfully' : 'User created successfully' });

        const data = await res.json();

        login(data.accessToken, data.user);
        navigate("/")
    }

    return (
        <div className="bg-slate-100 p-20 w-screen min-h-[calc(100vh-130px)]">
            <div className="flex flex-col items-center bg-white rounded shadow-lg p-8 mx-1 sm:mx-30 md:mx-30 lg:mx-40">
                <h3 className="mb-6 text-gray-900 font-semibold text-lg">{isLogin ? 'Login' : 'Register'}</h3>
                {globalError && <div className="font-medium p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-700 w-2/3" role="alert">
                    <GlobalMessage onMessageClosed={() => setGlobalError('')}>{globalError}</GlobalMessage>
                </div>}
                {globalSucces.message && <div className="font-medium p-4 mb-4 text-sm text-green-900 rounded-lg bg-green-50 dark:bg-green-300 dark:text-green-800 w-2/3" role="alert">
                    <GlobalMessage onMessageClosed={() => setGlobalSucces('')}>{globalSucces.message}</GlobalMessage>
                </div>}
                <form onSubmit={handleSubmit} className="lg:w-2/3 md:w-3/4 w-full">
                    <div>
                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" name="email" id="email" placeholder="Email" value={values.email} onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        {errors.email && <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors.email}</p>}
                        <div className="mb-2">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" value={values.password} onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        {errors.password && <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors.password}</p>}

                        {!isLogin && (
                            <>
                                <div className="mb-2">
                                    <label htmlFor="repassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input type="password" name="repassword" id="repassword" placeholder="Confirm Password" value={values.repassword} onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                {errors.repassword && <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors.repassword}</p>}
                                <div className="mb-2">
                                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input type="text" id="firstname" name="firstname" placeholder="First Name" value={values.firstname} onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                {errors.firstname && <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors.firstname}</p>}
                                <div className="mb-2">
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input type="text" name="lastname" id="lastname" placeholder="Last Name" value={values.lastname} onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                {errors.lastname && <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors.lastname}</p>}
                            </>
                        )}
                    </div>
                    <Button text={isLogin ? 'Login' : 'Register'} />

                </form>
            </div>
        </div>
    )
}

export default Auth
