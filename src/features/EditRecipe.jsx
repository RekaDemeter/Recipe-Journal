import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "./Auth/Auth.context"
import GlobalMessage from "../components/globalMessage/GlobalMessage";
import Button from "./Button";

const EditRecipe = () => {

    const params = useParams()
    const { token } = useAuthContext()
    const [globalSucces, setGlobalSucces] = useState({ message: '' })
    const [globalError, setGlobalError] = useState({ message: '' });

    const navigate = useNavigate();


    const [values, setValues] = useState({
        name: '',
        ingridents: '',
        instructions: '',
        bakingtime: '',
        image: ''
    })


    useEffect(() => {
        fetch(`http://localhost:3000/recipes/${params.id}`)
            .then(res => {
                if (!res.ok) {
                    throw Error("couldn't fetch the data");
                }
                return res.json();
            })
            .then((data) => {
                setValues(data)
            })
            .catch(error => {
                setGlobalError(error.message)
            })


    }, [])

    if (!values) {
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/recipes/' + params.id, {
            method: 'PATCH',
            body: JSON.stringify({ ...values }),
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        if (res.status === 401) {
            setGlobalError({ message: 'Please login to edit a recipe' })
        } else {
            setGlobalSucces({ message: 'Recipe changed successfully' });
        }
    }


    return (
        <div className="bg-slate-100 p-11">
            <div className="flex flex-col items-center bg-white rounded shadow-lg p-8 mx-4 sm:mx-12 md:mx-30 lg:mx-40">
                <h3 className="mb-6 text-gray-900 font-semibold text-lg">{values.name}</h3>
                <form onSubmit={handleSubmit} className="lg:w-2/3 md:w-3/4 w-full relative">
                    <div className="mb-2">
                        {globalError.message && <div className="font-medium p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-700 " role="alert">
                            <GlobalMessage onMessageClosed={() => setGlobalError('')}>{globalError.message}</GlobalMessage>
                        </div>}
                        {globalSucces.message && <div className="font-medium p-4 mb-4 text-sm text-green-900 rounded-lg bg-green-50 dark:bg-green-300 dark:text-green-800" role="alert">
                            <GlobalMessage onMessageClosed={() => setGlobalSucces('')}>{globalSucces.message}</GlobalMessage>
                        </div>}
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe Name</label>
                        <input type="text" name="name" id="name" placeholder="Recipe Name" value={values.name} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="ingridents" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingridents</label>
                        <input type="text" name="ingridents" id="ingridents" placeholder="Ingridents" value={values.ingridents} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="instructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructions</label>
                        <input type="text" name="instructions" id="instructions" placeholder="Instructions" value={values.instructions} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="bakingtime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baking Time</label>
                        <input type="text" id="bakingtime" name="bakingtime" placeholder="Baking Time" value={values.bakingtime} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                        <input type="text" name="image" id="image" placeholder="Image" value={values.image} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <Button text="Save" />

                </form>
                <div className="flex justify-end">
                    <Button text='Cancel'
                        onClick={() => {
                            navigate(-1)
                        }} />
                </div>
            </div>
        </div>
    )
}

export default EditRecipe
