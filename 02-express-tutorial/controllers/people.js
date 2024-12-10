const { people } = require("../data");

function getPeople(req, res) {
    res.status(200).json(people);
};

function addPerson(req, res) {
    const { name } = req.body;

    if(!name) {
        return res.status(400).json({ success: false,
                                      message: 'Please provide a name'
         });
    }

    const newPerson = {id: people.length +1, name }; // adding a new person to the array
    people.push(newPerson); 

    res.status(201).json({ success: true,
                           person: newPerson });

};

function getPersonById(req, res) {
    const id = parseInt(req.params.id, 10);
    const person = people.find((x) => x.id === id);

    if(!person) {
        return res.status(404).json({
            success: false,
            message: `Person with id ${id} is not found`,
        });
    }

    res.status(200).json(person);
};

function updatePerson (req, res) {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;

    if(!name) {
        return res.status(400).json({ success: false,
                                      message: 'Please provide a name'
         });
    }

    const person = people.find((x) => x.id === id);

    if(!person) {
        return res.status(404).json({
            success: false,
            message: `Person with id ${id} is not found`,
        });
    }
    person.name = name;
    
    res.status(200).json({
        success: true,
        person,
    });

};

function deletePerson(req, res) {
    const id = parseInt(req.params.id, 10);

    const personExists = people.some((x) => x.id === id);

    if (!personExists) {
        return res.status(404).json({
            success: false,
            message: `Person with id ${id} is not found`,
        });
    }

    const updatedPeople = people.filter((x) => x.id !== id);

    res.status(200).json({
        success: true,
        message: `Person with id ${id} has been removed`,
        people: updatedPeople,
    });
}


module.exports = { getPeople, addPerson, getPersonById, updatePerson, deletePerson };