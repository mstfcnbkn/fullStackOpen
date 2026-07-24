const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const saveEntry = () => {
  let name, number;

  if (isNaN(process.argv[4])) {
    name = process.argv[3] + " " + process.argv[4];
    number = process.argv[5];
  } else {
    name = process.argv[3];
    number = process.argv[4];
  }

  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then((result) => {
    console.log(`Added ${name} number ${number} to the phonebook`);
    mongoose.connection.close();
  });
};

const listEntries = () => {
  console.log("phonebook:")
  Person.find({}).then((result) => {
    result.forEach((p) => console.log(p.name, p.number));
    mongoose.connection.close();
  });
};

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.4nuomex.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

if (process.argv.length === 3) {
  listEntries();
} else {
  saveEntry();
}
