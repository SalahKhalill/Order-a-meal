import React, { useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
function AvailableMeals(props) {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                'https://food-app-6b586-default-rtdb.firebaseio.com/meals.json'
            )
            if (!response.ok) {
                throw new Error('something went wrong')
            }
            const responseData = await response.json()
            const loadedMeals = []
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }
            setMeals(loadedMeals)
            setIsLoading(false)
        }
        fetchMeals().catch((error) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [])

    if (httpError) {
        return (
            <section className={classes.httpError}>
                <p>{httpError}</p>
            </section>
        )
    }
    if (isLoading) {
        return (
            <section className={classes.isLoading}>
                <p>Loading...</p>
            </section>
        )
    }
    const mealList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ))
    return (
        <section className={classes.meals}>
            <Card>
                {/* {httpError && <p>{httpError}</p>} */}
                {isLoading && <p>Loading...</p>}
                {!isLoading && <ul>{mealList}</ul>}
            </Card>
        </section>
    )
}

export default AvailableMeals
