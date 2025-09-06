import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/admin/bookings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        if (data.success) {
          setBookings(data.bookings);
        } else {
          toast.error("Failed to fetch reservations");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error fetching reservations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <h2>All Reservations</h2>
      {bookings.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((res) => (
              <tr key={res._id}>
                <td>{res._id}</td>
                <td>
                  {res.firstName} {res.lastName}
                </td>
                <td>{res.email}</td>
                <td>{res.phone}</td>
                <td>{res.date}</td>
                <td>{res.time}</td>
                <td>{res.guests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
