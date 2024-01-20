import { useState } from "react";
import SearchInput from "./components/SearchInput";
import Ssoso from "./components/Ssoso";
import UserList from "./components/UserList";
import GithubUser from "../types";

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div className="w-full flex flex-col min-h-screen items-center bg-[#F6F8FF] px-6 md:px-0 md:h-full">
      <SearchInput setInputValue={setInputValue} />
      <UserList inputValue={inputValue} />
    </div>
  );
}

export default App;
