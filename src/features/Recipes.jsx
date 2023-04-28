import { useState, useEffect } from "react";
import Recipe from "./Recipe";
import { useAuthContext } from "./Auth/Auth.context";
import GlobalMessage from "../components/globalMessage/GlobalMessage";



const Recipes = () => {

    const { user, token } = useAuthContext();
    const [globalError, setGlobalError] = useState('');
    const [recipes, setRecipes] = useState(null);

    if (user) {
        useEffect(() => {
            fetch(`http://localhost:3000/recipes?userId=${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw Error("couldn't fetch the data");
                    }
                    return res.json();
                })
                .then((data) => {
                    setRecipes(data)
                })
                .catch(error => {
                    setGlobalError(error.message)
                })

        }, [])
    }


    const deleteRecipe = async (id) => {
        const cont = confirm('Are you sure you want to delete this recipe?');
        if (cont) {
            const res = await fetch(`http://localhost:3000/recipes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).catch(error => {
                setGlobalError(error.message)
            });

            if (res.status === 401) {
                alert('Please login to edit a recipe')
            } else {
                setRecipes(recipes.filter((recipe) => recipe.id !== id))
            }

        }
    }


    return (
        <div className="min-h-[calc(100vh-130px)] bg-slate-100">
            {globalError && <div className="font-medium p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-700 flex justify-center" role="alert">
                <GlobalMessage onMessageClosed={() => setGlobalError('')}>{globalError}</GlobalMessage>
            </div>}
            {
                user &&
                <ul className=" min-h-[calc(100vh-130px)] flex flex-row flex-wrap bg-slate-100 w-screen  justify-center">
                    {recipes && recipes.map((recipe) => (
                        <Recipe key={recipe.id} recipe={recipe} onDelete={deleteRecipe} />
                    ))}
                </ul>
            }
            {
                !user && <div className="font-medium p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-700 flex justify-center" role="alert">Please login to view the recipes</div>
            }

        </div >
    )
}

export default Recipes
