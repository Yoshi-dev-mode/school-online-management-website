'use client';

import Image from "next/image";
import { food_pictures } from "@/app/components/Mainpage";

interface Props {
  params: {
    id: string;
  };
}

export default function ChosenFood({ params }: Props) {
  const { id } = params; // now works

  const index = parseInt(id);
  if (isNaN(index) || index < 0 || index >= food_pictures.length) {
    return <div>Food not found</div>;
  }

  const food = food_pictures[index];

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">{food.name}</h1>
      <Image src={food.img} alt={food.alt} width={400} height={400} />
      <p className="text-xl text-main-red mt-3">{food.price}</p>
    </div>
  );
}
