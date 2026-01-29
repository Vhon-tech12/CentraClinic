"use client";

export default function Calendar() {
  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime="2022-01">January 2022</time>
        </h1>

        <div className="flex items-center">
          {/* Month navigation */}
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                />
              </svg>
            </button>

            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 md:block"
            >
              Today
            </button>

            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                />
              </svg>
            </button>
          </div>

          {/* Add event */}
          <button className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            Add event
          </button>
        </div>
      </header>

      {/* CALENDAR */}
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        {/* WEEKDAYS */}
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="bg-white py-2">
              {day}
            </div>
          ))}
        </div>

        {/* DAYS GRID (desktop) */}
        <div className="hidden bg-gray-200 lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
            <time dateTime="2021-12-27">27</time>
          </div>

          <div className="relative bg-white px-3 py-2">
            <time
              dateTime="2022-01-12"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
            >
              12
            </time>

            <ol className="mt-2">
              <li>
                <a className="group flex">
                  <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                    Sam's birthday party
                  </p>
                  <time className="ml-3 hidden text-gray-500 xl:block">
                    2PM
                  </time>
                </a>
              </li>
            </ol>
          </div>

          {/* 👉 repeat same pattern for remaining days */}
        </div>
      </div>
    </div>
  );
}
