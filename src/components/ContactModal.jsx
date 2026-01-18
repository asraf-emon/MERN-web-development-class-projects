import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../context/ContactContext";

const ContactModal = ({ isOpen, onClose, contact, mode }) => {
  const { updateContact } = useContext(ContactContext);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  if (!isOpen) return null;

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateContact(contact.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl overflow-hidden">
        
        <div className="bg-slate-700 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-lg">
            {mode === "edit" ? "Edit Contact" : "Contact Details"}
          </h3>
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:text-red-400 transition"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          {mode === "edit" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    type="text"
                    value={formData.first_name || ""}
                    className="w-full border p-2 rounded focus:border-blue-500 outline-none"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    type="text"
                    value={formData.last_name || ""}
                    className="w-full border p-2 rounded focus:border-blue-500 outline-none"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  className="w-full border p-2 rounded focus:border-blue-500 outline-none"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="text"
                  value={formData.phone || ""}
                  className="w-full border p-2 rounded focus:border-blue-500 outline-none"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address || ""}
                  className="w-full border p-2 rounded focus:border-blue-500 outline-none"
                  rows="2"
                  onChange={handleChange}
                ></textarea>
              </div>

              <button className="bg-blue-600 text-white px-4 py-3 rounded-md w-full hover:bg-blue-700 transition font-bold shadow-md">
                Update Now
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-gray-700">
              <DetailItem
                label="Full Name"
                value={`${contact.first_name} ${contact.last_name}`}
              />
              <DetailItem label="Email" value={contact.email} />
              <DetailItem label="Phone" value={contact.phone} />
              <DetailItem label="Address" value={contact.address || "N/A"} />

              <button
                onClick={onClose}
                className="mt-4 w-full bg-gray-100 py-2 rounded hover:bg-gray-200 transition font-bold border border-gray-300"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <p className="border-b pb-2">
    <strong className="text-gray-500 text-sm uppercase">{label}:</strong> <br />
    <span className="text-lg">{value}</span>
  </p>
);

export default ContactModal;
