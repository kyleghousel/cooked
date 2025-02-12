import React, { useEffect, useState } from "react";

const RecipeGenerator = () => {
    const [cuisines, setCuisines] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState("");
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchCuisines = async () => {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
            const data = await response.json();
            setCuisines(data.meals);
        };

        fetchCuisines();
    }, []);

    const fetchRecipeByCuisine = async () => {
        if (!selectedCuisine) return;
        
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCuisine}`);
        const data = await response.json();
        
        if (data.meals) {
            const randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)];
            
            // Fetch full details for the selected meal
            const detailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${randomMeal.strMeal}`);
            const detailsData = await detailsResponse.json();

            if (detailsData.meals) {
                setRecipe(detailsData.meals[0]); // Store full recipe details
            }
        }
    };

    const fetchRandomRecipe = async () => {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        
        if (data.meals) {
            setRecipe(data.meals[0]); // Set the fetched random meal
        }
    };


    return (
        <div className="flex flex-col justify-start items-center gap-4 flex-none">
            <div className="static top-0 z-10 bg-white shadow-md p-4 flex flex-col items-center space-y-4">
                <div className="flex flex-row justify-center p-2 gap-2">
                    <label htmlFor="cuisines" className="flex self-center">Get Started:</label>
                    <select
                        name="cuisines"
                        className="border border-gray-300 rounded-md p-2 bg-white text-gray-700"
                        onChange={(e) => setSelectedCuisine(e.target.value)}
                    >
                        <option value="">Select a cuisine</option>
                        {cuisines.map((cuisine) => (
                            <option key={cuisine.strArea} value={cuisine.strArea}>
                                {cuisine.strArea}
                            </option>
                        ))}
                    </select> 
                </div>

                <div className="flex flex-row justify-evenly gap-4">
                    <button
                        className="bg-blue-400 p-3 rounded-full hover:bg-blue-300"
                        onClick={fetchRecipeByCuisine}
                    >
                        Find Recipe
                    </button>
                    <button
                        className="bg-blue-400 p-3 rounded-full hover:bg-blue-300"
                        onClick={fetchRandomRecipe}
                    >
                        Surprise Me!
                    </button>
                </div>
            </div>

            {recipe && (
                <div className="flex flex-row">
                    <div className="flex flex-col text-center mt-4 p-10">
                        <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
                        <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            className="w-50 h-50 rounded-lg shadow-md mt-2"
                        />
                        <h3 className="text-xl pt-2 pb-2">Ingredients</h3>
                        <ul className="list-disc list-outside text-sm flex flex-col justify-start content-start">
                            {Object.keys(recipe)
                                .filter(key => key.startsWith("strIngredient") && recipe[key])
                                .map((ingredientKey, index) => (
                                    <li className="self-start text-left"key={index}>{recipe[ingredientKey]} - {recipe[`strMeasure${index + 1}`]} </li>
                                ))}
                        </ul>
                    </div>

                    <div className="flex flex-col p-10 ml-10 mr-10">
                        <h3 className="text-xl text-center pb-5">Instructions</h3>
                        <p>{recipe.strInstructions}</p>
                        <br></br>
                        {["Vegetarian", "Vegan", "Seafood"].includes(recipe.strCategory) && (
                            <p>{recipe.strCategory}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeGenerator;
