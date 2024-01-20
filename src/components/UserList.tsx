import axios, { AxiosError } from "axios";
import achiewe from "../../public/assets/achieve.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Rootstate } from "../features/store";
import { setuserInfo } from "../features/UserInfoSlice";
import { debounce } from "lodash";

const UserList = (): JSX.Element => {
  const InputValue = useSelector(
    (store: Rootstate) => store.inputValue.inputValue
  );

  const dispatch = useDispatch();

  const handleRequestError = (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Response data:", error.response.data);
      console.log("Response status:", error.response.status);
      console.log("Response headers:", error.response.headers);

      if (
        error.response.status === 403 &&
        error.response.headers["retry-after"]
      ) {
        const retryAfter =
          parseInt(error.response.headers["retry-after"], 10) * 1000;
        // Wait for the specified time before retrying
        setTimeout(() => {
          delayedFetchUserInfo();
        }, retryAfter);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error setting up the request:", error.message);
    }
  };

  const fetchUserInfo = async () => {
    try {
      console.log("shevedii");
      const response = await axios.get(
        `https://api.github.com/search/users?q=${InputValue}`,
        { headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` } }
      );

      const data = response.data;
      dispatch(setuserInfo(data));
      console.log(data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        handleRequestError(error as AxiosError);
      }
    }
  }; // <-- Move this closing brace to here

  const delayedFetchUserInfo = debounce(fetchUserInfo, 500);

  useEffect(() => {
    const source = axios.CancelToken.source();

    delayedFetchUserInfo();

    return () => {
      // Cancel the request when the component unmounts or when the input changes
      source.cancel(
        "Request canceled due to component unmount or input change"
      );
    };
  }, [InputValue, delayedFetchUserInfo]);

  return (
    <div className="flex flex-col py-[25px] w-full shadow-lg mb-[79px] max-w-[500px] md:max-w-[500px] md:mb-[236px] md:pt-[40px] md:pb-[40px] md:gap-[20px] lg:pb-[48px] lg:pt-[44px] lg:max-w-[730px] bg-[#FEFEFE] gap-[24px]">
      <div className="flex flex-col items-start gap-[10px] hover:bg-[#d8d8d8] cursor-pointer pt-[10px]">
        <div className="flex flex-row items-center gap-[20px] md:gap-[40px] px-[25px] md:px-[40px] lg:px-[50px]">
          <img
            src={achiewe}
            alt="Description of the image"
            className="w-[50px] h-[50px] rounded-[30px]"
          />
          <h1 className="font-bold text-[16px] md:text-[26px] text-[#2B3442] leading-[23.7px] [word-spacing:-5px]">
            achiewe
          </h1>
        </div>
        <hr className="w-full" />
      </div>
    </div>
  );
};

export default UserList;
