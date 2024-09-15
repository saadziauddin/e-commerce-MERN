import React, { useCallback, useEffect, useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import api from '../Api/api.js';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPhone } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce';

function Recordings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
  const closeSidebar = () => { setIsSidebarOpen(false); };
  const [recordingsData, setRecordingsData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [callingNo, setCallingNo] = useState('');
  const [inum, setInum] = useState('');
  const [dialedNo, setdialedNo] = useState('');
  const [callType, setCallType] = useState('');
  // const [date, setDate] = useState('');

  useEffect(() => {
    const recordingsData = async () => {
      try {
        const result = await api.get('/GetRecordingsData');
        setRecordingsData(result.data.recordingsData);
      } catch (error) {
        console.log("Error fetching recordings: ", error);
      }
    };
    recordingsData();
  },[]);
  
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };
  const handleGlobalSearchChange = (event) => {
    setSearchInput(event.target.value);
    debouncedSearch(event.target.value);
  };
  const debouncedSearch = useCallback(
    debounce((input) => {
      if(input.trim() === ''){
        setRecordingsData(recordingsData)
      }
      else{
        performSearch({ globalSearch: input });
      }
    }, 500),
    [recordingsData]
  );
  const performSearch = async (searchParams) => {
    try{
      const searchInput = new URLSearchParams(searchParams).toString();
      const result = await api.get(`/Reports/Search?${searchInput}`);
      setRecordingsData(result.data.recordingsData);
    }
    catch (error){
      console.log("Error searching recordings: ", error);
    }
  };
  const handleSearchClick = () => {
    performSearch({ callingNo, dialedNo, inum, callType });
  };

