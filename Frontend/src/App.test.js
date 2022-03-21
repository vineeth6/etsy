import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {render, screen} from '@testing-library/react'
import Navbar from './components/LandingPage/Navbar'
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom'

it('renders without crashing', () => {
  render(
    <Router navbar={Navbar}>
      <Navbar />
    </Router>
  )
  const linkElement = screen.queryByText(/xxxxx/i);
  expect(linkElement).not.toBeInTheDocument()
});

it('renders without crashing', () => {
  render(
    <Router navbar={Navbar}>
      <Navbar />
    </Router>
  )
  const linkElement = screen.queryByText(/xxxxxyyy/i);
  expect(linkElement).not.toBeInTheDocument()
});

it('renders without crashing', () => {
  render(
    <Router navbar={Navbar}>
      <Navbar />
    </Router>
  )
  const linkElement = screen.queryByText(/xxxxxzzzyyy/i);
  expect(linkElement).not.toBeInTheDocument()
});