import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Button, Container, NumInput } from "@/components/ui"
import Link from "next/link"
import Image from "next/image"
import Message from "@/components/Message/Message"

const ExercisePage = () => {
  const [exercise, setExercise] = useState([])
  const [savedData, setSavedData] = useState(null)
  const [sets, setSets] = useState(0)
  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState(0)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const { slug } = router.query
  const userId = 3

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const exerciseResponse = await fetch(`/api/exercise/${slug}`)
          const exerciseData = await exerciseResponse.json()
          setExercise(exerciseData.data)

          if (exerciseData.data && exerciseData.data.exercise_id) {
            const userExerciseResponse = await fetch(
              `/api/${userId}/exercise/${exerciseData.data.exercise_id}`
            )
            const userExerciseData = await userExerciseResponse.json()
            if (userExerciseData.data[0]) {
              setSavedData(userExerciseData.data[0])
              setSets(userExerciseData.data[0].sets)
              setReps(userExerciseData.data[0].reps)
              setWeight(userExerciseData.data[0].weight)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching exercises:", error)
        setExercise([])
      }
    }

    fetchData()
  }, [slug, userId])

  const handleSetsChange = (value) => {
    setSets(value)
  }

  const handleRepsChange = (value) => {
    setReps(value)
  }

  const handleWeightChange = (value) => {
    setWeight(value)
  }

  const saveUserData = async() => {
    try {
      const response = await fetch(`/api/${userId}/exercise/${exercise.exercise_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sets, reps, weight }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(data.message)
        router.reload();
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error during save:", error)
      setMessage("An error occurred during save.") // Generic error message
    }
  }

  if (!exercise) return null

  return (
    <Container id="main">
      <div className="text-sm w-full text-left py-6">
        <Link href="/">Back</Link>
      </div>
      <div className="flex w-full font-medium">
        <div className="w-[186px] rounded-2xl overflow-hidden h-[186px]">
          <div
            className="relative"
            style={{ paddingBottom: "100%", height: 0 }}
          >
            <Image
              src={`/exercises/${exercise.exercise_image}.png`}
              alt="exercise"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="w-1/2 pl-2 flex-auto">
          <div className="text-base font-medium">{exercise.exercise_name}</div>
          <div className="text-sm text-lightGray">
            Last trained on xx/xx/xxxx
          </div>
          <div className="flex flex-wrap gap-[6px]">
            <div className="ft-box flex-auto">
              <div className="flex flex-col justify-between bg-darkGray rounded-lg p-2">
                <div className="text-lightGray text-sm">Sets</div>
                <div className="text-2xl font-bold">{savedData ? savedData.sets : 0}</div>
              </div>
            </div>
            <div className="ft-box flex-auto">
              <div className="flex flex-col justify-between bg-darkGray rounded-lg p-2">
                <div className="text-lightGray text-sm">Reps</div>
                <div className="text-2xl font-bold">{savedData ? savedData.reps : 0}</div>
              </div>
            </div>
            <div className="ft-box flex-auto">
              <div className="flex flex-col justify-between bg-darkGray rounded-lg p-2">
                <div className="text-lightGray text-sm">Weight</div>
                <div className="text-2xl font-bold">
                  {savedData ? savedData.weight : 0}
                  <span className="text-sm font-medium text-lightGray">
                    {" "}
                    Kg
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="font-medium w-full py-4">Update</h3>
      <div className="flex w-full gap-2 flex-wrap font-medium">
        <NumInput label="Sets" savedValue={sets} onChange={handleSetsChange} />
        <NumInput label="Reps" savedValue={reps} onChange={handleRepsChange} />
        <NumInput
          label="Weight (Kg)"
          savedValue={weight}
          onChange={handleWeightChange}
        />
      </div>
      <div className="mt-[30px] w-full">
        <Button color="red" onClick={saveUserData}>Save</Button>
        <Message message={message} />
      </div>
    </Container>
  )
}

export default ExercisePage
