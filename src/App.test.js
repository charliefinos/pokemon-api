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

  it("shows an error message when there's a network error", async () => {
    //Mock
    window.fetch.mockRejectedValueOnce(
      new TypeError("Network connection lost")
    );

    // Render
    render(<App />)

    // Expect api to be called which an how many times
    expect(window.fetch).toHaveBeenLastCalledWith(
      'https://pokeapi.co/api/v2/pokemon'
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // Check if the error appears
    expect(
      await screen.findByText(
        "There was a network error. Please try again in a few seconds."
      )
    ).toBeInTheDocument();
  });

  it("shows an error message when there's a server error", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    render(<App />);

    expect(window.fetch).toHaveBeenLastCalledWith(
      "https://pokeapi.co/api/v2/pokemon"
    )

    expect(window.fetch).toHaveBeenCalledTimes(1);

    expect(
      await screen.findByText("There was a server error.")
    ).toBeInTheDocument();

  });

  it("shows an error message when there's a service not found", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<App />)

    expect(window.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon"
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);

    expect(
      await screen.findByText("The requested resource was a not found.")
    ).toBeInTheDocument();
  })


});