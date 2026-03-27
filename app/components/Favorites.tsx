interface Props {
  favorites: string[];
  fetchPokemon: (name: string) => void;
  toggleFavorite: () => void;
}

const Favorites =({ favorites, fetchPokemon, toggleFavorite }: Props) => {
  return (
    <div className="bg-[#ffffffaa] rounded-xl shadow p-4">
      <h4 className="font-bold text-center mb-4">Favorites</h4>

      <div className="flex flex-wrap gap-3 justify-center text-center">
        {favorites.map((favorite, index) => (
          <span
            key={index}
            onClick={() => fetchPokemon(favorite)}
            className="cursor-pointer px-3 py-1 rounded capitalize"
          >
            {favorite}
            <span onClick={toggleFavorite}>⭐</span>
          </span>
        ))}
      </div>
    </div>
  );
}
export default Favorites