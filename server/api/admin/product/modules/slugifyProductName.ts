import slugify from "slugify";

export function generateSlug(productName:string){
	const  slug=slugify(productName);
	const random= Math.random().toString().slice(0,5)
	return slug.toLowerCase() + '-' + random
}