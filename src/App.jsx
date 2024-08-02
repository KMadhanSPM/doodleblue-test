import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";

import Dropdowndata from "./data/dropdown.json";

const getUniqueValuesByKey = (data, key) => {
  return [...new Set(data.map((item) => item[key]))];
};

function App() {
  const [selectedValues, setSelectedValues] = useState({
    state: "",
    district: "",
    distributor: "",
  });

  const [options, setOptions] = useState({
    states: [],
    districts: [],
    distributors: [],
  });

  useEffect(() => {
    // Get unique states
    const uniqueStates = getUniqueValuesByKey(Dropdowndata, "state");
    setOptions((prevOptions) => ({
      ...prevOptions,
      states: uniqueStates,
    }));
  }, []);

  useEffect(() => {
    if (selectedValues.state) {
      // Filter districts based on selected state
      const filteredDistricts = Dropdowndata.filter(
        (item) => item.state === selectedValues.state
      );
      const uniqueDistricts = getUniqueValuesByKey(
        filteredDistricts,
        "district"
      );
      setOptions((prevOptions) => ({
        ...prevOptions,
        districts: uniqueDistricts,
        distributors: [], // Reset distributors when state changes
      }));
      setSelectedValues((prevValues) => ({
        ...prevValues,
        district: "", // Reset selected district
        distributor: "", // Reset selected distributor
      }));
    }
  }, [selectedValues.state]);

  useEffect(() => {
    if (selectedValues.district) {
      // Filter distributors based on selected district
      const filteredDistributors = Dropdowndata.filter(
        (item) => item.district === selectedValues.district
      );
      const uniqueDistributors = getUniqueValuesByKey(
        filteredDistributors,
        "distributor_name"
      );
      setOptions((prevOptions) => ({
        ...prevOptions,
        distributors: uniqueDistributors,
      }));
      setSelectedValues((prevValues) => ({
        ...prevValues,
        distributor: "", // Reset selected distributor
      }));
    }
  }, [selectedValues.district]);

  const handleSelectionChange = (type, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [type]: value,
    }));
  };

  return (
    <div className="mainsection">
      <h1>Select Dropdown Values</h1>
      {options.states.length > 0 && (
        <Dropdown
          data={options.states}
          selectedValue={(value) => handleSelectionChange("state", value)}
          keyName="state"
        />
      )}
      {options.districts.length > 0 && (
        <Dropdown
          data={options.districts}
          selectedValue={(value) => handleSelectionChange("district", value)}
          keyName="district"
        />
      )}
      {options.distributors.length > 0 && (
        <Dropdown
          data={options.distributors}
          selectedValue={(value) => handleSelectionChange("distributor", value)}
          keyName="distributor_name"
        />
      )}
    </div>
  );
}

export default App;
