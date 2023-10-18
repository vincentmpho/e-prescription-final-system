let addDoctor = async (doc) => {
    let res = "";
    await fetch("api/Doctors/Create",
        {

        })
        .then(r => { res = "success"; })
        .catch(e => { res = "error"; })
    return res;
}