import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://json-server-deployment-n9j4.onrender.com/contacts";

  // Fetch Contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to load contacts!");
      setLoading(false);
    }
  };

  // Add Contact
  const addContact = async (contact) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    try {
      const res = await axios.post(API_URL, newContact);
      setContacts([...contacts, res.data]);
      toast.success("New contact added successfully!");
    } catch (err) {
      console.error("Error saving contact:", err);
      toast.error("Failed to save contact.");
    }
  };

  // Update Contact
  const updateContact = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      setContacts(
        contacts.map((contact) => (contact.id === id ? res.data : contact))
      );
      toast.info("Contact updated successfully!");
    } catch (err) {
      console.error("Error updating contact:", err);
      toast.error("Update failed!");
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
      toast.warn("Contact deleted successfully!");
    } catch (err) {
      console.error("Error deleting contact:", err);
      toast.error("Could not delete contact!");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, updateContact, deleteContact, loading }}
    >
      {children}
    </ContactContext.Provider>
  );
};
