/* eslint-disable react/prop-types */

import useUrl from "../hooks/useUrl";
import Select from "./Select";

function SortBy({ options }) {
  const {getUrl, updateUrl} = useUrl("sortBy", "");
  const sortBy = getUrl();

  function handleChange(e) {
    updateUrl(e.target.value);
  }

  return <Select options={options} onChange={handleChange} type="white" value={sortBy} />;
}

export default SortBy;
