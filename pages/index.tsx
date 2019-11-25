import * as React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";
import axios from "axios";

interface Hit {
  id: number;
  artistName: string;
  songTitle: string;
}

const Hit: React.FC<Hit> = ({ artistName, songTitle }) => {
  return (
    <li>
      <p>{artistName}</p>
      <p>{songTitle}</p>
    </li>
  );
};

const HitList: React.FC<{ hits: Hit[] }> = ({ hits }) => {
  return (
    <React.Fragment>
      {hits.map(hit => (
        <Hit {...hit} key={hit.id} />
      ))}
    </React.Fragment>
  );
};

const Index: NextPage<{ hits: Hit[] }> = ({ hits }) => {

  const [query, setQuery] = React.useState('')
  const [fetchedHits, setFetchedHits]  = React.useState(hits)

  const handleClick = React.useCallback( async (q: string) => {
    const {
      data: { response }
    } = await axios.get("https://genius.p.rapidapi.com/search?q=queen", {
      headers: {
        "X-RapidAPI-Host": "genius.p.rapidapi.com",
        "X-RapidAPI-Key": "4138f1021fmsh75636ffd9147d90p17d1a5jsn8b3645b2de09"
      }
    });
  
    const hits = response.hits
      .filter(({ index }) => index === "song")
      .map(({ result }) => ({
        id: result.id,
        artistName: result.primary_artist.name,
        songTitle: result.title
      }));
      setFetchedHits(hits)
  }, [setQuery])

  return (
    <Layout>
      <h1>Lyrics App</h1>
      <label htmlFor="search">Search for artist</label>
      <input onChange={e => setQuery(e.currentTarget.value)} name="search" type="text" />
      <button onClick={() => handleClick(query)}>Search</button>
      <HitList hits={fetchedHits} />
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const {
    data: { response }
  } = await axios.get("https://genius.p.rapidapi.com/search?q=queen", {
    headers: {
      "X-RapidAPI-Host": "genius.p.rapidapi.com",
      "X-RapidAPI-Key": "4138f1021fmsh75636ffd9147d90p17d1a5jsn8b3645b2de09"
    }
  });

  const hits = response.hits
    .filter(({ index }) => index === "song")
    .map(({ result }) => ({
      id: result.id,
      artistName: result.primary_artist.name,
      songTitle: result.title
    }));

  return {
    hits
  };
};

export default Index;
