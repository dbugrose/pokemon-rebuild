import { Pokemon } from "../page";

interface Props {
  data: Pokemon;
  isShiny: boolean;
  setIsShiny: (val: boolean) => void;
  toggleFavorite: () => void;
  isFavorited: boolean;
}

const  ImageCard = ({
  data,
  isShiny,
  setIsShiny,
  toggleFavorite,
  isFavorited,
}: Props) => {
  return (
    <div className="bg-[#ffffffaa] rounded-xl shadow p-4 flex flex-col text-center place-content-center">
      <button onClick={toggleFavorite} className="text-2xl">
        {isFavorited ? "⭐" : "☆"}
      </button>

      <p className="text-black text-3xl">#{data.id}</p>

      <img
        className="mx-auto my-3"
        src={
          isShiny
            ? data.sprites.other["official-artwork"].front_shiny
            : data.sprites.other["official-artwork"].front_default
        }
        width={200}
      />

      <button
      className="flex justify-center"  onClick={() => setIsShiny(!isShiny) }
      >
        {isShiny ? "Shiny Form" : "Default Form"}<img src="/assets/sparkles.png" alt="shiny toggle icon" width="20px"/>
      </button>

      <p className="mt-2 capitalize font-semibold">
        {data.types.map((type) => type.type.name).join(" + ")} Type
      </p>
    </div>
  );
}

export default ImageCard