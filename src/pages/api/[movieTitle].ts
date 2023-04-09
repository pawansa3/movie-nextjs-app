import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  movieTitle?: string,
  error?: string
}

export default async function fetchMovieAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const movieTitle = req.query.movieTitle as string

    const response = await axios.get(
      `${process.env.APIURL}/?s=${movieTitle}`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.APIKEY,
          "X-RapidAPI-Host": process.env.APIHOST
        },
      }
    )
    const searchResult = response.data.Search || []
    res.status(200).json(searchResult)

  } catch (error) {
    res.status(500).json({ error: "Error occurred while fetching movie data." })
  }
}
