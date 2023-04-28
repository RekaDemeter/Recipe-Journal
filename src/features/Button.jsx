const Button = ({ color, text, onClick }) => {
    return (
        <button onClick={onClick} style={{ backgroundColor: color }} className="text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {text}
        </button>
    )
}

export default Button
