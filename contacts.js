const { nanoid } = require("nanoid");

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  try {
    const arr = await fs.readFile(contactsPath);
    console.table(JSON.parse(arr));
    return JSON.parse(arr);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsJson = JSON.parse(contacts);

    const contactById = contactsJson.find(
      (contact) => contact.id === contactId
    );
    console.table(contactById || null);
    return contactById || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsJson = JSON.parse(contacts);

    const deletedContact = contactsJson.find(
      (contact) => contact.id === contactId
    );

    if (deletedContact) {
      const newList = contactsJson.filter(
        (contact) => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(newList));
      console.table(deletedContact);
      console.table(newList);
      return deletedContact;
    }
    console.table(null);
    return null;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsJson = JSON.parse(contacts);

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contactsJson.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsJson));
    console.table(newContact);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
