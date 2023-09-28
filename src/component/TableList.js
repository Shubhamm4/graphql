"use client";
import React, { useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Modals from "./Modal";
import { filterDataByUniqueCurrency } from "./currencyFilter";
import PieChart from "./pieChart";

const TableList = ({ data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortDirection, setSortDirection] = useState("asc");
  const [phoneShort, setPhoneShort] = useState("inc");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSort = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    const sorted = [...sortedData].sort((a, b) => {
      if (newSortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedData(sorted);
    setSortDirection(newSortDirection);
  };

  const phoneSort = () => {
    const newSortDirection = phoneShort === "inc" ? "dec" : "inc";
    const sorted = [...sortedData].sort((a, b) => {
      const phoneA = parseInt(a.phone);
      const phoneB = parseInt(b.phone);

      if (newSortDirection === "inc") {
        return phoneA - phoneB;
      } else {
        return phoneB - phoneA;
      }
    });
    setSortedData(sorted);
    setPhoneShort(newSortDirection);
  };

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = data?.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
    setSortedData(filtered);
  };

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const currencyFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredCurrency = data?.filter((item) =>
      item?.currency?.toLowerCase().includes(keyword)
    );
    setSortedData(filteredCurrency);
  };

  const filteredCurrency = filterDataByUniqueCurrency(data);

  const languageFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredCountries = data.filter((country) => {
      const languages = country.languages.map((language) =>
        language.name.toLowerCase()
      );
      return languages.includes(keyword);
    });
    setSortedData(filteredCountries);
  };

  const onClear = () => {
    setSortedData(data);
  };

  const languageCounts = {};

  data.forEach((country) => {
    country.languages.forEach((language) => {
      const languageName = language.name;
      if (languageCounts[languageName]) {
        languageCounts[languageName]++;
      } else {
        languageCounts[languageName] = 1;
      }
    });
  });

  const languageCountsArray = Object.entries(languageCounts).map(
    ([languageName, count]) => ({ languageName, count })
  );

  languageCountsArray.sort((a, b) => b.count - a.count);


  const pieData = {
    labels: [
      languageCountsArray[0].languageName,
      languageCountsArray[1].languageName,
      languageCountsArray[2].languageName,
      languageCountsArray[3].languageName,
      languageCountsArray[4].languageName,
      languageCountsArray[5].languageName,
    ],
    datasets: [
      {
        label: "Languages",
        data: [
          languageCountsArray[0].count,
          languageCountsArray[1].count,
          languageCountsArray[2].count,
          languageCountsArray[3].count,
          languageCountsArray[4].count,
          languageCountsArray[5].count,
        ],
        backgroundColor: [
          "#2AAA8A",
          "#90EE90",
          "#7CB9E8",
          "#8A9A5B",
          "#C1E1C1",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "#2AAA8A",
          "#90EE90",
          "#7CB9E8",
          "#8A9A5B",
          "#C1E1C1",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="md:flex items-center justify-between ">
        <h1 className="text-[36px] font-bold py-3 " data-testid="cypress-title">Country List</h1>
      </div>

      <div className="md:flex sm:flex-none items-center justify-start">
        <div className="flex items-center">
          <h1 className="text-[20px] font-medium py-4 pr-4">Country : </h1>
          <select
            onChange={handleFilter}
            className="border py-[2px] border-black w-[150px] md:w-[170px] lg:w-[250px] sm:h-[25px] md:h-[45px] rounded-lg px-3 "
          >
            {data?.map((value) => {
              return <option value={value.name}>{value.name}</option>;
            })}
          </select>
        </div>

        <div className="flex items-center">
          <h1 className="text-[20px] font-medium py-4 sm:px-0 md:px-4">
            Currency :
          </h1>
          <select
            onChange={currencyFilter}
            className="border py-[2px] border-black w-[150px] md:w-[170px] lg:w-[250px] sm:h-[25px] md:h-[45px] rounded-lg md:px-3 mx-3 "
          >
            {filteredCurrency?.map((value) => {
              return (
                <option className="h-[50%]" value={value.currency}>
                  {value.currency}
                </option>
              );
            })}
          </select>
        </div>

        <div className="items-center flex">
          <h1 className="text-[20px] font-medium py-4 md:px-4">Language : </h1>
          <select
            onChange={languageFilter}
            className="border border-black w-[150px] md:w-[170px] lg:w-[250px] sm:h-[25px] md:h-[45px] rounded-lg px-3 py-1 "
          >
            {data?.map((value) => {
              return value?.languages?.map((item) => {
                return (
                  <option className="h-[50%]" value={item.name}>
                    {item.name}
                  </option>
                );
              });
            })}
          </select>
        </div>

        <button
          type="button"
          onClick={onClear}
          class="text-white bg-orange-500 font-medium rounded-lg text-sm px-8 py-3 md:ml-8 "
        >
          CLEAR
        </button>
      </div>

      <div>
        <div className=" overflow-x-auto shadow-md sm:rounded-lg my-[2rem] w-full h-[65vh]">
          <table className="w-full relative text-sm text-left text-gray-500 dark:text-gray-400 md:px-4 ">
            <thead className="text-xs  text-gray-700  bg-[#fbbea6] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className=" py-3 text-center whitespace-nowrap "
                >
                  SERIAL NUMBER
                </th>

                <th
                  scope="col"
                  className=" py-3   whitespace-nowrap text-center cursor-pointer"
                  onClick={handleSort}
                >
                  <div className="flex items-center justify-center">
                    <h1>COUNTRY NAME</h1>
                    {sortDirection === "asc" ? (
                      <AiOutlineArrowUp className="w-[20px] h-[20px] mx-4" />
                    ) : (
                      <AiOutlineArrowDown className="w-[20px] h-[20px] mx-4" />
                    )}
                  </div>
                </th>

                <th
                  scope="col"
                  className=" py-3 whitespace-nowrap text-center "
                >
                  COUNTRY CODE
                </th>

                <th
                  scope="col"
                  className=" py-3 whitespace-nowrap text-center "
                  onClick={phoneSort}
                >
                  <div className="flex items-center justify-center px-8 cursor-pointer">
                    <h1>PHONE</h1>
                    {phoneShort === "inc" ? (
                      <AiOutlineArrowUp className="w-[20px] h-[20px] mx-4" />
                    ) : (
                      <AiOutlineArrowDown className="w-[20px] h-[20px] mx-4" />
                    )}
                  </div>
                </th>

                <th scope="col" className=" whitespace-nowrap text-center">
                  CAPITAL
                </th>
                <th scope="col" className="  whitespace-nowrap text-center">
                  CURRENCY
                </th>
                <th
                  onClick={handleSort}
                  scope="col"
                  className="  whitespace-nowrap pl-3"
                >
                  LANGUAGES
                </th>
              </tr>
            </thead>
            <tbody className=" w-full">
              {sortedData?.map((item, index) => (
                <>
                  <tr
                    onClick={() => handleRowClick(item)}
                    className="bg-white border-b cursor-pointer"
                    key={index}
                  >
                    <th
                      scope="row"
                      className={` text-center  py-4 font-medium  whitespace-nowrap dark:text-white`}
                    >
                      {index + 1}
                    </th>
                    <td
                      className={` py-4 text-center font-bold text-[black] whitespace-nowrap `}
                    >
                      {item?.name}
                    </td>
                    <th
                      scope="row"
                      className={` text-center text-[black]  py-4   whitespace-nowrap `}
                    >
                      {item?.code}
                    </th>
                    <td
                      className={` py-4 text-center font-bold text-[black] whitespace-nowrap `}
                    >
                      {item?.phone}
                    </td>

                    <th
                      scope="row"
                      className={`truncate text-center w-10 text-[black] px-6  py-4 font-medium  whitespace-nowrap dark:text-white`}
                    >
                      {item?.capital}
                    </th>
                    <th
                      scope="row"
                      className={`truncate text-center  text-[black]   py-4 font-medium  whitespace-nowrap dark:text-white`}
                    >
                      {item?.currency}
                    </th>

                    <th
                      scope="row"
                      className={`truncate   text-[black] px-6  py-4 font-medium  whitespace-nowrap dark:text-white`}
                    >
                      {item?.languages?.map((lang, index) => (
                        <h1 className="whitespace-nowrap">
                          {index + 1}. {lang?.name}
                        </h1>
                      ))}
                    </th>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <Modals
          onCloseModal={closeModal}
          capital={selectedRowData?.capital}
          language={selectedRowData?.languages}
          contryName={selectedRowData?.name}
          currency={selectedRowData?.currency}
        />
      )}

      <h1 className=" text-[18px] md:text-[36px] font-bold py-8">
        Pie graph based on Languages
      </h1>

      <div className="flex justify-start">
        <div className="bg-white w-full  md:w-[40%] h-[40%] p-4 flex justify-center">
          <PieChart data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default TableList;
