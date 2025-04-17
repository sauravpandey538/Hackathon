import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export const EventComponent = ({
  event,
  onDelete,
}: {
  event: any;
  onDelete: (id: number) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex  justify-between items-center w-full h-full px-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-sm font-semibold">{event.title}</span>

      {hovered && (
        <FaTrash
          size={32}
          className="text-red-500 cursor-pointer ml-2 -mt-6"
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering other calendar handlers
            onDelete(event.id);
          }}
        />
      )}
    </div>
  );
};
