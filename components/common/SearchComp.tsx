import { Box } from "@mui/material";
import React, { useState } from "react";
import { doSearch } from "../../APIs";
import { TextFieldCustom2, SearchList } from "../../ui";

export const SearchComp = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showList, setShowList] = useState(false);

  const handleSearch = async () => {
    try {
      const results = await doSearch(searchText);
      if (!results) {
        setShowList(false);
        return;
      }
      setSearchResults(results?.users);
      setShowList(true);
    } catch (err: any) {
      setShowList(false);
      console.error(err.message);
      return;
    }
  };

  return (
    <Box>
      <TextFieldCustom2
        onClick={() => {
          setShowList(false);
        }}
        onChange={(e) => {
          setSearchText(e.target.value);
          handleSearch();
        }}
        placeholder="Search.."
        size="small"
        fullWidth
      ></TextFieldCustom2>
      {showList && <SearchList results={searchResults} />}
    </Box>
  );
};
