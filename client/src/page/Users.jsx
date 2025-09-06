import { Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddStaffModal from "../components/AddStaffModal";
import { useUserStore } from "../store/useUserStore";
import ContentLoader from "../components/layouts/ContentLoader";

const Users = () => {
  const [search, setSearch] = useState("");
  const [addStaff, setAddStaff] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const { users, isUserloading, getUsers, isUserDelete, deleteUser } =
    useUserStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserloading) return <ContentLoader message="Users loading" />;

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(search.toLowerCase())
  );

  const openDeleteModal = (user) => {
    setStaffToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (staffToDelete) {
      deleteUser(staffToDelete._id);
    }
    setDeleteModalOpen(false);
    setStaffToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setStaffToDelete(null);
  };

  return (
    <div className="flex-1 relative w-full min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Staff Members
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-auto">
        {/* Search */}
        <div className="flex flex-col md:flex-row items-center justify-between p-4">
          <div className="w-full md:w-1/2 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search staff"
              className="w-full px-4 py-3 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setAddStaff(true)}
            className="w-full text-center md:w-auto mt-3 md:mt-0 px-4 py-3 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white rounded-lg hover:bg-blue-700"
          >
            Add Staff
          </button>
        </div>

        {/* Staff Table */}
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {user.userName}
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="p-2 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No staff members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 m-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Delete
              </h2>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{staffToDelete?.userName}</span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isUserDelete}
                className={`px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 ${
                  isUserDelete ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUserDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {addStaff && (
        <AddStaffModal closeModal={() => setAddStaff(false)} />
      )}
    </div>
  );
};

export default Users;
