const data = await fetch("http://localhost:3000/health");
console.log(await data.json());
