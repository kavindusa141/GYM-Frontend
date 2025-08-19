// client/src/components/MemberList.js
import React, { useState, useEffect } from 'react';
import { getMembers } from '../api/members';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getMembers();
      setMembers(data);
    };
    fetchMembers();
  }, []);

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>{member.name} - {member.membership_type}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;