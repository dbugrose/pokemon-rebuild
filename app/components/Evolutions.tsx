"use client";
import { useEffect, useState } from "react";

interface Props {
  evolutions: string[];
}

type EvolutionProps = {
  name: string;
};

function Evolutions({ name }: EvolutionProps) {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setImage(data.sprites.other["official-artwork"].front_default);
    };
    fetchImage();
  }, [name]);

  return (
    <div className="text-center">
      {image && <img src={image} width={120} className="mx-auto" />}
      <p className="capitalize text-sm">{name}</p>
    </div>
  );
}

const Evolution = ({ evolutions }: Props) => {
  return (
    <div className="bg-[#ffffffaa] rounded-xl shadow p-4">
      <h4 className="font-bold text-center mb-4">Evolution Line</h4>

      <div className="flex justify-center gap-6 flex-wrap">
        {evolutions.length > 1 ? (
          evolutions.map((evolution, index) => (
            <Evolutions key={index} name={evolution} />
          ))
        ) : (
          <p>N/A</p>
        )}
      </div>
    </div>
  );
};

export default Evolution;
