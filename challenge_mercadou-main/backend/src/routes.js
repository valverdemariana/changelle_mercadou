const { Router } = require('express');
const express = require('express');
const routes = express.Router();
const axios = require('axios');

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "API Works!"});
})

routes.get("/listFilms", async (req, res) => {
  let films = [];

  // Pega a lista de todos os filmes presentes na API
  await axios.get('https://swapi.dev/api/films').then(async (response) => {
    // Passa por cada item da resposta para pegar suas informações
    for (const i of response.data.results) {
      films.push({
        nomeDoFilme: i.title,
        id: i.episode_id, 
        diretor: i.director,
        produtor: i.producer,
        url: i.url,
        created: i.created,
        personagens: i.characters
      });
    }
    return res.status(200).json(films)
  }).catch((err) => {
    console.log("Erro: " + err);
  })
});

routes.get("/listCharacters", async(req, res) => {
  const  { characters } = req.body;

  if (!characters) {
    return res.status(400).json({ message: "Você deve informar os personagens a serem listados." });
  }

  for(const i of characters) {
    // Pega a lista de todos os filmes presentes na API
    await axios.get(i).then(async (response) => {
      return res.status(200).json(response.data);
    }).catch((err) => {
      console.log("Erro: " + err);
    });
  }
});



module.exports = routes;