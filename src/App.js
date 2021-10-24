import "./App.css";
import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Title from "./components/Title";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (
      this.state.contacts.find(
        (contact) =>
          contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(name + " is already in contacts");
      return;
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  getFilteredContactList = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  deleteContact = (id) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div className="App">
        <Title title="Phonebook" />

        <ContactForm onSubmit={this.formSubmitHandler} />

        <Title title="Contacts" />

        <Filter value={this.state.filter} onChange={this.changeFilter} />

        <ContactList
          contacts={this.getFilteredContactList()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
