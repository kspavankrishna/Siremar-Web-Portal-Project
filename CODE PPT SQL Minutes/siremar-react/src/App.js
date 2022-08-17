// Manasa Mohan kumar (1001869268)
// K S Pavan Krishna (1001935714)
// Nishank Girish Gujar (1001861756)


/* Developed by Manasa Mohan Kumar */
import React, { useState, useEffect, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import CountyList from "./pages/County/CountyList";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ResidentList from "./pages/Residents/ResidentList";
import ResChat from "./pages/Chat/ResidentChat";
import InspectorList from "./pages/Inspector/InspectorList";
import SchoolList from "./pages/School/SchoolList";
import BusinessList from "./pages/Businesses/BusinessesList";
import FlightList from "./pages/Flights/FlightsList";
import FerryList from "./pages/Ferry/FerryList";
import County from "./pages/County/County";
import Resident from "./pages/Residents/Resident";
import Inspector from "./pages/Inspector/Inspector";
import Flight from "./pages/Flights/Flight";
import Ferry from "./pages/Ferry/Ferry";
import School from "./pages/School/School";
import ResidentDashboard from "./pages/Dashboard/ResidentDashboard";



import SchoolReportList from "./pages/School/SchoolReport";
import SchoolRegisteredReport from "./pages/School/SchoolRegisteredReport";
import BusinessReportList from "./pages/Businesses/BusinessReport";
import BusinessRegisteredReport from "./pages/Businesses/BusinessRegisteredReport";
import FlightReportList from "./pages/Flights/FlightReport";
import FlightRegisteredReport from "./pages/Flights/FlightRegisteredReport";
import FerryReportList from "./pages/Ferry/FerryReport";
import FerryRegisteredReport from "./pages/Ferry/FerryRegisteredReport";
import ClinicList from "./pages/Clinics/ClinicList";
import Clinic from "./pages/Clinics/Clinic";
import Event from "./pages/Events/Event";
import ClinicReportList from "./pages/Clinics/ClinicReport";
import ClinicRegisteredReport from "./pages/Clinics/ClinicRegisteredReport";
import EventList from "./pages/Events/EventList";
import EventReportList from "./pages/Events/EventReport";
import EventRegisteredReport from "./pages/Events/EventRegisteredReport";
import Adminchat from "./pages/Chat/Adminchat";
import Inspectorchat from "./pages/Chat/Inspectorchat";
import Business from "./pages/Businesses/Business";
import CommunityFeed from "./pages/CommunityFeed/CommunityFeed";
import Classifieds from "./pages/Classifieds/Classifieds";
import FAQ from "./pages/FAQ/FAQ";
import Tips from "./pages/Tips/Tips";
import MoveoutList from "./pages/Moveouts/MoveoutList";
import Moveout from "./pages/Moveouts/Moveout";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper"
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper"


function App() {
  return (
    <ThemeContextWrapper>
    <BackgroundColorWrapper>
    <BrowserRouter >
      <Routes>
        <Route path="/" exact
          element={<LandingPage />} >
        </Route>
        <Route path="/register"
          element={<Register />} >
        </Route>
        <Route path="/login"
          element={<Login />} >
        </Route>
        <Route path="/dashboard"
          element={<Dashboard />} >
        </Route>
        <Route path="/resident/dashboard"

          element={<ResidentDashboard />} >

        </Route>

        <Route path="/residents"

          element={<ResidentList />} >

        </Route>
        <Route path="/county"
          element={<CountyList />} >
        </Route>
        <Route path="/new/county"
          element={<County />} >
        </Route>
        <Route path="/inspectors"
          element={<InspectorList />} >
        </Route>
        <Route path="/new/inspector"
          element={<Inspector />} >
        </Route>
        <Route path="/schools"
          element={<SchoolList />} >
        </Route>
        <Route path="/schools/report"
          element={<SchoolReportList />} >
        </Route>
        <Route path="/schools/report/insights"
          element={<SchoolRegisteredReport />} >
        </Route>
        <Route path="/new/school"
          element={<School />} >
        </Route>
        <Route path="/businesses"
          element={<BusinessList />} >
        </Route>
        <Route path="/new/business"
          element={<Business />} >
        </Route>
        <Route path="/business/report"
          element={<BusinessReportList />} >
        </Route>
        <Route path="/business/report/insights"
          element={<BusinessRegisteredReport />} >
        </Route>
        <Route path="/flights"
          element={<FlightList />} >
        </Route>
        <Route path="/new/flight"
          element={<Flight />} >
        </Route>
        <Route path="/flights/report"
          element={<FlightReportList />} >
        </Route>
        <Route path="/flights/report/insights"
          element={<FlightRegisteredReport />} >
        </Route>
        <Route path="/clinics"
          element={<ClinicList />} >
        </Route>
        <Route path="/new/clinic"
          element={<Clinic />} >
        </Route>
        <Route path="/clinics/report"
          element={<ClinicReportList />} >
        </Route>
        <Route path="/clinics/report/insights"
          element={<ClinicRegisteredReport />} >
        </Route>
        <Route path="/events"
          element={<EventList />} >
        </Route>
        <Route path="/new/event"
          element={<Event />} >
        </Route>
        <Route path="/events/report"
          element={<EventReportList />} >
        </Route>
        <Route path="/events/report/insights"
          element={<EventRegisteredReport />} >
        </Route>
        <Route path="/ferry"
          element={<FerryList />} >
        </Route>
        <Route path="/ferry/report"
          element={<FerryReportList />} >
        </Route>
        <Route path="/ferry/report/insights"
          element={<FerryRegisteredReport />} >
        </Route>
        <Route path="/new/ferry"
          element={<Ferry />} >
        </Route>
        <Route path="/Reschat"

          element={<ResChat />} >

        </Route>
        <Route path="/adminchat"
          element={<Adminchat />} >
        </Route>
        <Route path="/inspectorchat"
          element={<Inspectorchat />} ></Route>
        <Route path="/news/feed"
          element={<CommunityFeed />} ></Route>
        <Route path="/classifieds"
          element={<Classifieds />} ></Route>
        <Route path="/tips"
          element={<Tips />} ></Route>

        <Route path="/faq"
          element={<FAQ />} ></Route>

        <Route path="/moveout"
          element={<MoveoutList />} >
        </Route>
        <Route path="/new/moveout"
          element={<Moveout />} >
        </Route>
        <Route path="/new/resident"

          element={<Resident />} >

        </Route>
      </Routes>
    </BrowserRouter>
    </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
}

export default App;
