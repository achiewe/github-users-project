import React, { useState, useEffect } from "react";
import GithubUser from "../../types";

const Ssoso = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState<GithubUser[]>([]);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetch(`https://api.github.com/search/users?q=${inputValue}`)
        .then((response) => response.json())
        .then((data) => setUsers(data.items));
    } else {
      setUsers([]);
    }
  }, [inputValue]);

  const handleUserClick = (username: any) => {
    window.open(`https://github.com/${username}`, "_blank");
  };

  return (
    <div className="App">
      <h1>Github Typeahead</h1>
      <input
        type="text"
        placeholder="Search for GitHub users"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user.login)}>
            <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
            <span>{user.login}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ssoso;
