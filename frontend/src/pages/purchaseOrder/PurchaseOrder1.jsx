
import React, { useState, useEffect } from "react";

const data = [
  {
    id: "1",
    name: "Jane",
    lastName: "Doe",
    age: "25"
  },
  {
    id: "2",
    name: "James",
    lastName: "Doe",
    age: "40"
  },
  {
    id: "3",
    name: "Alexa",
    lastName: "Doe",
    age: "27"
  },
  {
    id: "4",
    name: "Jane",
    lastName: "Brown",
    age: "40"
  }
];

export default function PurchaseOrder1() {
  const [peopleInfo] = useState(
    data.map((d) => {
      return {
        select: false,
        id: d.id,
        name: d.name,
        lastName: d.lastName,
        age: d.age
      };
    })
  );

  const [peopleInfoValue, setPeopleInfoValue] = useState(
    localStorage.getItem("selectedPeople") == null
      ? ""
      : JSON.parse(localStorage.getItem("selectedPeople"))
  );

  useEffect(() => {
    localStorage.setItem("selectedPeople", JSON.stringify(peopleInfoValue));
  }, [peopleInfoValue]);

  return (
    <div className="App">
      <table>
        <tr>
          {peopleInfo?.map((d) => {
            return (
              <div
                key={d.id}
                style={{
                  display: "flex",
                  width: "150px"
                }}
              >
                <input
                  style={{ margin: "20px" }}
                  onChange={(e) => {
                    // add to list
                    let checked = e.target.checked;
                    if (checked) {
                      setPeopleInfoValue([
                        ...peopleInfoValue,
                        {
                          select: true,
                          id: d.id,
                          name: d.name,
                          lastName: d.lastName,
                          age: d.age
                        }
                      ]);
                    } else {
                      // to remove from localstorage
                      setPeopleInfoValue(
                        peopleInfoValue.filter((people) => people.id !== d.id)
                      );
                    }
                  }}
                  // checked={d.select}
                  type="checkbox"
                />
                <td style={{ margin: "20px" }}>{d.name}</td>
                <td style={{ margin: "20px" }}>{d.lastName}</td>
                <td style={{ margin: "20px" }}>{d.age}</td>
              </div>
            );
          })}
        </tr>
      </table>
    </div>
  );
}