return (
  <div className="absolute top-0 left-0 w-full h-full">
    
    {/* Sidebar */}
    <div className={`fixed z-50 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out xl:translate-x-0`}>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </div>

    {/* Main */}
    <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200 bg-light">     
      {/* Topbar */}
      <Topbar toggleSidebar={toggleSidebar} />

      {/* Table */}
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex-none w-full max-w-full px-3">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <h6 className="text-xl font-semibold mb-5">Recordings Table</h6>
            </div>

            {/* Search Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-10 mb-8">

              {/* Calling No. */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Calling No.</label>
                <div className="relative flex items-stretch transition-all rounded-md ease-soft">
                  <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-md rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-gray-700 transition-all">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <input type="text" value={callingNo} onChange={handleInputChange(setCallingNo)} className="pl-8 text-sm focus:shadow-soft-primary-outline ease-soft leading-5.6 block flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Search with calling no..." style={{ width: '200px' }} />
                </div>
              </div>
              
              {/* Inum */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Inum</label>
                <div className="pl-8.75 relative flex items-stretch transition-all rounded-md ease-soft">
                  <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-md rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-gray-700 transition-all">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <input type="text" value={inum} onChange={handleInputChange(setInum)} className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft leading-5.6 block flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Search with calling no..." style={{ width: '200px' }} />
                </div>
              </div>

              {/* Start Date */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <div className="relative flex items-stretch transition-all rounded-md ease-soft">
                  <input type="date" className="pl-3 text-sm focus:shadow-soft-primary-outline ease-soft leading-5.6 block flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" style={{ width: '200px' }} />
                </div>
              </div>

              {/* Call Type */}
              <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Call Type</label>
                  <div className="pl-3.5 relative flex items-stretch transition-all rounded-md ease-soft">
                    <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-md rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-gray-700 transition-all">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <select value={callType} onChange={handleInputChange(setCallType)} className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft leading-5.6 block flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" style={{ width: '200px' }}>
                      <option className="text-gray-500" value="">Select call type...</option>
                      <option value="incoming">Incoming</option>
                      <option value="outgoing">Outgoing</option>
                    </select>
                  </div>
              </div>

              {/* Dialed No. */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Dialed No.</label>
                <div className="relative flex items-stretch transition-all rounded-md ease-soft">
                  <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-md rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-gray-700 transition-all">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <input type="text" value={dialedNo} onChange={handleInputChange(setdialedNo)} className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft leading-5.6 block flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Search with calling no..." style={{ width: '200px' }} />
                </div>
              </div>

              {/* End Date */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">End Date</label>
                <div className="pl-2 relative flex items-stretch transition-all rounded-md ease-soft">
                  <input type="date" className="pl-3 text-sm focus:shadow-soft-primary-outline ease-soft leading-5.6 block flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" style={{ width: '200px' }} />
                </div>
              </div>

            </div>

            <div className="flex items-center justify-end space-x-2 px-10 mb-8">
              {/* Global Search Box */}
              <div className="relative flex flex-wrap items-stretch w-1/6 transition-all rounded-md ease-soft">
                <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-md rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-gray-700 transition-all">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input type="text" value={searchInput} onChange={handleGlobalSearchChange} className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-32 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-1.5 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Search anything..." />
              </div>

              {/* Buttons */}
              <button onClick={handleSearchClick} className="bg-gradient-to-b from-blue-600 to-blue-700 text-white border border-transparent px-2 py-1 rounded-md text-sm shadow-md transition-all duration-300 hover:bg-gradient-to-t hover:from-blue-700 hover:to-blue-800 focus:outline-none">Search</button>              
              <button className="bg-gradient-to-b from-yellow-600 to-yellow-700 text-white border border-transparent px-2 py-1 rounded-md text-sm shadow-md transition-all duration-300 hover:bg-gradient-to-t hover:from-yellow-700 hover:to-yellow-800 focus:outline-none">Print</button>
              <button className="bg-gradient-to-b from-green-600 to-green-700 text-white border border-transparent px-2 py-1 rounded-md text-sm shadow-md transition-all duration-300 hover:bg-gradient-to-t hover:from-green-700 hover:to-green-800 focus:outline-none">Export to Excel</button>
              <button className="bg-gradient-to-b from-red-600 to-red-700 text-white border border-transparent px-2 py-1 rounded-md text-sm shadow-md transition-all duration-300 hover:bg-gradient-to-t hover:from-red-700 hover:to-red-800 focus:outline-none">Download PDF</button>

            </div>

            {/* Table */}
            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto">
                <DataTable
                  columns = {[
                    { name: 'Day', selector: row => row._startDayName, sortable: true, wrap: true, center: true },
                    { name: 'Date', selector: row => row._startDate, sortable: true, wrap: true, center: true },
                    { name: 'Calling Party', selector: row => row.core_callingparty, sortable: true, wrap: true, center: true },
                    { name: 'Called party', selector: row => row.core_calledparty, sortable: true, wrap: true, center: true },
                    { name: 'Agent Name', selector: row => row.agentname, sortable: true, wrap: true },
                    { name: 'Global Call ID', selector: row => row.core_globalcallid, sortable: true, wrap: true },
                    { name: 'Incoming/Outgoing', selector: row => row.isInComing, sortable: true, wrap: true, center: true },
                  ]}
                  customStyles = {{
                    headCells: {
                      style: {
                        fontWeight: 'bold',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        backgroundColor: '#e8e8e8',
                      },
                    },
                    rows: {
                      style: {
                        minHeight: '50px',
                        '&:not(:last-of-type)': {
                          borderBottomStyle: 'solid',
                          borderBottomWidth: '1px',
                          borderBottomColor: '#d1d1d1',
                        },
                        '&:hover': {
                          backgroundColor: '#f1f1f1',
                        },
                      },
                    },
                    pagination: {
                      style: {
                        borderTopStyle: 'solid',
                        borderTopWidth: '1px',
                        borderTopColor: '#d1d1d1',
                      },
                    },
                  }}
                  data={recordingsData}
                  pagination
                  fixedHeader
                  paginationPerPage={50}
                  paginationRowsPerPageOptions={[50, 100, 300, 500, 1000]}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
);
};

export default Recordings;
