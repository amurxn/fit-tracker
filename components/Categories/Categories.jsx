import React, { useEffect, useRef, useState, useContext } from "react"
import Image from "next/image"
import { AppContext } from '../../context/AppContext';

const Categories = () => {
  const categoriesRef = useRef(null)
  const [categories, setCategories] = useState([])
  const { activeCategory, setActiveCategory, exercises, setExercises, filteredExercises, setFilteredExercises } = useContext(AppContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        setCategories(data.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    let initialX = null
    let scrollX = 0
    let animationFrame = null
    let isDragging = false

    const handleTouchStart = (event) => {
      initialX = event.touches[0].clientX
      scrollX = categoriesRef.current.scrollLeft
      isDragging = true
    }

    const handleTouchMove = (event) => {
      if (initialX === null) {
        return
      }

      const currentX = event.touches[0].clientX
      const diffX = initialX - currentX
      categoriesRef.current.scrollLeft = scrollX + diffX
      event.preventDefault()
    }

    const handleTouchEnd = () => {
      initialX = null
      isDragging = false
    }

    const categoriesElement = categoriesRef.current

    if (categoriesElement) {
      categoriesElement.addEventListener("touchstart", handleTouchStart)
      categoriesElement.addEventListener("touchmove", handleTouchMove)
      categoriesElement.addEventListener("touchend", handleTouchEnd)
      categoriesElement.addEventListener("touchcancel", handleTouchEnd)
    }

    return () => {
      if (categoriesElement) {
        categoriesElement.removeEventListener("touchstart", handleTouchStart)
        categoriesElement.removeEventListener("touchmove", handleTouchMove)
        categoriesElement.removeEventListener("touchend", handleTouchEnd)
        categoriesElement.removeEventListener("touchcancel", handleTouchEnd)
      }
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  const handleCategoryClick = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setFilteredExercises(exercises)
    } else {
      setActiveCategory(categoryId);
      const filter = exercises.filter((exercise) => 
        exercise.category_id === categoryId
      )
      setFilteredExercises(filter)
    }
  };

  return (
    <div id="categories">
      <ul ref={categoriesRef} className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => {
          const isActive = activeCategory === category.id
          return (
            <li
              key={category.id}
              className={`flex items-center justify-center bg-darkGray rounded-2xl px-4 h-[40px] w-fit gap-1 cursor-pointer ${isActive ? "bg-white text-red-500" : ""}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <Image alt={category.icon} src={`./category-${category.icon}.svg`} width={15} height={15} />
              <div className={`capitalize text-lightGray transition-colors duration-300 ${isActive ? "text-red" : ""}`}>
                {category.name}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
