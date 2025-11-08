export default function SidebarNav({ items, selected, onSelect }) {
  return (
    <nav>
      <ul>
        {items.map((item, index) => {
          const isSelected = item === selected;
          return (
            <li key={item}>
              <button
                onClick={() => onSelect(item)}
                className={`
                  w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium
                  ${
                    isSelected
                      ? "bg-blue-50 border-l-4 border-blue-600 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <span className="font-semibold mr-2">{index + 1}.</span>
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}