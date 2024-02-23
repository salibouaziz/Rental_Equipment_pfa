import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='About Our Application' subtitle='Check out our company story and work process' />

            <p>Welcome to our online platform for construction materials rental! Our team is committed to streamlining the rental process for our customers, providing convenient and efficient access to a diverse range of construction materials.</p>
            <p>Our mission is to provide a convenient and transparent solution to meet our customers' construction material rental needs. We are dedicated to offering reliable service, ensuring equipment availability, and simplifying the reservation process.</p>
            <Heading title='About Our Services' subtitle='Extensive Selection of Materials' />
            <h2>Extensive Selection of Materials</h2>
            <p>We offer a wide range of high-quality construction materials, from basic tools to specialized equipment, to meet all your construction and renovation needs.</p>
            <h2>Easy Online Booking</h2>
            <p>Our user-friendly platform allows customers to browse our product catalog, check item availability, and quickly and easily reserve the equipment they need, without the need to travel.</p>
            <h2>Digital Rental Contracts</h2>
            <p>We provide the option to sign rental contracts online, simplifying and speeding up the rental process. No more bulky paperwork or unnecessary trips, everything is managed digitally for your convenience.</p>
            <h2>Reservation Tracking</h2>
            <p>Our dedicated team ensures careful tracking of all reservation requests. We ensure that each request is processed quickly and efficiently, keeping our customers informed at every step of the process.</p>
            <Heading title='About Our Commitment' subtitle='Extensive Selection of Materials' />
            <p>We are committed to providing exceptional customer service and ensuring customer satisfaction at every stage of their rental experience. Your trust is our priority, and we work tirelessly to earn your satisfaction.</p>
            
          </div>
          <div className='right row'>
            <img src='https://img.freepik.com/free-photo/aerial-view-business-team_53876-124515.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708041600&semt=ais' alt=''style={{  width: '140%' }} />
          </div>
        </div>
      </section>
    </>
  )
}

export default About