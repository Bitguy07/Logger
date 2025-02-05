import React from 'react';
import No_Results from '../../assets/No_Results.svg';
import Header from './Header';
import TaskBar from './TaskBar';

const SearchPage = () => {
  return (
    <>
    <div className="h-full w-full pb-10 relative flex flex-col rounded-md">
      {/* Header section */}
      <Header
        title = {{ type : "input", Title: "Logger" }} 
        buttons={
          <>
            <button className="text-[#C6ECCF] p-2 w-10 h-10 ring-1 ring-[#C6ECCF] rounded-full hover:bg-[#4a8a8e]">
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </>
        }
      />

      {/* Body Section */}
      <div className="flex-1 overflow-y-scroll scrollable-element">
        {false ? (
          <></>
        ) : (
          <div className="flex items-center justify-center h-full text-center w-full text-[#266E73] font-medium text-sm">
            <div className="m-12">
              <img src={No_Results} alt="" />
              <p>No Customer yet!</p>
              <p className="text-sm font-normal ml-2">
                Nothing to search here...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    <TaskBar />
</>
  );
};

export default SearchPage;
