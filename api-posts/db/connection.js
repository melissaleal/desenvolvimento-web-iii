import mongoose from "mongoose";
const mg = mongoose;

const server = "mongodb://localhost";
const port = "27017";
const database = "post";

export function connectDatabase(){
    const urlDatabase = `${server}:${port}/${database}`;
    // const urlDatabase = "mongodb+srv://melikaiser:sucumba@melikaiser.n2vhve4.mongodb.net/posts?retryWrites=true&w=majority&appName=Melikaiser"

    // printando no terminal
    mg.connection.on("open", () => {
        console.log("Connected successfully");
    });

    const connection = mongoose.connect(urlDatabase);
    return connection;
}