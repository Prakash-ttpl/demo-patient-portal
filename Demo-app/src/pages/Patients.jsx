import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/common-components/Button';
import { createPatientRequest, fetchPatientsRequest } from '../store/slices/patientSlice';

// Dummy modal for create/edit (UI only)
const PatientModal = ({ open, onClose, patient }) => {
  const dispatch = useDispatch();
  const createLoading = useSelector(state => state.patients.createLoading);
  const createError = useSelector(state => state.patients.createError);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    language: '',
    timezone: '',
    race: '',
    ethnicity: '',
    ssn: '',
    profilePicture: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (patient) {
      setForm({ ...patient });
    } else {
      setForm({
        firstName: '', lastName: '', dateOfBirth: '', gender: '', maritalStatus: '', language: '', timezone: '', race: '', ethnicity: '', ssn: '', profilePicture: '',
      });
    }
    setErrors({});
    setServerError('');
    setSuccess('');
    // Clear Redux error on open
    dispatch({ type: 'patients/createPatientFailure', payload: null });
  }, [open, patient, dispatch]);

  const validate = (values) => {
    const errs = {};
    if (!values.firstName) errs.firstName = 'First name is required';
    if (!values.lastName) errs.lastName = 'Last name is required';
    if (!values.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
    if (!values.gender) errs.gender = 'Gender is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setServerError('');
    setSuccess('');
    try {
      await dispatch(createPatientRequest(form));
      setSuccess('Patient created successfully!');
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 1200);
    } catch (err) {
      setServerError(err?.message || 'Failed to create patient');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{patient ? 'Edit Patient' : 'Create Patient'}</h2>
        {serverError && <div className="text-red-600 mb-2">{serverError}</div>}
        {createError && <div className="text-red-600 mb-2">{createError}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} className={`mt-1 block w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`} placeholder="First Name" />
            {errors.firstName && <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} className={`mt-1 block w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`} placeholder="Last Name" />
            {errors.lastName && <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className={`mt-1 block w-full border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`} />
            {errors.dateOfBirth && <div className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</div>}
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className={`mt-1 block w-full border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <div className="text-red-500 text-xs mt-1">{errors.gender}</div>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Marital Status</label>
              <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
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
              <input name="language" value={form.language} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Language" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Timezone</label>
              <input name="timezone" value={form.timezone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Timezone" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Race</label>
              <input name="race" value={form.race} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Race" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Ethnicity</label>
              <input name="ethnicity" value={form.ethnicity} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Ethnicity" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">SSN</label>
            <input name="ssn" value={form.ssn} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="SSN" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
            <input name="profilePicture" value={form.profilePicture} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Profile Picture URL" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
            <Button variant="primary" type="submit" disabled={loading || createLoading}>{loading || createLoading ? 'Saving...' : (patient ? 'Update' : 'Create')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Patients = () => {
  const dispatch = useDispatch();
  const { patients } = useSelector(state => state.patients);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    dispatch(fetchPatientsRequest());
  }, [dispatch]);

  // Filtered patients (UI only)
  const filteredPatients = Array.isArray(patients) &&  patients?.filter(p =>
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
              Array.isArray(filteredPatients) && filteredPatients.map(patient => (
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