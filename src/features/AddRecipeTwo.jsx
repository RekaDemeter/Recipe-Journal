import { useState } from "react"
import GlobalMessage from "../components/globalMessage/GlobalMessage";
import { useAuthContext } from "./Auth/Auth.context";
import Button from "./Button";


const AddRecipeTwo = ({ text }) => {
    const [values, setValues] = useState({
        name: '',
        ingridents: '',
        instructions: '',
        bakingtime: '',
        image: ''
    })


    const [errors, setErrors] = useState({
        name: '',
        ingridents: '',
        instructions: '',
        bakingtime: '',
        image: ''
    });

    const [globalError, setGlobalError] = useState('');
    const [globalSucces, setGlobalSucces] = useState({ message: '' })

    const { user, token } = useAuthContext();

    function isFormValid() {
        let isValid = true;
        const newErrors = { ...errors }

        if (!values.name.trim()) {
            isValid = false;
            newErrors.name = 'Please type in a recipe name.'
        }
        if (!values.ingridents.trim()) {
            isValid = false;
            newErrors.ingridents = 'Please type in the ingridents.'
        }

        if (!values.instructions.trim()) {
            isValid = false;
            newErrors.instructions = 'Please type in the instructions.'
        }

        if (!values.bakingtime.trim()) {
            isValid = false;
            newErrors.bakingtime = 'Please type in the baking time.'
        }



        setErrors(newErrors);

        return isValid;
    }

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    }


    async function handleSubmit(e) {
        e.preventDefault()

        if (!isFormValid()) {
            return;
        }

        const recipeData = { ...values, userId: user.id }

        const res = await fetch('http://localhost:3000/recipes', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(recipeData)
        }).catch(error => {
            setGlobalError(error.message)
        });

        if (res.ok === false) {
            const errorMessage = await res.json();
            setGlobalError(errorMessage)
            return;
        }


        setGlobalSucces({ message: 'Recipe added successfully' });


    }

    return (
        <div className="min-h-[calc(100vh-130px)] bg-slate-100 ">
            {user &&
                <div className="flex flex-col items-center bg-white rounded shadow-lg p-8 mx-4 sm:mx-40 md:mx-30 lg:mx-40">
                    <h3 className="mb-6 text-gray-900 font-semibold text-lg">{text}</h3>
                    {globalError && <div className="font-medium p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-700 w-2/3" role="alert">
                        <GlobalMessage onMessageClosed={() => setGlobalError('')}>{globalError}</GlobalMessage>
                    </div>}
                    {globalSucces.message && <div className="font-medium p-4 mb-4 text-sm text-green-900 rounded-lg bg-green-50 dark:bg-green-300 dark:text-green-800 w-2/3" role="alert">
                        <GlobalMessage onMessageClosed={() => setGlobalSucces('')}>{globalSucces.message}</GlobalMessage>
                    </div>}
                    <form onSubmit={handleSubmit} className="lg:w-2/3 md:w-3/4 w-full">
                        <div>


                            <div className="mb-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe Name</label>
                                <input type="text" name="name" id="name" placeholder="Recipe Name" value={values.name} onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {errors.name && <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>}

                            <div className="mb-2">
                                <label htmlFor="ingridents" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingridents</label>
                                <input type="text" name="ingridents" id="ingridents" placeholder="Ingridents" value={values.ingridents} onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {errors.ingridents && <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors.ingridents}</p>}


                            <div className="mb-2">
                                <label htmlFor="instructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructions</label>
                                <input type="text" name="instructions" id="instructions" placeholder="Instructions" value={values.instructions} onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {errors.instructions && <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors.instructions}</p>}

                            <div className="mb-2">
                                <label htmlFor="bakingtime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baking Time</label>
                                <input type="text" id="bakingtime" name="bakingtime" placeholder="Baking Time" value={values.bakingtime} onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {errors.bakingtime && <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors.bakingtime}</p>}

                            <div className="mb-2">
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                                <input type="text" name="image" id="image" placeholder="Image url" value={values.image} onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {errors.image && <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors.image}</p>}

                        </div>
                        <Button text="Add recipe" />

                    </form>
                </div>}
            {!user && <div className=" min-h-[calc(100vh-130px)]" role="alert"><div className='font-medium p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-700 flex justify-center'>Please login to add a recipe</div></div>
            }
        </div>
    )
}

export default AddRecipeTwo
