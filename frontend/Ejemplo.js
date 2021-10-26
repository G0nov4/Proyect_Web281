
fetch('http://localhost:3011/api/ingreso', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "G0nov4",password:"garynova12345" })
})
.then(res => res.json())
.then(res=> {
      console.log(res);
});