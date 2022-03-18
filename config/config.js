require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: "txvifcdkvprkqr",
    password:
      "7d506edec6f2f2c56af970630f93426ab80586101120fae1a97f21d844df38fb",
    database: "d3etoa404k6mm0",
    host: "ec2-100-24-227-178.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: "sghujlnjhyqtbd",
    password:
      "fe1d24d482096e30c5110603217908dff8d3594573a2daf5f5bb8de46f7eb971",
    database: "d468khn851jdds",
    host: "ec2-44-194-232-228.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
