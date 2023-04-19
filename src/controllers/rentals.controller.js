import { connection } from '../database/database.js';
import rentalSchema from '../models/rentals.Schema.js';
import dayjs from "dayjs";

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;

  try {
    if (customerId && !gameId) {
      const rentals =
        await connection.query(
          `SELECT rentals.*, ('id', customers.id, 'name', customers.name) AS customer,
              ('id', games.id, 'name', games.name,'categoryId', games."categoryId", 'categoryName', categories.name)
               AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id
              JOIN games ON rentals."gameId" = games.id
              JOIN categories ON games."categoryId" = categories.id
              WHERE rentals."customerId" = $1;`,
          [customerId]
        )

      return res.status(200).send(rentals.rows);
    } else if (!customerId && gameId) {
      const rentals =
        await connection.query(
          `SELECT rentals.*, 
            ('id', customers.id, 'name', customers.name) AS customer,
            ('id', games.id, 'name', games.name, 
            'categoryId', games."categoryId", 'categoryName', categories.name) AS game
            FROM rentals JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            JOIN categories ON games."categoryId" = categories.id
            WHERE rentals."gameId" = $1;`,
          [gameId]
        )
      return res.status(200).send(rentals.rows);
    } else if (customerId && gameId) {
      const rentals =
        await connection.query(
          `SELECT rentals.*, 
              ('id', customers.id, 'name', customers.name) AS customer,
              ('id', games.id, 'name', games.name, 
              'categoryId', games."categoryId", 'categoryName', categories.name) AS game
              FROM rentals JOIN customers ON rentals."customerId" = customers.id
              JOIN games ON rentals."gameId" = games.id
              JOIN categories ON games."categoryId" = categories.id
              WHERE rentals."customerId" = $1 AND rentals."gameId" = $2;`,
          [customerId, gameId]
        )

      return res.status(200).send(rentals.rows);
    } else {
      const rentals =
        await connection.query(
          `SELECT rentals.*, 
          json_build_object('id', customers.id, 'name', customers.name) AS customer,
          json_build_object('id', games.id, 'name', games.name, 
          'categoryId', games."categoryId", 'categoryName', categories.name) AS game
          FROM rentals JOIN customers ON rentals."customerId" = customers.id
          JOIN games ON rentals."gameId" = games.id
          JOIN categories ON games."categoryId" = categories.id;`
        )

      return res.status(200).send(rentals.rows);
    }
  } catch (error) {
    res.status(500)
  }
}

export async function postRental(req, res) {
  const { customerId, gameId, daysRented } = res.locals.rental
  const validation = res.locals.validation 

  try {
    const customer = (
      await connection.query(`SELECT * FROM customers WHERE id = $1;`, [
        customerId,
      ])
    ).rows[0];
    const game = (
      await connection.query(`SELECT * FROM games WHERE id = $1;`, [gameId])
    ).rows[0];
    const gameRentals = (
      await connection.query(
        `SELECT * FROM rentals WHERE "returnDate" = null AND "gameId" = $1;`,
        [gameId]
      )
    ).rows.length;

    if (
      validation.error ||
      !customer ||
      !game ||
      (game !== undefined && game.stockTotal === gameRentals)
    ) {
      let errors = [];
      if (validation.error) {
        errors = validation.error.details.map((v) => v.message);
      }
      if (!customer) {
        errors.push({ message: "Cliente não existe" });
      }
      if (!game) {
        errors.push({ message: "Game não existe" });
      }
      if (game !== undefined && game.stockTotal === gameRentals) {
        errors.push({ message: "Todas as unidades já alugadas!" });
      }
      return res.status(400).send(errors);
    }

    await connection.query(
      `INSERT INTO rentals 
      ("customerId", "gameId", "rentDate", "daysRented", 
      "returnDate", "originalPrice", "delayFee")
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        customerId,
        gameId,
        dayjs().format("YYYY-MM-DD"),
        daysRented,
        null,
        game.pricePerDay * daysRented,
        null,
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    
    res.status(500)
  }
}

export async function finalizeRent(req, res) {
  const { id } = req.params;

  try {
    const rental = (
      await connection.query("SELECT * FROM rentals WHERE id = $1", [id])
    ).rows[0];
    if (!rental) {
      return res.status(404).send({ message: "Aluguel não existe!" });
    }
    if (rental.returnDate) {
      return res.status(400).send({ message: "Aluguel já finalizado!" });
    }

    const today = dayjs();
    const rentalDays = today.diff(rental.rentDate, "day");
    let delayFee = 0;

    if (rentalDays > rental.daysRented) {
      delayFee =
        (rentalDays - rental.daysRented) *
        (rental.originalPrice / rental.daysRented);
    }
    await connection.query(
      `UPDATE rentals 
      SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
      [dayjs(today).format("YYYY-MM-DD"), delayFee, id]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    const rental = (
      await connection.query("SELECT * FROM rentals WHERE id = $1", [id])
    ).rows[0];
    if (!rental) {
      res.status(404).send({ message: "Aluguel não existe!" });
      return;
    }
    if (rental.returnDate === null) {
      res.status(400).send({ message: "Aluguel NÃO está terminado!" });
      return;
    }

    await connection.query("DELETE FROM rentals WHERE id = $1", [id]);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}