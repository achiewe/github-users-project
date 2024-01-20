import { useEffect, useState } from "react";
import GithubUser from "../../types";

interface UserListProps {
  inputValue: string;
}

const UserList = ({ inputValue }: UserListProps): JSX.Element => {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (inputValue.trim() !== "") {
          const token = "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"; // Replace with your actual token
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
            setError(`Error: ${response.status} - ${response.statusText}`);
          }
        } else {
          setUsers([]);
        }
      } catch (error: any) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputValue]);

  const handleUserClick = (username: string) => {
    window.open(`https://github.com/${username}`, "_blank");
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users?.length > 0 && (
        <ul>
          {users.map((user) => (
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
        </ul>
      )}
    </div>
  );
};

export default UserList;
