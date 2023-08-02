export function  serve(values){
    let error={}
    if(values.email===""||values.name===""||values.place===""){
        error.email="Enter required fileds"
    }
    else{
        error.email=""
    }
    return error;
}
export function signup(values){
    let error={}
    if(values.email===""||values.name===""||values.password===""||values.confirmpassword===""){
        error.email="Enter required fileds"
    }
    else if(values.confirmpassword!==values.password){
        error.email="password does't match"
    }
    else{
        error.email=""
    }
    return error;
}
export function change(values){
    let error={}
    if(values.email===""||values.password===""||values.confirmpassword===""){
        error.email="Enter required fields"
    }
    else if(values.confirmpassword!==values.password){
        error.email="password does't match"
    }
    else{
        error.email=""
    }
    return error;
}
export function add(values){
    let error={}
    console.log(values)
    if(values.Location===""||values.Place===""){
        console.log("yes111")
        error.Location="Enter required fields"
    }
    else{
        error.Location=""
    }
    return error
}