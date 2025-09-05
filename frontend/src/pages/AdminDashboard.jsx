import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/admin/bookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // if using JWT auth
          },
        });
        if (data.success) {
          setBookings(data.bookings);
        } else {
          toast.error("Failed to fetch bookings");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.userEmail}</td> {/* or booking.user.name based on your schema */}
                <td>{booking.roomName}</td> {/* adjust fields based on your booking schema */}
                <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;