import { useSearchParams } from "react-router-dom";

export default function useUrl(param, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams();

  const getUrl = () => searchParams.get(param) || defaultValue;

  function updateUrl(value) {
    // console.log(param)
    if (searchParams.get("page")) searchParams.set("page", 1);
    searchParams.set(param, value);
    setSearchParams(searchParams);
  }

  return { getUrl, updateUrl };
}
