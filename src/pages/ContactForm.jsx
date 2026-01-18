import { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const { addContact } = useContext(ContactContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await addContact(form);
      navigate("/");
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-10 max-w-2xl">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
        {/* Header section with Close Icon */}
        <div className="bg-[#435d7d] p-4 text-white font-bold text-xl flex justify-between items-center">
          <span>Add New Contact</span>
          <button
            onClick={() => navigate("/")}
            className="hover:text-rose-400 transition-colors text-2xl leading-none"
            title="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6">
          {/* Input fields */}
          {[
            {
              label: "First Name",
              name: "first_name",
              type: "text",
              required: true,
            },
            {
              label: "Last Name",
              name: "last_name",
              type: "text",
              required: true,
            },
            { label: "Email", name: "email", type: "email", required: true },
            { label: "Phone", name: "phone", type: "text", required: true },
          ].map((field) => (
            <div
              key={field.name}
              className="grid grid-cols-1 md:grid-cols-3 items-center gap-2"
            >
              <label className="font-semibold text-gray-600">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="md:col-span-2 border-2 border-gray-100 p-2.5 rounded-md outline-none focus:border-[#435d7d] transition-all bg-gray-50 focus:bg-white"
                value={form[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Address field */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-2">
            <label className="font-semibold text-gray-600 pt-2">Address</label>
            <textarea
              className="md:col-span-2 border-2 border-gray-100 p-2.5 rounded-md outline-none focus:border-[#435d7d] transition-all bg-gray-50 focus:bg-white"
              name="address"
              placeholder="Enter physical address"
              rows="3"
              value={form.address}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              onClick={() => navigate("/")}
              type="button"
              className="px-8 py-2.5 rounded-md font-bold text-gray-500 hover:bg-rose-500 hover:text-white transition border border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#28a745] text-white px-10 py-2.5 rounded-md hover:bg-[#218838] font-bold shadow-lg transition-all active:scale-95"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
