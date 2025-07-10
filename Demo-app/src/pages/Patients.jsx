import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/common-components/Button';

// Dummy modal for create/edit (UI only)
const PatientModal = ({ open, onClose, patient }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{patient ? 'Edit Patient' : 'Create Patient'}</h2>
        {/* Form fields go here (UI only) */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="First Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Last Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Marital Status</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Language" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Timezone</label>
              <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Timezone" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Race</label>
              <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Race" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Ethnicity</label>
              <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Ethnicity" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">SSN</label>
            <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="SSN" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
            <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Profile Picture URL" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary">{patient ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Patients = () => {
  const { patients } = useSelector(state => state.patients);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Filtered patients (UI only)
  const filteredPatients = patients.filter(p =>
    p.firstName.toLowerCase().includes(search.toLowerCase()) ||
    p.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Patients</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>+ Create Patient</Button>
      </div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 w-64"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-400">No patients found.</td>
              </tr>
            ) : (
              filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.firstName} {patient.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.dateOfBirth}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{patient.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{patient.maritalStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button size="sm" variant="outline" className="mr-2">Edit</Button>
                    <Button size="sm" variant="danger">Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <PatientModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Patients; 