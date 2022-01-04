// import { DarkModeSwitch } from '../components/DarkModeSwitch'
import React from 'react';
import {
  AboutUs, Disclaimers, Feature, HowItWorks,
  Protocol, Roadmap, WelcomeHeroBanner
} from '../sections/indexPage';


const Index = () => {
  return null;
  return <>
    <WelcomeHeroBanner />
    <Feature />
    <HowItWorks />
    <Protocol />
    <Roadmap />
    <Disclaimers />
    <AboutUs /> 

    {/* <DarkModeSwitch /> */}
  </>
}

export default Index;
