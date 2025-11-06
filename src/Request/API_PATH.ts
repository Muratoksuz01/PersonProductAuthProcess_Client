export const BaseUrl="https://localhost:7000"
export const API_PATH={
    login:BaseUrl+"/User/login",
    signup:BaseUrl+"/User/signup",
    getCurrentUser:BaseUrl+"/User/getCurrentUser",
    getProduct:BaseUrl+"/Product/products",
    createProduct:BaseUrl+"/Product/product",
    detailProduct:(id:string)=>BaseUrl+"/Product/product/"+id,
    editProduct:  (id:string)=>BaseUrl+"/Product/product/"+id,
    deleteProduct:(id:string)=>BaseUrl+"/Product/product/"+id,
    getPerson:BaseUrl+"/Person/persons",
    getPersonById:(id:string)=>BaseUrl+"/Person/person/"+id,
    editPerson:(id:string)=>BaseUrl+"/Person/person/"+id,
    deletePerson:(id:string)=>BaseUrl+"/Person/person/"+id,
}