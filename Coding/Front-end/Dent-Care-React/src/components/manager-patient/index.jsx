import React, { useEffect, useState } from 'react';
import { Input, message, Table } from 'antd';
import api from '../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

const Managerpatient = () => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const user = useSelector(selectUser);
  console.log(user);

  const fetchPatients = async () => {
    try {
      const response = await api.get(`/appointment-patient/clinic/${user.dentalClinic?.id}`);
      setPatients(response.data);
      setFilteredPatients(response.data); // Initialize filteredPatients with all patients
    } catch (error) {
      console.error('Failed to fetch patients:', error.response);
      message.error('Failed to fetch patients');
    }
  };

  useEffect(() => {
    if (user.dentalClinic?.id) {
      fetchPatients();
    }
  }, [user.dentalClinic?.id]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);
    const filtered = patients.filter(patient =>
      patient.patient.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: ['patient', 'name'],
      key: 'patientName',
    },
    {
      title: 'Age',
      dataIndex: ['patient', 'age'],
      key: 'patientAge',
    },
    {
      title: 'Address',
      dataIndex: ['patient', 'address'],
      key: 'patientAddress',
    },
    {
      title: 'Phone Number',
      dataIndex: ['patient', 'phoneNumber'],
      key: 'patientPhoneNumber',
    },
    {
      title: 'Email',
      dataIndex: ['patient', 'email'],
      key: 'patientEmail',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 20 }}>
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 200 }}
        />
      </div>
      <Table dataSource={filteredPatients} columns={columns} rowKey="id" />
    </div>
  );
};

export default Managerpatient;
