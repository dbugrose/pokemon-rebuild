interface Props {
  abilities: { ability: { name: string } }[];
}


const Abilities = ({ abilities }: Props) => {
  return (
    <div className="bg-[#ffffffaa] rounded-xl shadow p-4">
      <h4 className="font-bold text-center mb-2">Abilities</h4>
      <p className="text-sm text-center">
        {abilities.map((ability) => ability.ability.name).join(", ")}
      </p>
    </div>
  );
}

export default Abilities