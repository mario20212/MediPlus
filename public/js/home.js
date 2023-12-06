let ongo = sessionStorage.getItem('ongo');
let username = sessionStorage.getItem('username');


if (ongo == 'true') {
    console.log("hreee")
    const nameeElement = document.getElementById('namee');
    nameeElement.innerHTML = `<p style="font-size: 16px"> Welcome ${username}</p>`;
    nameeElement.setAttribute('href', '/');
    document.getElementById("logout").style.display="flex";
}

function logout()
{
sessionStorage.removeItem('ongo');
sessionStorage.removeItem('username');
sessionStorage.removeItem('email');
sessionStorage.removeItem('isAdmin');
window.location.replace("/");
}
function creatschdule()
{
    if (ongo == 'true') 
    {
        window.location.replace('/schedule')
    }
    else
    {
        window.location.replace('/signinup')
    }
}