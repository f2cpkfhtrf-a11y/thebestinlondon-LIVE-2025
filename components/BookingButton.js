import { getBookingButton, trackBookingClick } from '../lib/bookingUtils';

/**
 * Booking Button Component
 * Displays booking button based on venue's booking options
 */
export default function BookingButton({ venue }) {
  const booking = getBookingButton(venue);

  if (!booking) {
    return null;
  }

  const handleClick = () => {
    trackBookingClick(venue, booking.platform);
  };

  // Different styles based on platform
  const buttonClass = booking.platform === 'phone' 
    ? "inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
    : "inline-flex items-center px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors";

  return (
    <a
      href={booking.url}
      target={booking.platform === 'phone' ? undefined : "_blank"}
      rel={booking.platform === 'phone' ? undefined : "noopener noreferrer"}
      className={buttonClass}
      onClick={handleClick}
    >
      <span className="mr-2 text-lg">{booking.icon}</span>
      {booking.label}
    </a>
  );
}

