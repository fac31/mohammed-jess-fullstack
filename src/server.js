const express = require("express")
const app = express()
const path = require("path")
const fetch = require("node-fetch")
require("dotenv").config()
const spotifyID = process.env.SPOTIFY_ID
const spotifyKey = process.env.SPOTIFY_KEY

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/index.html"))
})

app.get("/event", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/event.html"))
})

app.post("/search", (req, res) => {
  const { music, food, drinks } = req.body
  console.log("Form data:", { music, food, drinks })
  res.json({ music, food, drinks })
})

app.listen(4000, () => {
  console.log("server is running")
})

const spotify_id = spotifyID
const spotify_secret = spotifyKey

const getSpotifyToken = async () => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(spotify_id + ":" + spotify_secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  }

  try {
    const response = await fetch(authOptions.url, {
      method: "POST",
      headers: {
        Authorization: authOptions.headers.Authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(authOptions.form).toString(),
    })

    const body = await response.json()
    if (response.ok) {
      const token = body.access_token
      console.log("Token:", token)
      return token
    } else {
      console.error("Error:", body)
      return null
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

getSpotifyToken()

app.get("/get-spotify-token", async (req, res) => {
  const token = await getSpotifyToken()
  res.json({ access_token: token })
})

app.post("/get-playlists", async (req, res) => {
  const { searchWord } = req.body
  const token = await getSpotifyToken()
  const playlists = await searchPlaylists(searchWord, token)
  res.json({ playlists })
})

const searchPlaylists = async (keyword, accessToken) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        keyword
      )}&type=playlist`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )

    if (!response.ok) {
      console.error("Failed to search for playlists:", response.statusText)
      return []
    }

    const data = await response.json()
    return data.playlists ? data.playlists.items : []
  } catch (error) {
    console.error("Error searching for playlists:", error)
    return []
  }
}

app.post("/get-playlist-details", async (req, res) => {
  const { playlistID } = req.body
  const token = await getSpotifyToken()

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      console.error("Failed to fetch playlist details:", response.statusText)
      return res.status(response.status).json({ error: response.statusText })
    }

    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error("Error fetching playlist details:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})
