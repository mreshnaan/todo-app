import React, { forwardRef, useState } from "react";
import { useCombobox } from "downshift";
import cx from "classnames";
import Editor from "./Editor";

const Assessment = forwardRef(({ expanded, onClick, listeners }, ref) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const disorders = [
    {
      id: "disorder-1",
      name: "Thiamine Deficiency",
      category: "Nutritional Disorders",
    },
    {
      id: "disorder-2",
      name: "Bipolar Disorder",
      category: "Psychological Disorders",
    },
    {
      id: "disorder-3",
      name: "Schizophrenia",
      category: "Psychological Disorders",
    },
    {
      id: "disorder-4",
      name: "Iron Deficiency Anemia",
      category: "Nutritional Disorders",
    },
    {
      id: "disorder-5",
      name: "Generalized Anxiety Disorder",
      category: "Psychological Disorders",
    },
    {
      id: "disorder-6",
      name: "Osteoporosis",
      category: "Nutritional Disorders",
    },
    {
      id: "disorder-7",
      name: "Depression",
      category: "Psychological Disorders",
    },
    {
      id: "disorder-8",
      name: "Vitamin D Deficiency",
      category: "Nutritional Disorders",
    },
  ];

  function getDisordersFilter(inputValue) {
    const lowerCasedInputValue = inputValue.toLowerCase();
    return function disordersFilter(disorder) {
      return (
        !inputValue ||
        disorder.name.toLowerCase().includes(lowerCasedInputValue) ||
        disorder.category.toLowerCase().includes(lowerCasedInputValue)
      );
    };
  }

  function ComboBox() {
    const [items, setItems] = useState(disorders);

    const {
      isOpen,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      onInputValueChange({ inputValue }) {
        setItems(disorders.filter(getDisordersFilter(inputValue)));
      },
      items,
      selectedItem: null,
      itemToString(item) {
        return item ? item.name : "";
      },
      onSelectedItemChange: ({ selectedItem }) => {
        if (!selectedItem) {
          return;
        }
        const index = selectedItems.findIndex(
          (item) => item.id === selectedItem.id
        );
        if (index > -1) {
          setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((item) => item.id !== selectedItem.id)
          );
        } else {
          setSelectedItems([...selectedItems, selectedItem]);
        }
      },
      stateReducer: (state, actionAndChanges) => {
        const { changes, type } = actionAndChanges;
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            return {
              ...changes,
              isOpen: true,
              highlightedIndex: state.highlightedIndex,
              inputValue: "",
            };
          case useCombobox.stateChangeTypes.InputBlur:
            return {
              ...changes,
              inputValue: "",
            };
          default:
            return changes;
        }
      },
    });

    const inputPlaceholder = "Search or enter new diagnosis";

    const removeSelectedItem = (itemToRemove) => {
      setSelectedItems(
        selectedItems.filter((item) => item.id !== itemToRemove.id)
      );
    };

    return (
      <div>
        <div className="w-full flex flex-col gap-1">
          {selectedItems.length > 0 && (
            <div className="mt-2">
              <ul className="list-disc list-inside">
                {selectedItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>{item.name}</span>
                    <div className="rounded-sm bg-[#DEEAF1] p-2 text-black">
                      {item.category}
                    </div>
                    <button
                      onClick={() => removeSelectedItem(item)}
                      className="ml-2 text-red-500"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex shadow-sm bg-white gap-0.5">
            <input
              placeholder={inputPlaceholder}
              className="w-full p-1.5 text-black"
              {...getInputProps()}
            />
          </div>
        </div>
        <ul
          className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) && "hidden"
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={cx(
                  highlightedIndex === index && "bg-blue-300",
                  selectedItems.some(
                    (selectedItem) => selectedItem.id === item.id
                  ) && "font-bold",
                  "py-2 px-3 shadow-sm flex gap-3 items-center"
                )}
                key={item.id}
                {...getItemProps({
                  item,
                  index,
                  "aria-selected": selectedItems.some(
                    (selectedItem) => selectedItem.id === item.id
                  ),
                })}
              >
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={selectedItems.some(
                    (selectedItem) => selectedItem.id === item.id
                  )}
                  onChange={() => {
                    if (
                      selectedItems.some(
                        (selectedItem) => selectedItem.id === item.id
                      )
                    ) {
                      removeSelectedItem(item);
                    } else {
                      setSelectedItems([...selectedItems, item]);
                    }
                  }}
                />
                <div className="flex flex-col text-black">
                  <span>{item.name}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        width: "600px",
        transition: "height 0.3s ease",
      }}
      className="border-2 rounded-t rounded-lg border-[#517894]"
    >
      <div
        className={`flex items-center m-0 gap-4 bg-[#517894] border-2 border-[#517894]  text-white cursor-pointer navbar-box ${
          expanded ? "expanded" : ""
        }`}
      >
        <div {...listeners} className="text-black px-10 py-1 text-center text-[12px] bg-yellow-50">
          drag me
        </div>

        <div onClick={onClick} className="w-full h-full">
          <h2 className="font-semibold text-xl flex items-center gap-2">
            Assessment{" "}
            {selectedItems.length > 0 && (
              <div className="bg-[#C1E6FF] p-2 text-sm rounded-sm">
                {selectedItems.length} Diagnosis
              </div>
            )}
          </h2>
        </div>
      </div>

      {expanded && (
        <div
          className={`${
            expanded ? "block" : "hidden"
          } py-4 px-4 min-h-[400px] max-h-[600px] bg-white text-black`}
        >
          <div>
            <h3 className="font-semibold text-lg mb-1 pb-1 border-b ">
              Diagnosis
            </h3>
            <ComboBox />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 pb-1 border-b">Notes</h3>
            <Editor />
          </div>
        </div>
      )}
    </div>
  );
});

export default Assessment;
