import { useState, useEffect } from "react"
import { useNavigate, Navigate, useParams, Link } from "react-router-dom"
import GlobalMessage from "../components/globalMessage/GlobalMessage";
import Button from "./Button"

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState({})
    const [globalError, setGlobalError] = useState('');

    const params = useParams()
    const navigate = useNavigate();


    useEffect(() => {
        const fetchRecipe = async () => {
            const res = await fetch(`http://localhost:3000/recipes/${params.id}`);
            const data = await res.json()

            setRecipe(data)
        }
        fetchRecipe()
    }, [])



    return (
        <div className="relative bg-white rounded shadow-lg pb-8 lg:mx-40 md:mx-32 sm:mx-32 mx-8 my-12 ">
            <div className="lg:m-12 sm:m-8 md:m-8  flex flex-col items-center p-12">
                <h3 className="lg:text-4xl sm:text-2xl text-xl font-semibold p-4">{recipe.name}</h3>
                <img src={recipe.image} className="object-cover w-auto h-48 sm:h-52 md:h-64 lg:h-96" />
                <div className="flex flex-wrap w-3/5">
                    <p className="lg:w-1/2 sm:flex-1 p-2 flex flex-col items-center lg:text-lg text-sm"> <span className="font-semibold p-2 ">Ingridents</span> {recipe.ingridents}</p>
                    <p className="lg:w-1/2 sm:w-full p-2 flex flex-col items-center lg:text-lg text-sm"> <span className="font-semibold p-2">Baking time</span> {recipe.bakingtime}</p>

                </div>
                <p className="flex-1 p-2 flex flex-col items-center lg:text-lg text-sm sm:text-md"> <span className="font-semibold p-2">Instructions</span> {recipe.instructions}</p>

            </div>
            <div>
                <div className="absolute bottom-2 right-2 m-3"><Link to='edit' className="text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit this recipe</Link></div>
                <div className="absolute bottom-2 left-2 m-1">
                    <Button text='Go Back'
                        onClick={() => {
                            navigate(-1)
                        }} />
                </div>
            </div>


        </div>
    )
}

export default RecipeDetails
