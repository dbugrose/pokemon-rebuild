interface Props {
  moves: { move: { name: string } }[];
}

const Moves = ({ moves }: Props) => {
  return (
    <div className="bg-[#ffffffaa] rounded-xl shadow p-4 max-h-80 overflow-auto">
      <h4 className="font-bold text-center mb-2">Moves</h4>
      <p className="text-sm  text-center">
        {moves.map((move) => move.move.name).join(", ")}
      </p>
    </div>
  );
}

export default Moves