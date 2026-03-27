"use client";
import { useEffect, useState } from "react";

import ImageCard from "./components/ImageCard";
import Moves from "./components/Moves";
import Locations from "./components/Locations";
import Abilities from "./components/Abilities";
import Evolution from "./components/Evolutions";
import Favorites from "./components/Favorites";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";



export interface Pokemon {
  id: number;
  name: string;
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  types: { type: { name: string } }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  location_area_encounters: string;
}

export interface Location {
  location_area: { name: string };
}

export default function Home() {
  const [data, setData] = useState<Pokemon | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [evolutions, setEvolutions] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchPokemon = async (name: string | number) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data: Pokemon = await res.json();
    if (data.id > 649)
    {return setOpenModal(true);}
    setData(data);

    fetchLocations(data.location_area_encounters);
    fetchEvolutions(data.id);
  };

  const fetchLocations = async (url: string) => {
    const res = await fetch(url);
    const data: Location[] = await res.json();
    setLocations(data);
  };

  const fetchEvolutions = async (id: number) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const species = await res.json();

    const evolutionRes = await fetch(species.evolution_chain.url);
    const evolutionData = await evolutionRes.json();

    let names: string[] = [];
    names.push(evolutionData.chain.species.name);

    evolutionData.chain.evolves_to.forEach((evolution: any) => {
      names.push(evolution.species.name);
      evolution.evolves_to.forEach((evolved: any) => {
        names.push(evolved.species.name);
      });
    });

    setEvolutions(names);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const updateFavorites = (list: string[]) => {
    localStorage.setItem("favorites", JSON.stringify(list));
    setFavorites(list);
  };

  const toggleFavorite = () => {
    if (!data) return;

    let updated: string[];
    if (favorites.includes(data.name)) {
      updated = favorites.filter((favorite) => favorite !== data.name);
    } else {
      updated = [...favorites, data.name];
    }
    updateFavorites(updated);
  };

  const handleSearch = () => {
    if (!input) return;
    if (Number(input) > 649)
    {setOpenModal(true)
      return;
    }
    fetchPokemon(input.toLowerCase());
    setInput("");
  };

  const randomPokemon = () => {
    const rnd = Math.floor(Math.random() * 649) + 1;
    fetchPokemon(rnd);
  };

  useEffect(() => {
    fetchPokemon("pikachu");
  }, []);

  if (!data) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[url(/assets/pokebg.jpg)] bg-size-[100px_100px] bg-repeat flex place-items-center flex-col">
     <div className="max-w-[850px]">
      <h1 className="text-center text-7xl mb-6 capitalize pokemonFont font-['Fugaz_One']">
        Who's that Pokémon?
      </h1>
      
      <div className="flex justify-center mb-6">
        <input
          className="border py-2 rounded-3xl bg-white shadow-lg shadow-gray-700 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-[#386ABB] text-[#FFCC03]! font-['Fugaz_One'] rounded-3xl px-4"
        >
          Enter
        </button>
        <button
          onClick={randomPokemon}
          className="bg-[#386ABB] text-[#FFCC03]! font-['Fugaz_One'] rounded-3xl px-4"
        >
          Random
        </button>
      </div>

      <h2 className="text-center text-7xl mb-6 capitalize pokemonFont font-['Fugaz_One']">
        It's {data.name}!
      </h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:1 grid-cols-1 lg:gap-5 md:gap-5 sm:gap-5 lg:mx-20 md:mx-10 sm:mx-5 lg:px-5 md:px-5 sm:px-5 gap-y-5 p-5 h-fit  place-content-center bg-[#386ABBaa] max-w-[850px] flex-col justify-center rounded-xl">
        <div className="grid lg:col-span-1 md:col-span-1 sm:col-span-full lg:row-span-2 lg:order-1 md:order-1 sm:order-1">
          <ImageCard
            data={data}
            isShiny={isShiny}
            setIsShiny={setIsShiny}
            toggleFavorite={toggleFavorite}
            isFavorited={favorites.includes(data.name)}
          />
        </div>
        <div className="grid col-span-2 row-span-1 lg:order-2 md-order-3 sm:order-3">
          <Moves moves={data.moves} />
        </div>

        <div className="grid col-span-2 row-span-1 lg:order-3 md-order-4 sm:order-4">
          <Locations locations={locations} />
        </div>
        <div className="grid col-span-1 row-span-1 lg:order-4 md-order-2 sm:order-2">
          <Abilities abilities={data.abilities} />
        </div>
        <div className="grid col-span-2 row-span-1 lg:order-4 md-order-5 sm:order-5 ">
        <Evolution evolutions={evolutions} />
        </div>
        <div className="grid col-span-full row-span-1 w-full lg:order-6 md-order-6 sm:order-6">
        <Favorites favorites={favorites} fetchPokemon={fetchPokemon} toggleFavorite={toggleFavorite} />
        </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalBody className="text-center bg-white! rounded-t-2xl">
            <p>This application only supports pokemon with a pokedex number between 1 and 649.</p>
        </ModalBody>
        <ModalFooter className="flex place-content-center bg-white! rounded-b-2xl">
          <Button className="w-full bg-[#386ABB]! text-[#FFCC03]! font-['Fugaz_One']" onClick={() => setOpenModal(false)}>Got it!</Button>
        </ModalFooter>
      </Modal>
      </div>
    </div>
  );
}
