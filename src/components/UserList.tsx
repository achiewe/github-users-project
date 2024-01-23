import { useEffect, useState } from "react";
import GithubUser from "../../types";

// Define the props interface for the UserList component
interface UserListProps {
  inputValue: string;
}

// UserList component definition
const UserList = ({ inputValue }: UserListProps): JSX.Element => {
  // State to store fetched GitHub users and handle errors
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [, setError] = useState<string | null>(null);

  // Effect hook to fetch GitHub users based on the input value
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputValue.trim() !== "") {
          const token = import.meta.env.VITE_REACT_APP_GITHUB_TOKEN || "";

          const apiUrl = `https://api.github.com/search/users?q=${inputValue}`;
          const response = await fetch(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            const data = await response.json();
            setUsers(data.items);
          } else {
            setError(`Error fetching data: ${response.status}`);
            const errorText = await response.text();
            console.error("Response text:", errorText);
            if (
              response.status === 403 &&
              errorText.includes("API rate limit exceeded")
            ) {
              setTimeout(() => {
                fetchData();
              }, 60 * 60 * 1000); // Retry after 1 hour
            }
          }
        } else {
          setUsers([]);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(`Error fetching data: ${error.message}`);
      }
    };
    fetchData();
  }, [inputValue]);

  // function to handle user clicks, opening github profile in a new tab
  const handleUserClick = (username: string) => {
    window.open(`https://github.com/${username}`, "_blank");
  };

  // jsx structure for rendering the user list
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
              className="w-[50px] h-[50px] rounded-[30px] md:w-[60px] md:h-[60px]"
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
