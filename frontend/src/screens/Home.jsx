import React, { useContext, useState , useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../context/user.context';
import axios from '../config/axios.js';

export const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState(null);
  const [project,setPrject] = useState([]);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setError(null);
  };

  const createProject = async (e) => {
    e.preventDefault();
    console.log({ projectName });
  
    try {
      const res = await axios.post('/projects/create', {
        name: projectName,
      });
  
      console.log(res);
      setModal(false);
    } catch (error) {
      console.error(error);
      setError('Failed to create project. Please try again.');
    }
  };
  
  useEffect( () => {
    axios.get('/projects/all')
    .then((res) => {
      console.log(res.data);
      setPrject(res.data.projects);
    }).catch(err => {
      console.log(err);
    })

  }, [])

  return (
    <main className="p-4">
      <div className="Project">
        <button
          className="Projects p-4 border border-slate-300 rounded-md"
          onClick={handleOpenModal}
        >
          <i className="ri-links-line"></i>
        </button>
      </div>
      <div className="flex flex-wrap gap-3 w-auto shadow-sm mt-4 cursor-pointer">
        {project.length > 0 ? (
          project.map((e) => (
            <div
            onClick={() => navigate('/project', { state: { project: e } })}

             key={e._id} className="p-4 border rounded-md bg-gray-100 hover:bg-gray-200 select-none">
              
              <h3 className="font-semibold">{e.name}</h3>
              <p><i className="ri-group-fill"></i> <small>collaborators :</small> {e.users.length}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Enter Project Name</h2>
            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}
            <form onSubmit={createProject}>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Project name"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
