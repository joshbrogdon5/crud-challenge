module.exports = {
    getEmployees: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_employees()
            .then(employees => res.status(200).send(employees))
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops, something went wrong!" })
                console.log(err)
            })
    },
    createEmployee: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.create_employee([req.body.first_name, req.body.last_name, req.body.email, req.body.phone_number, req.body.salary])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Oops, something went wrong!" })
                console.log(err)
            })
    },
    deleteEmployee: (req, res) => {
        const dbInstance = req.app.get('db');
        
        dbInstance.delete_employee([req.params.id])
            .then(() => {
                dbInstance.get_employees()
                .then(employee => res.status(200).send(employee))
            })
              .catch(err => {
                res.status(500).send({ errorMessage: "Oops, something went wrong!" })
                console.log(err)
            })
    }
}