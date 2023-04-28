import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const Recipe = ({ recipe, onDelete }) => {
    return (
        <>

            <div className='m-8'>
                <li key={recipe.id} className="relative flex flex-col items-center bg-white rounded shadow-lg m-5 p-5 w-80 h-90" >
                    <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(recipe.id)} className='absolute top-2 right-2' />
                    <img className="object-cover h-48 w-96 m-4" src={recipe.image} />
                    <h1><Link to={`/recipe/${recipe.id}`} className='font-bold text-xl tracking-wider'>{recipe.name}</Link></h1>

                </li>

            </div>
        </>
    )
}
export default Recipe
