import React from 'react'
import App from './App'
import { render, screen } from '@testing-library/react'
import data from './data.json'

describe("Pokémon app", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  it("shows a list of Pokémons retrieved from an API", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    });

    render(<App />);

    expect(window.fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon");
    expect(window.fetch).toHaveBeenCalledTimes(1);

    for (let pokemon of data.results) {
      expect(await screen.findByText(new RegExp(`${pokemon.name}\\b`, "i"))).toBeInTheDocument();
    }
  });

});