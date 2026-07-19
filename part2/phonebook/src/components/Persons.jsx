const Persons = ({ searchedPersons, deletePerson }) => {
  return searchedPersons.map((p) => (
    <p key={p.id} style={{ margin: 0 }}>
      {p.name} {p.num} <button onClick={() => deletePerson(p)}>delete</button>
    </p>
  ));
};

export default Persons;
