/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime'
import { UserList } from "../components/profile/user-list";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllUsers } from "../services/users-service";
import axios from "axios";
import React from 'react';
import '@testing-library/jest-dom'

const MOCKED_USERS = [
  { username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123" },
  { username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234" },
]

test('user list renders static user array', () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS} />
    </HashRouter>);
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});

// for some reason 
test('user list renders async', async () => {
  const users = await findAllUsers();
  console.log(users);
  render(
    <HashRouter>
      <UserList users={users} />
    </HashRouter>);
  // Elon is now a user :D 
  const linkElement = screen.getByText(/Elon/i);
  expect(linkElement).toBeInTheDocument();
});

test('user list renders mocked', async () => {
  // per piazza post don't mock entire module so just create spy here only
  const getSpy = jest.spyOn(axios, "get");
  getSpy.mockImplementation(() => Promise.resolve({ data: { users: MOCKED_USERS } }));
  const response = await findAllUsers();
  const users = response.users;
  console.log(users)
  render(
    <HashRouter>
      <UserList users={users} />
    </HashRouter>);

  const user = screen.getByText(/ellen_ripley/i);
  expect(user).toBeInTheDocument();
  getSpy.mockRestore();
});