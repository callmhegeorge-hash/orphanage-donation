import React, { useEffect, useState } from "react";
import axios from "axios";

const DonationList = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/donations")
            .then(res => setDonations(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>Recent Donations</h2>
            <ul>
                {donations.map(d => (
                    <li key={d._id}>{d.name} donated ${d.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default DonationList;
