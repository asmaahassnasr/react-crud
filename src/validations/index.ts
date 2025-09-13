export const productValidation = (product: { title: string, description: string, imageURL: string, price: string }) => {

    const errorsObj: { title: string, description: string, imageURL: string, price: string } = {
        title: "",
        price: "",
        imageURL: "",
        description: ""
    };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

    if(!product.title.trim() || product.title.length<10 || product.title.length>80)
        errorsObj.title = "Product title must be between 10 and 80";

    if(!product.description.trim() || product.description.length<10 || product.description.length>800)
        errorsObj.description = "Product description must be between 10 and 80";

    if(!product.imageURL.trim() || !validUrl)
        errorsObj.imageURL = "Valid image URL is required";

    if(!product.price.trim() || isNaN(Number(product.price)))
        errorsObj.price = "Valid Price is Required";
    

    return errorsObj;
}