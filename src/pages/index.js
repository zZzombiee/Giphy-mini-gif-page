import { useEffect, useState } from "react";

const Giphy = () => {
  const [gifs, setGifs] = useState([]);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [pageNumberCount, setPageNumberCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);

  const url = `https://api.giphy.com/v1/gifs/search?api_key=23GGvgf7jN41loSUIDuONJkOIoqrl6iu&q=${search}&limit=8&offset=${pageNumber}&rating=g&lang=en&bundle=messaging_non_clips`;
  useEffect(() => {
    const getGifs = async () => {
      const response = await fetch(url);
      const { data } = await response.json();
      setGifs(data);
    };
    getGifs();
  }, [search, pageNumber]);

  const handleNextPage = () => {
    setPageNumberCount(pageNumberCount + 1);
    setPageNumber(pageNumber + 8);
  };
  const handlePrevPage = () => {
    if (pageNumber === 8) {
      return;
    }
    return (
      setPageNumber(pageNumber - 8), setPageNumberCount(pageNumberCount - 1)
    );
  };
  const handleSearchValue = (value) => {
    setPageNumberCount(1);
    setSearch(value);
  };

  return (
    <div className="container text-center mx-auto flex flex-col justify-center items-center gap-12 mt-12">
      <div className="flex gap-10">
        <input
          type="text"
          className="bg-gray-100 border w-40 border-solid rounded-lg py-1 px-2"
          placeholder="Search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>
        <button onClick={() => handleSearchValue(value)}>🔍</button>
        <button onClick={handlePrevPage}>⬅️</button>
        <p>{pageNumberCount}</p>
        <button onClick={handleNextPage}>➡️</button>
      </div>
      <div className="grid grid-cols-4">
        {gifs.map((gif, index) => (
          <div key={gif.id} className="m-5">
            <img
              src={gif.images.fixed_width.url}
              className="w-[240px] h-[120px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Giphy;
