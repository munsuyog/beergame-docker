import React from "react";

const PopUp = ({ setOpenPopUp, openPopUp, value, setValue }) => {
  return (
    <div className="relative inline-block text-left ">
      <div>
        <button
          onClick={() => {
            setOpenPopUp(!openPopUp);
            setOpenPopUp(true);
          }}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {value}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRrule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {openPopUp && (
        <div className="absolute md:right-0 sm:left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
              onClick={() => {
                setValue("Spanish");
                setOpenPopUp(false);
              }}
            >
              Spanish
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
              onClick={() => {
                setValue("Hindi");
                setOpenPopUp(false);
              }}
            >
              Hindi
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
              onClick={() => {
                setValue("Marathi");
                setOpenPopUp(false);
              }}
            >
              Marathi
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
