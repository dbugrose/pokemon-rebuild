interface Location {
  location_area: { name: string };
}

interface Props {
  locations: Location[];
}

const Locations = ({ locations }: Props) => {
  return (
    <div className="bg-[#ffffffaa] rounded-xl shadow p-4 max-h-80 overflow-auto">
      <h4 className="font-bold text-center mb-2">Locations</h4>
      <p className="text-sm  text-center">
        {locations.length === 0
          ? "N/A"
          : locations.map((location) => location.location_area.name).join(", ")}
      </p>
    </div>
  );
}

export default Locations