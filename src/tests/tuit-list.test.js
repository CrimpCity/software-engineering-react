/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime'
import Tuits from "../components/tuits/index";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import { findAllUsers } from "../services/users-service";
import axios from "axios";
import React from "react";
import '@testing-library/jest-dom'
import { UserList } from "../components/profile/user-list";


const MOCKED_USERS = [
  { username: "alice", password: "abcde", email: "alice@wonderland.com", _id: "123" },
  { username: "bob", password: "bob123", email: "bob@hope.com", _id: "234" },
  { username: "charlie", password: "charlie321", email: "charlie@peanuts.com", _id: "345" }
];

const MOCKED_TUITS = [
  { tuit: "alice's tuit", postedBy: MOCKED_USERS[0] },
  { tuit: "bob's tuit", postedBy: MOCKED_USERS[1] },
  { tuit: "charlie's tuit", postedBy: MOCKED_USERS[2] }
];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS} />
    </HashRouter>);
  MOCKED_TUITS.forEach(
    mockedTuit => {
      const tuitLinkElement = screen.getByText(mockedTuit.tuit);
      expect(tuitLinkElement).toBeInTheDocument();
    });
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>);
  const existingTuitsText = ["Dude Tuit 1"];
  existingTuitsText.forEach(tuitText => {
    const tuitTextElement = screen.getByText(tuitText);
    expect(tuitTextElement).toBeInTheDocument();
  })
});

test('tuit list renders mocked', async () => {
  // per piazza post don't mock entire module so just create spy here only
  const getSpy = jest.spyOn(axios, "get");
  getSpy.mockImplementation(() =>
    Promise.resolve({ data: { users: MOCKED_USERS } }));
  const response = await findAllUsers();
  const users = response.users;

  render(
    <HashRouter>
      <UserList users={users} />
    </HashRouter>);

  const user = screen.getByText(/alice/i);
  expect(user).toBeInTheDocument();
  getSpy.mockRestore();
});


test('tuit list renders mocked', async () => {
  // per piazza post don't mock entire module so just create spy here only
  const getSpy = jest.spyOn(axios, "get");
  getSpy.mockImplementation(() => Promise.resolve({ data: { tuits: MOCKED_TUITS } }));
  const response = await findAllTuits();
  console.log("response");
  console.log(response);
  const tuits = response.tuits;
  console.log("tuits from mocking");
  console.log(tuits);
  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>
  );
  const tuit1 = screen.getByText(MOCKED_TUITS[0].tuit);
  const tuit2 = screen.getByText(MOCKED_TUITS[1].tuit);
  const tuit3 = screen.getByText(MOCKED_TUITS[2].tuit);
  expect(tuit1).toBeInTheDocument();
  expect(tuit2).toBeInTheDocument();
  expect(tuit3).toBeInTheDocument();
  getSpy.mockRestore();
});