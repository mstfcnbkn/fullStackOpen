import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const searchedPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(newSearch.toLowerCase()),
  );

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumChange = (event) => setNewNum(event.target.value);

  const handleSearchChange = (event) => setNewSearch(event.target.value);

  const showNotification = (content, type) => {
    setNotification({ content, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`,
        )
      ) {
        const newPerson = {
          name: newName,
          num: newNum,
        };
        personService
          .update(existingPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === existingPerson.id ? returnedPerson : p,
              ),
            );
            showNotification(
              `Changed the number of ${returnedPerson.name}`,
              "success",
            );
          })
          .catch((error) => {
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              "error",
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else {
      const personObject = {
        name: newName,
        num: newNum,
      };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        showNotification(`Added ${returnedPerson.name}`, "success");
      });
    }
    setNewNum("");
    setNewName("");
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .del(person)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((e) => {
          alert(
            `${person.name} was already deleted from the server (im too lazy to update the frontend)`,
          );
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
      />
      <h3>Numbers</h3>
      <Persons searchedPersons={searchedPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
