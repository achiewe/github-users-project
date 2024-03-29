import SearchSvg from "../../public/assets/icon-search.svg";

// define the props interface for the SearchInput component
interface SearchInputProps {
  setInputValue(inputValue: string): void;
}

const SearchInput = ({ setInputValue }: SearchInputProps): JSX.Element => {
  return (
    <form className="flex mt-[31px] flex-row items-center gap-[5px] justify-between w-full max-w-[500px] pl-[16px] pr-[7px] shadow-lg md:max-w-[500px] md:gap-0 md:mt-[60px] md:pr-[10px] md:pl-[32px] lg:max-w-[730px] bg-[#d8d8d8] py-[20px] lg:px-[60px] rounded-t-[15px] rounded-b-none">
      <img src={SearchSvg} alt="search icon" />
      <input
        onChange={(e) => {
          // set input value when the user types
          setInputValue(e.target.value);
        }}
        id="input"
        className="w-[330px] font-normal text-[13px] py-[5px] leading-[25px] pl-[10px] rounded-[10px] border-none outline-none md:text-[18px] md:w-[400px] lg:w-[500px] text-[#4B6A9B] placeholder-[#4B6A9B]"
        placeholder="Search GitHub username…"
        type="search"
      />
    </form>
  );
};

export default SearchInput;
