import React, { useEffect, useState } from 'react';


function App() {
  const [users, setUsers] = useState([]);
  const [mfaFilter, setMfaFilter] = useState("All");

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/users")
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data));
  // }, []);
  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:8080/api/users?timestamp=${Date.now()}`)
        .then((res) => res.json())
        .then((data) => setUsers(data));
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 1000); // every 1s

    return () => clearInterval(interval);
  }, []);


  const computeDays = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return Math.floor((now - date) / (1000 * 60 * 60 * 24));
  };

  const filteredUsers = users.filter((u) => {
    if (mfaFilter === "Yes") return u.mfaEnabled === "Yes" || u.mfaEnabled === true;
    if (mfaFilter === "No") return u.mfaEnabled === "No" || u.mfaEnabled === false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Metadata Table</h2>

      {/* MFA Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="mfaFilter" className="text-sm font-medium mr-2">
          Filter by MFA:
        </label>
        <select
          id="mfaFilter"
          className="border rounded px-2 py-1 text-sm"
          value={mfaFilter}
          onChange={(e) => setMfaFilter(e.target.value)}
        >

          <option>All</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <table className="min-w-full text-sm border border-gray-300 shadow-md border-separate border-spacing-y-1">
        <thead className="bg-gray-100">
          <tr>
            {[
              "Name",
              "Created At",
              "Password Changed",
              "Days Since Password Change",
              "Last Access",
              "Days Since Last Access",
              "MFA Enabled",
            ].map((header) => (
              <th key={header} className="px-4 py-2 border">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, i) => {
            const pwdDays = computeDays(u.passwordChanged);
            const accessDays = computeDays(u.lastAccess);

            let textColor = "text-black";
            if (pwdDays > 365 && accessDays > 90) textColor = "text-[#e11d48]";
            else if (pwdDays > 365) textColor = "text-[#ca8a04]";
            else if (accessDays > 90) textColor = "text-[#2563eb]";

            return (
              <tr key={i}>
                <td className={`${textColor} px-4 py-2 border`}>{u.name}</td>
                <td className="px-4 py-2 border">{u.createdAt}</td>
                <td className="px-4 py-2 border">{u.passwordChanged}</td>
                <td className="px-4 py-2 border">{pwdDays}</td>
                <td className="px-4 py-2 border">{u.lastAccess}</td>
                <td className="px-4 py-2 border">{accessDays}</td>
                <td className="px-4 py-2 border">{u.mfaEnabled ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Legend */}
      <div className="mt-6 text-sm">
        <p className="font-semibold mb-2">Legend:</p>
        <p>🔴 Both password and access are stale</p>
        <p>🟡 Password stale only</p>
        <p>🔵 Access stale only</p>
      </div>

      {/* Tailwind JIT hint */}
      <div className="hidden">
        text-[#e11d48] text-[#ca8a04] text-[#2563eb] text-black
      </div>
    </div>
  );
}

export default App;
