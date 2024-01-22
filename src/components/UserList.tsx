import { useEffect, useState } from "react";
import GithubUser from "../../types";

interface UserListProps {
  inputValue: string;
}

// function userList
const UserList = ({ inputValue }: UserListProps): JSX.Element => {
  const [users, setUsers] = useState<GithubUser[]>([]);

  //asda
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputValue.trim() !== "") {
          const cachedData = localStorage.getItem(inputValue);

          if (cachedData) {
            // Use cached data if available
            setUsers(JSON.parse(cachedData));
          } else {
            const token = process.env.REACT_APP_GITHUB_TOKEN;
            const apiUrl = `https://api.github.com/search/users?q=${inputValue}`;

            const response = await fetch(apiUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.status === 200) {
              const data = await response.json();
              setUsers(data.items);

              // Cache the data for future use (adjust the expiration time as needed)
              localStorage.setItem(inputValue, JSON.stringify(data.items));
            } else {
              console.error("Error fetching data:", response.status);
              const errorText = await response.text();
              console.error("Response text:", errorText);
            }
          }
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [inputValue]);

  const handleUserClick = (username: string) => {
    window.open(`https://github.com/${username}`, "_blank");
  };

  return (
    <div
      className={`${
        inputValue.length > 0 ? "flex" : "hidden"
      } flex-col py-[25px] w-full shadow-lg mb-[79px] max-w-[500px] md:max-w-[500px] md:mb-[236px] md:pt-[40px] md:pb-[40px] md:gap-[20px] lg:pb-[48px] lg:pt-[44px] lg:max-w-[730px] bg-[#FEFEFE] gap-[24px]`}
    >
      {users?.map((user) => (
        <li
          key={user.id}
          onClick={() => handleUserClick(user.login)}
          className="flex flex-col items-start gap-[10px] hover:bg-[#d8d8d8] cursor-pointer pt-[10px]"
        >
          <div className="flex flex-row items-center gap-[20px] md:gap-[40px] px-[25px] md:px-[40px] lg:px-[50px]">
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-[50px] h-[50px] rounded-[30px]"
            />
            <h1 className="font-bold text-[16px] md:text-[26px] text-[#2B3442] leading-[23.7px] [word-spacing:-5px]">
              {user.login}
            </h1>
          </div>
          <hr className="w-full" />
        </li>
      ))}
    </div>
  );
};

export default UserList;
