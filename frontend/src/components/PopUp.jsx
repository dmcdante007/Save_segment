import { useState } from "react";
import axios from "axios";

const availableOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function Popup({ onClose }) {
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchemaValue, setNewSchemaValue] = useState("");
  const [segmentName, setSegmentName] = useState("");

  //Function to add a new
  const addNewSchema = () => {
    const newSchema = availableOptions.find(
      (opt) => opt.value === newSchemaValue
    );
    if (newSchema) {
      setSelectedSchemas([...selectedSchemas, newSchema]);
      setNewSchemaValue("");
    }
  };

  //Function to handle change
  const handleSchemaChange = (index, newSchema) => {
    const updatedSchemas = [...selectedSchemas];
    updatedSchemas[index] = newSchema;
    setSelectedSchemas(updatedSchemas);
  };

  // Function to handle remove task
  const handleRemoveSchema = (index) => {
    const updatedSchemas = [...selectedSchemas];
    updatedSchemas.splice(index, 1);
    setSelectedSchemas(updatedSchemas);
  };

  //Filter out the selected items to display only unselected options
  const getFilteredOptions = () => {
    return availableOptions.filter(
      (option) =>
        !selectedSchemas.some((selected) => selected.value === option.value)
    );
  };

  //Sends out the data to the API
  const handleSaveSegment = async () => {
    const dataToSubmit = {
      key: Math.random(),
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        schema: schema.label,
      })),
    };

    console.log(dataToSubmit);
    try {
      // Sending data to the server
      const response = await axios.post(
        "http://localhost:5000/api/send-data",
        { data: dataToSubmit },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //Handle the response
      if (response) {
        console.log("Data sent to API successfully");
      }
    } catch (error) {
      console.error("Error saving the segment:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      {/*================================= Heading========================  */}
      <div className="w-[50vh]">
        <div className="flex bg-custom-blue flex-wrap text-center h-[8vh]">
          <button
            className="text-white text-2xl text-bold hover:text-gray-800 pl-2"
            onClick={onClose}
          >
            {"<"}
          </button>
          <div className="p-5">
            <h2 className="text-xl font-medium text-white">Saving Segment</h2>
          </div>
        </div>

        {/* ==================Content to be added=================  */}
        <div className="w-[50vh] h-full bg-white p-6 shadow-lg">
          <div>
            <h2 className="text-md font-semibold mb-4">
              Enter the Name of the Segment
            </h2>

            <input
              type="text"
              className="w-full h-10 p-2 mb-4 border-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />

            <p className="text-md font-semibold mb-4">
              To save your segment, you need to add the schemas to built the
              query
            </p>

            <div className="flex justify-end items-center text-sm mb-4">
              <p className="flex items-center mr-2 gap-1">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="10"
                    width="10"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#10f000"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                    />
                  </svg>
                </span>
                - User Task
              </p>

              <p className="flex items-center gap-1">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="10"
                    width="10"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#ff0000"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                    />
                  </svg>
                </span>
                - Group Task
              </p>
            </div>
          </div>

          {/* =======================Blue box================================== */}

          <div className="bg-blue-50 p-4 rounded mb-4">
            {selectedSchemas.map((schema, index) => (
              <div key={index} className="flex items-center mb-2">
                <select
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={schema.value}
                  onChange={(e) =>
                    handleSchemaChange(
                      index,
                      availableOptions
                        .concat(schema)
                        .find((opt) => opt.value === e.target.value)
                    )
                  }
                >
                  <option value="" disabled>
                    Select schema
                  </option>
                  {availableOptions.concat(schema).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Remove Button */}
                <button
                  className="ml-2 p-2 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveSchema(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div>
            <select
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={newSchemaValue}
              onChange={(e) => setNewSchemaValue(e.target.value)}
            >
              <option value="">Add schema to segment</option>
              {getFilteredOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/*Add New Schema Button */}
            <button
              className="text-teal-600 hover:underline mb-4"
              onClick={addNewSchema}
              disabled={!newSchemaValue}
            >
              + Add new schema
            </button>
          </div>

          {/* ================Submit button and close button ======================== */}
          <div className="bg-gray-300 w-[50vh] py-3 px-4 flex justify gap-2 absolute bottom-0  right-0">
            <button
              className="px-4 py-2 text-white bg-teal-600 rounded hover:bg-teal-700"
              onClick={handleSaveSegment}
            >
              Save the Segment
            </button>
            <button
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
