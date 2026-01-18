import { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";
import { Link } from "react-router-dom";
import ContactModal from "../components/ContactModal";

const Home = () => {
  const { contacts, deleteContact, loading } = useContext(ContactContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Default");
  const [modal, setModal] = useState({
    isOpen: false,
    contact: null,
    mode: "view",
  });

  const filtered = contacts.filter((c) =>
    Object.values(c).some((val) =>
      val?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (filter === "1") return a.first_name.localeCompare(b.first_name);
    if (filter === "2") return a.last_name.localeCompare(b.last_name);
    if (filter === "3") return a.createdAt - b.createdAt;
    return 0;
  });

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4 md:p-10">
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="bg-[#435d7d] p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-3xl font-normal">All Contacts</h2>
          <div className="flex items-center w-full md:w-[60%] lg:w-[50%]">
            <div className="flex w-full rounded-sm overflow-hidden bg-white border border-[#3a506b]">
              <input
                type="text"
                placeholder="search contact"
                className="p-2 w-full outline-none text-gray-700 italic"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-[#28a745] text-white px-6 py-2 hover:bg-[#218838] transition border-l border-[#3a506b]">
                Search
              </button>
            </div>
            <Link
              to="/add"
              className="bg-[#28a745] text-white px-4 py-2 rounded-md hover:bg-[#218838] ml-4 flex items-center whitespace-nowrap"
            >
              <i className="fa fa-plus-circle mr-2"></i> Add New
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="p-4 flex justify-between items-center bg-white">
          <div className="text-xl text-[#28a745] flex items-center gap-2 font-semibold">
            <i className="fa fa-filter"></i> Filter
          </div>
          <select
            className="border-2 border-green-600 p-1 rounded cursor-pointer"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Default">Default</option>
            <option value="1">First Name (A → Z)</option>
            <option value="2">Last Name (A → Z)</option>
            <option value="3">Oldest To First</option>
          </select>
        </div>

        {/* Contact Table Section */}
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f5f5f5]">
              <tr className="border-y border-gray-200">
                <th className="p-4 w-12 text-center border-r border-gray-200 text-gray-700">
                  #
                </th>
                <th className="p-4 border-r border-gray-200 text-gray-700">
                  First Name
                </th>
                <th className="p-4 border-r border-gray-200 text-gray-700">
                  Last Name
                </th>
                <th className="p-4 border-r border-gray-200 text-gray-700">
                  Email
                </th>
                <th className="p-4 border-r border-gray-200 text-gray-700">
                  Phone
                </th>
                <th className="p-4 text-center text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sorted.length > 0 ? (
                sorted.map((c, i) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="p-4 border-r border-gray-200">{i + 1}</td>
                    <td className="p-4 border-r border-gray-200">
                      {c.first_name}
                    </td>
                    <td className="p-4 border-r border-gray-200">
                      {c.last_name}
                    </td>
                    <td className="p-4 border-r border-gray-200">{c.email}</td>
                    <td className="p-4 border-r border-gray-200">{c.phone}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            setModal({ isOpen: true, contact: c, mode: "view" })
                          }
                          className="w-8 h-8 rounded-full border border-cyan-400 text-cyan-500 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition"
                        >
                          <i className="fa fa-eye text-xs"></i>
                        </button>
                        <button
                          onClick={() =>
                            setModal({ isOpen: true, contact: c, mode: "edit" })
                          }
                          className="w-8 h-8 rounded-full border border-gray-400 text-gray-500 flex items-center justify-center hover:bg-gray-500 hover:text-white transition"
                        >
                          <i className="fa fa-pencil-square-o text-xs"></i>
                        </button>
                        <button
                          onClick={() =>
                            window.confirm("Are you sure?") &&
                            deleteContact(c.id)
                          }
                          className="w-8 h-8 rounded-full border border-red-400 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                        >
                          <i className="fa fa-times text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-400 text-xl font-light border border-gray-200"
                  >
                    No Contact Information Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ContactModal
        {...modal}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />
    </div>
  );
};

export default Home;
