import { useState } from "react";

const DELIVERY_PRICE = 6;
const LUNCH_PRICE = 12;
const FAMILY_PRICE = 10;

export default function App() {
  const [rows, setRows] = useState([
    { name: "", delivery: 0, lunch: 0, family: 0 }
  ]);

  // Update name field
  const updateName = (index, value) => {
    const newRows = [...rows];
    newRows[index].name = value;
    setRows(newRows);
  };

  // Increment item
  const increment = (index, field) => {
    const newRows = [...rows];
    newRows[index][field] += 1;
    setRows(newRows);
  };

  // Decrement item (no negatives)
  const decrement = (index, field) => {
    const newRows = [...rows];
    if (newRows[index][field] > 0) {
      newRows[index][field] -= 1;
      setRows(newRows);
    }
  };

  // Add new person row
  const addRow = () => {
    setRows([
      ...rows,
      { name: "", delivery: 0, lunch: 0, family: 0 }
    ]);
  };

  // Calculate total for a row
  const calculateRowTotal = (row) => {
    return (
      row.delivery * DELIVERY_PRICE +
      row.lunch * LUNCH_PRICE +
      row.family * FAMILY_PRICE
    );
  };

  // Calculate grand total
  const grandTotal = rows.reduce(
    (sum, row) => sum + calculateRowTotal(row),
    0
  );

  // Export CSV
  const exportToCSV = () => {
    const headers = [
      "Name",
      "Delivery (6)",
      "Lunch (12)",
      "Family (10)",
      "Row Total"
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
          rowTotal
        ].join(",")
      );
    });

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "meal-orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Counter component
  const Counter = ({ value, onIncrement, onDecrement }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button onClick={onDecrement}>−</button>
      <span style={{ minWidth: 20, textAlign: "center" }}>
        {value}
      </span>
      <button onClick={onIncrement}>+</button>
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Meal Order Calculator</h2>

      <table border="1" cellPadding="8">
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
                <Counter
                  value={row.delivery}
                  onIncrement={() =>
                    increment(index, "delivery")
                  }
                  onDecrement={() =>
                    decrement(index, "delivery")
                  }
                />
              </td>

              <td>
                <Counter
                  value={row.lunch}
                  onIncrement={() =>
                    increment(index, "lunch")
                  }
                  onDecrement={() =>
                    decrement(index, "lunch")
                  }
                />
              </td>

              <td>
                <Counter
                  value={row.family}
                  onIncrement={() =>
                    increment(index, "family")
                  }
                  onDecrement={() =>
                    decrement(index, "family")
                  }
                />
              </td>

              <td>
                ${calculateRowTotal(row).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 15 }}>
        <button onClick={addRow}>➕ Add Person</button>

        <button
          onClick={exportToCSV}
          style={{ marginLeft: 10 }}
        >
          📄 Export to CSV
        </button>
      </div>

      <h3 style={{ marginTop: 20 }}>
        Grand Total: ${grandTotal.toFixed(2)}
      </h3>
    </div>
  );
}