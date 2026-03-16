 "use client";

export default function Calendar() {
  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-gray-200 px-6 py-8 lg:flex-none">
        <h1 className="text-xl font-semibold leading-7 text-gray-900">
          <time dateTime="2022-01">January 2022</time>
        </h1>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end sm:justify-start">
          {/* Month navigation */}
          <div className="flex items-center rounded-md bg-white shadow-sm ring-1 ring-gray-200 p-1">
            <button
              type="button"
              className="flex h-10 w-12 items-center justify-center rounded-l-md border border-gray-300 p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
              </svg>
            </button>

            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-sm font-semibold text-gray-900 hover:bg-gray-50 mx-1 rounded-md"
            >
              Today
            </button>

            <button
              type="button"
              className="flex h-10 w-12 items-center justify-center rounded-r-md border border-gray-300 p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
              </svg>
            </button>
          </div>

          {/* Add event */}
          <button className="ml-auto sm:ml-0 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 shadow-md hover:shadow-lg transition-all flex-shrink-0">
            Add event
          </button>
        </div>
      </header>

      {/* CALENDAR */}
      <div className="shadow-xl ring-1 ring-gray-200 lg:flex lg:flex-auto lg:flex-col">
        {/* WEEKDAYS */}
        <div className="grid grid-cols-7 gap-1 border-b border-gray-300 bg-gray-100 text-center text-sm font-semibold leading-6 text-gray-800 p-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="bg-white py-3 px-4 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors border border-gray-100">
              {day}
            </div>
          ))}
        </div>

        {/* DAYS GRID (desktop) */}
        <div className="hidden bg-gray-100 lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-2 p-6">
          <div className="relative bg-gray-50/50 px-5 py-6 text-gray-500 rounded-xl shadow-inner border border-dashed border-gray-200 min-h-0 flex flex-col justify-between">
            <time dateTime="2021-12-27" className="text-lg font-bold block mx-auto mb-2">27</time>
          </div>

          <div className="relative bg-white/70 px-5 py-6 shadow-md border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col gap-3 min-h-0">
            <time
              dateTime="2022-01-12"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-semibold text-white mx-auto mt-1"
            >
              12
            </time>

            <ol className="flex-1 space-y-2 px-2">
              <li className="p-3 rounded-lg bg-linear-to-r from-indigo-50 to-gray-50 border border-indigo-100 shadow-sm hover:bg-indigo-100 transition-all group">
                <a className="group flex items-center justify-between gap-3 h-full">
                  <p className="flex-1 truncate font-medium text-gray-900 group-hover:text-indigo-600 text-sm leading-4">
                    Sam's birthday party
                  </p>
                  <time className="ml-2 text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-md shadow-xs flex-shrink-0 hidden xl:block">
                    2PM
                  </time>
                </a>
              </li>
            </ol>
          </div>

          {/* 👉 repeat same pattern for remaining days */}
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34].slice(0,40).map((n, i) => (
            <div key={i} className="relative bg-white px-5 py-6 border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center hover:scale-[1.01]">
              <time dateTime={`2022-01-${Math.floor(n/2)+1}`} className="text-2xl font-bold text-gray-600">{Math.floor(n/2)+1}</time>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

];
