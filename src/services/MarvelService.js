import useHttp from "../hooks";

const useMarvelService = () => {
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=d3703dc8816c5b16d676eb3034770828'; //28
  const _offset = 210;
  const _limit = 9;

  const {loading, request, error, clearError} = useHttp();

  const getAllCharacters = async (offset = _offset, limit = _limit) => {
    const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getCharacterFindForName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    if (res.data.results.length === 0) return 'notFound';
    return _transformCharacter(res.data.results[0]);
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
      select: false,
    }
  }

  const getAllComics = async (offset = 250, limit = _limit) => {
    const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  }

  const _transformComics = (comic) => {

    return {
      id: comic.id,
      title: comic.title,
      prices: comic.prices[0]['price'] ? `${comic.prices[0].price}$` : 'not available',
      description: comic.description || 'There is no description',
      pageCount: comic.pageCount ? `${comic.pageCount} pages` : 'There is no description',
      thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
      language: comic.textObjects.language ? comic.textObjects[0].language : 'en-Us',
      select: false,
    }
  }

  return {loading,
    error,
    getCharacter,
    getAllCharacters,
    clearError,
    getAllComics,
    getComic,
    getCharacterFindForName
  };
}

export default useMarvelService;
