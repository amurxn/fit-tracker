import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "../../context/AppContext";
import slugify from "slugify";

const Exercises = () => {
  const { filteredExercises } = useContext(AppContext);

  return (
    <div id="exercises" className="flex flex-wrap w-full justify-between gap-y-3">
      {filteredExercises.map((exercise) => {
        const slug = slugify(exercise.exercise_name, { lower: true });

        return (
          <div key={exercise.exercise_id} className="ft-exercise relative rounded-3xl overflow-hidden">
            <Link href={`/exercise/${slug}`}>
                <Image alt={exercise.exercise_name} src={`/exercises/${exercise.exercise_image}.png`} width={200} height={230} />
                <div className="ft-exercise-overlay w-full h-full absolute top-0 left-0"></div>
                <div className="ft-exercise-content w-full absolute bottom-0 left-0 p-2 flex justify-between">
                  <div className="font-medium">{exercise.exercise_name}</div>
                  <div className="flex justify-center items-center rounded-full bg-white w-fit p-2">
                    <Image alt="Icon" src={`./category-${exercise.category_name}.svg`} width={15} height={15} />
                  </div>
                </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Exercises;
