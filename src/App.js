import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(undefined);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get("https://api.publicapis.org/categories")
        .then((res) => {
          return res.data;
        });
      setData(res);
    };

    if (!data) {
      fetchData();
    }
  }, [data]);

  const handleOnChangeFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
  };
  return (
    <div className="App">
      <div className="text-filter">
        <input
          value={filter}
          onChange={handleOnChangeFilter}
          placeholder="Search"
        />
      </div>
      <div className="container-list">
        {data &&
          data.categories
            .filter((item) => item.toLowerCase().includes(filter) == 1)
            .map((item, index) => (
              <div key={index + item} className="list-item">
                {item}
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
