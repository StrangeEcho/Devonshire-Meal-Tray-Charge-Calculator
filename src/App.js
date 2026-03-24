import { useState, useEffect } from "react";
import "./App.css";

const DELIVERY_PRICE = 6;
const LUNCH_PRICE = 12;
const FAMILY_PRICE = 10;

export default function App() {
  
  useEffect(() => {
    document.title = "𝓜𝓮𝓪𝓵 𝓒𝓪𝓵𝓬𝓾𝓵𝓪𝓽𝓸𝓻";
  }, [])

  const [lastToIncrement, setLastToIncrement] = useState(""); 

  const [rows, setRows] = useState([
    { name: "", delivery: 0, lunch: 0, family: 0 }
  ]);

  const updateName = (index, value) => {
    const newRows = [...rows];
    newRows[index].name = value;
    setRows(newRows);
  };

  const increment = (index, field) => {
    const newRows = [...rows];
    newRows[index][field] += 1;
    setRows(newRows);
    
    setLastToIncrement(newRows[index]["name"])
  };

  const decrement = (index, field) => {
    const newRows = [...rows];
    if (newRows[index][field] > 0) {
      newRows[index][field] -= 1;
      setRows(newRows);
    }
  };

  const addRow = () => {
    setRows([
      ...rows,
      { name: "", delivery: 0, lunch: 0, family: 0 }
    ]);
  };

  const calculateRowTotal = (row) => {
    return (
      row.delivery * DELIVERY_PRICE +
      row.lunch * LUNCH_PRICE +
      row.family * FAMILY_PRICE
    );
  };

  const grandTotal = rows.reduce(
    (sum, row) => sum + calculateRowTotal(row),
    0
  );

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Delivery",
      "Lunch",
      "Family",
      "Charge Total"
    ];

    const csvRows = [];
    csvRows.push(headers.join(","));

    rows.forEach((row) => {
      const rowTotal = calculateRowTotal(row);
      csvRows.push(
        [
          row.name,
          row.delivery,
          row.lunch,
          row.family,
          `$${rowTotal}`
        ].join(",")
      );
    });

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv"
    });
    
    const currentDate = new Date();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `meal-orders(${currentDate.toLocaleDateString()}).csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <div className="calculator-container">
        <h2 className="page-title">Meal Order Calculator</h2>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Delivery ($6)</th>
              <th>Lunch ($12)</th>
              <th>Family ($10)</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    value={row.name}
                    onChange={(e) =>
                      updateName(index, e.target.value)
                    }
                  />
                </td>

                <td>
                  <button
                    className="counter-btn"
                    onClick={() => decrement(index, "delivery")}
                  >
                    −
                  </button>
                  <span className="counter-value">
                    {row.delivery}
                  </span>
                  <button
                    className="counter-btn"
                    onClick={() => increment(index, "delivery")}
                  >
                    +
                  </button>
                </td>

                <td>
                  <button
                    className="counter-btn"
                    onClick={() => decrement(index, "lunch")}
                  >
                    −
                  </button>
                  <span className="counter-value">
                    {row.lunch}
                  </span>
                  <button
                    className="counter-btn"
                    onClick={() => increment(index, "lunch")}
                  >
                    +
                  </button>
                </td>

                <td>
                  <button
                    className="counter-btn"
                    onClick={() => decrement(index, "family")}
                  >
                    −
                  </button>
                  <span className="counter-value">
                    {row.family}
                  </span>
                  <button
                    className="counter-btn"
                    onClick={() => increment(index, "family")}
                  >
                    +
                  </button>
                </td>

                <td>
                  ${calculateRowTotal(row).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-row">
          <button className="action-btn" onClick={addRow}>
            ➕ Add Person
          </button>

          <button
            className="action-btn"
            onClick={exportToCSV}
          >
            📄 Export to CSV
          </button>
        </div>
        
        <h3 className="grand-total">
          Grand Total: ${grandTotal.toFixed(2)}
        </h3>
      </div>
      <div>
        <p style={{textAlign: 'center'}}>ruben was here lolololol </p>
        <p style={{textAlign: 'center'}}>Last to Increment: <b>{lastToIncrement}</b></p>
      </div>
    </div>
  );
}
