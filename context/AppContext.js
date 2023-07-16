import React, { createContext, useState, useEffect } from "react"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState("")
  const [exercises, setExercises] = useState([])
  const [filteredExercises, setFilteredExercises] = useState([])

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("/api/exercises")
        const data = await response.json()
        setExercises(data.data)
        setFilteredExercises(data.data)
      } catch (error) {
        console.error("Error fetching exercises:", error)
        setExercises([])
        setFilteredExercises([])
      }
    }

    fetchExercises()
  }, [])

  return (
    <AppContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        exercises,
        setExercises,
        filteredExercises,
        setFilteredExercises,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
