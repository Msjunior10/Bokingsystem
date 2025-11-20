import '../components.css';
import Bookingbutton from './Bookingbutton.tsx';

export default function Gif() {
  return (
    <div className="Gif-div">
      <div className="Text-div">
        <h2 className="Text">
          Welcome to your Booking System, manage your reservations with us!
        </h2>
        <Bookingbutton />
      </div>
      <div className="booking-div">
        <p className="intro-text">
          Here you can easily reserve
          a table, check available times, and manage your bookings all in one
          place. Whether you’re planning a romantic dinner, a family
          celebration, or a business lunch, our platform makes it simple and
          convenient to secure your spot. Enjoy a seamless booking experience
          with real-time availability, instant confirmation, and the flexibility
          to modify or cancel your reservation whenever you need. So you can focus on enjoying
          great food and good company. Book your table now and let us take care
          of the rest!
        </p>
        <img className="booking-gif" src="/booking Gif.gif" alt="Booking GIF" />
      </div>
    </div>
  );
}