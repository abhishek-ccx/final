import { useState } from "react";

const Learn = () => {
  const [myList, setMyList] = useState([]);
  const addToDo = () => {
    const inputBox = document.getElementById("todoValue");
    // const temp = [...myList];
    // const activity = inputBox.value;

    const activity = inputBox.value;
    if (activity && !myList.includes(activity)) {
      setMyList([...myList, inputBox.value]);
    } else {
      alert("Duplicate value not allowed!");
    }
  };

  const deleteToDo = (item) => {
    setMyList((MyList) => {
      return MyList.filter((x) => x !== item);
    });
  };

  const downloadList = () => {
    const json = JSON.stringify(myList, null, 1);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "todo-list.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <h1>My list</h1>
      <ul>
        {myList.map((item) => {
          return (
            <li key={`${item}_key`} id={`${item}_key`}>
              {item}
              <button
                className="bg-white text-black px-1.5 m-1 rounded"
                onClick={() => deleteToDo(item)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        className="bg-slate-100 text-black px-2 py-1"
        id="todoValue"
      />
      <button className="bg-white text-black px-2 py-1 mx-1" onClick={addToDo}>
        Add list
      </button>
      <button
        className="border border-black mr-5 p-1 ml-3 mt-2"
        onClick={downloadList}
      >
        Download as JSON
      </button>
    </>
  );
};

export default Learn;
